import { initializeZylaDB } from './initialize';

export async function deleteAllTranslations(): Promise<void> {
  const db = await initializeZylaDB();
  const transaction = db.transaction(['translations'], 'readwrite');
  const store = transaction.objectStore('translations');

  return new Promise((resolve, reject) => {
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
