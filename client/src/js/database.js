import { openDB } from 'idb';

const initDatabase = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const useDatabase = async (content) => {
  console.log('Post to the database');
  // Create a connection to the database database and version we want to use.
  const jateDatabase = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDatabase.transaction('jate', 'readwrite');
  // Open up the desired object store.
  const storeObject = tx.objectStore('jate');
  // Use the .add() method on the store and pass in the content.
  const rq = storeObject.put({ id: 1, value: content });
  // Get confirmation of the request.
  const result = await rq;
  console.log('🚀 - data saved to the database', result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  // Create a connection to the database database and version we want to use.
  const jateDB = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction('jate', 'readonly');
  // Open up the desired object store.
  const storeItem = tx.objectStore('jate');
  // Use the .getAll() method to get all data in the database.
  const request = storeItem.getAll();
  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

initDatabase();
