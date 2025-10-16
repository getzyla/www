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
  return `Translate from ${sourceLanguage} to ${targetLanguage}. Be natural and idiomatic. Output only the translation: ${text}`;
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
