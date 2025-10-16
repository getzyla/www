import { initializeZylaDB } from './initialize';

export interface Translation {
  id?: number;
  inputText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  timestamp: number;
}

export async function setTranslation(translationData: Omit<Translation, 'id' | 'timestamp'>): Promise<void> {
  const db = await initializeZylaDB();
  const transaction = db.transaction(['translations'], 'readwrite');
  const store = transaction.objectStore('translations');

  const translation: Translation = {
    ...translationData,
    timestamp: Date.now()
  };

  return new Promise((resolve, reject) => {
    const request = store.add(translation);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
