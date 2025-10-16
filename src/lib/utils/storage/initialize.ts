let db: IDBDatabase | null = null;

export function initializeZylaDB(): Promise<IDBDatabase> {
  if (db) {
    return Promise.resolve(db);
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ZylaDB', 1);

    request.onerror = () => {
      console.error('Failed to open ZylaDB:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const dbInstance = (event.target as IDBOpenDBRequest).result;
      if (!dbInstance.objectStoreNames.contains('translations')) {
        const store = dbInstance.createObjectStore('translations', {
          keyPath: 'id',
          autoIncrement: true
        });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

export { db as zylaDB };
