import SQLite from 'react-native-sqlite-storage';
import * as Papa from 'papaparse';

// SQLite setup
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "TroveTracker.db";
const database_version = "1.0";
const database_displayname = "SQLite Database";
const database_size = 200000;

export const getDBConnection = async () => {
  return await SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size
  );
};

export const createTable = async () => {
  const db = await getDBConnection();
  await db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Type TEXT
      );`
    );
  });
};

export const initDatabase = async () => {
  const db = await getDBConnection();
  await createTable();
  return db;
};

export const insertItem = async (name, type = '') => {
  if (!name) {
    throw new Error('Name/Description is required');
  }

  console.log('Checking if item exists:', name, type);
  const exists = await itemExists(name, type);
  if (exists) {
    console.log('Item already exists:', name, type);
    return Promise.resolve({ success: true, message: 'Item already exists' });
  }

  const db = await getDBConnection();
  console.log('Inserting item into database:', name, type);
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Items (Name, Type) VALUES (?, ?)',
        [name, type],
        (tx, results) => {
          console.log('Item inserted successfully:', name, type);
          resolve(results);
        },
        (tx, error) => {
          console.log('Error inserting item:', error);
          reject(error);
        }
      );
    });
  });
};

export const insertItemsFromCSV = async (fileContent) => {
  try {
    console.log('File content received:', fileContent);

    // Parse CSV content using PapaParse
    const results = Papa.parse(fileContent, {
      header: false,
      skipEmptyLines: true,
    });

    if (results.errors.length) {
      throw new Error(`CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`);
    }

    const records = results.data;
    console.log('Parsed records:', records);

    for (const record of records) {
      if (record.length >= 2) {
        const name = record[0];
        const type = record[1];
        console.log(`Inserting item: Name=${name}, Type=${type}`);
        await insertItem(name, type);
      } else if (record.length === 1) {
        const name = record[0];
        console.log(`Inserting item: Name=${name}, Type=`);
        await insertItem(name, '');
      }
    }

    console.log('Items have been successfully inserted');
  } catch (error) {
    console.error('Error inserting items from CSV:', error);
    throw error;
  }
};


export const itemExists = async (name, type = '') => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Items WHERE LOWER(Name) = ? AND LOWER(Type) = ?',
        [name.toLowerCase(), type.toLowerCase()],
        (tx, results) => {
          if (results.rows.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
};

export const searchItems = async (query, type = '') => {
  const db = await getDBConnection();
  let sql = 'SELECT * FROM Items WHERE LOWER(name) LIKE ?';
  let params = [`%${query.toLowerCase()}%`];

  if (type) {
    sql += ' AND LOWER(type) = ?';
    params.push(type.toLowerCase());
  }

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(sql, params, (tx, results) => {
        const rows = [];
        for (let i = 0; i < results.rows.length; i++) {
          rows.push(results.rows.item(i));
        }
        resolve(rows);
      }, error => {
        reject(error);
      });
    });
  });
};

export const deleteItem = async (name, type = '') => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM Items WHERE LOWER(Name) = ? AND LOWER(Type) = ?',
        [name.toLowerCase(), type.toLowerCase()],
        (tx, results) => {
          resolve(results);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
};
