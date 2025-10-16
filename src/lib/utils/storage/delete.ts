import { initializeZylaDB } from './initialize';

export async function deleteTranslation(id: number): Promise<void> {
  const db = await initializeZylaDB();
  const transaction = db.transaction(['translations'], 'readwrite');
  const store = transaction.objectStore('translations');

  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
