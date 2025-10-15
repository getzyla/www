import { json, error, type RequestEvent } from '@sveltejs/kit';
import { translateLanguages } from '$lib/utils/translate/languages';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const API_MODEL = import.meta.env.VITE_APP_API_MODEL;

function validateInput(text: string, sourceLanguage: string, targetLanguage: string) {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    throw new Error('Text is required and must be a non-empty string');
  }

  if (/^\s+$/.test(text)) {
    throw new Error('Text cannot contain only whitespace');
  }

  const validLanguages = translateLanguages.map((lang) => lang.code);

  if (!validLanguages.includes(sourceLanguage)) {
    throw new Error('Invalid source language');
  }

  if (!validLanguages.includes(targetLanguage)) {
    throw new Error('Invalid target language');
  }
}

function buildTranslationPrompt(text: string, sourceLanguage: string, targetLanguage: string): string {
  return `Translate the following text from ${sourceLanguage} to ${targetLanguage}. Your translation must be fluent, natural, and idiomatic, as if written by a native speaker of the target language with C2-level proficiency. Use vocabulary, expressions, sentence structures, and tone that are commonly used in everyday and professional communication in the target language. Consider the original context, intent, style, and register of the source text. Adapt the translation to fit the cultural norms, communication style, and expectations of native speakers of the target language. Rephrase where necessary to ensure the output reads authentically and naturally. Translate idioms, metaphors, and culturally specific references using equivalent expressions in the target language that preserve the original meaning and tone. Avoid literal or word-for-word translation unless explicitly required. Ensure clarity, grammatical accuracy, consistency in terminology, and appropriate use of tenses and structure. Do not include any commentary, notes, or explanations. Do not embellish or simplify the content unless it improves readability without changing the intended message. Output only the translated text: ${text}`;
}

function buildTranslationUrl(prompt: string, token: string): string {
  const encodedPrompt = encodeURIComponent(prompt);
  return `${API_BASE_URL}/${encodedPrompt}?model=${API_MODEL}&token=${token}`;
}

async function translateText(text: string, sourceLanguage: string, targetLanguage: string, token: string): Promise<string> {
  if (!token) {
    throw new Error('Token missing');
  }

  validateInput(text, sourceLanguage, targetLanguage);

  const prompt = buildTranslationPrompt(text, sourceLanguage, targetLanguage);
  const url = buildTranslationUrl(prompt, token);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const result = await response.text();
  return result.trim();
}

export async function POST({ request }: RequestEvent) {
  try {
    const { text, sourceLanguage, targetLanguage } = await request.json();

    validateInput(text, sourceLanguage, targetLanguage);

    const token = import.meta.env.VITE_APP_API_TOKEN;

    const translated = await translateText(text, sourceLanguage, targetLanguage, token);

    return json({ translated });
  } catch (err) {
    console.error('Error:', err);
    const message = (err as Error).message;
    throw error(500, message);
  }
}
