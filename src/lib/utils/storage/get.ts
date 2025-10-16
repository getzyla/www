import { initializeZylaDB } from './initialize';
import type { Translation } from './set';

export async function getAllTranslations(): Promise<Translation[]> {
  const db = await initializeZylaDB();
  const transaction = db.transaction(['translations'], 'readonly');
  const store = transaction.objectStore('translations');

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as Translation[]);
    request.onerror = () => reject(request.error);
  });
}
