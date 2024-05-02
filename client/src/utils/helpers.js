// Function to pluralize a name based on count
export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

// IndexedDB promise-based utility function
export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('shop-shop', 1);
    let db, tx, store;

    // Handle database upgrade
    request.onupgradeneeded = function(e) {
      const db = request.result;
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    // Handle database errors
    request.onerror = function(e) {
      console.log('There was an error');
    };

    // Handle successful database connection
    request.onsuccess = function(e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      // Handle transaction errors
      db.onerror = function(e) {
        console.log('error', e);
      };

      // Perform actions based on the method
      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      // Close the transaction when complete
      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}
