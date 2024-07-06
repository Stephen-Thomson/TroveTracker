import SQLite from 'react-native-sqlite-storage';
import * as Papa from 'papaparse';
import { Alert } from 'react-native';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "TroveTracker.db";
const database_version = "1.0";
const database_displayname = "SQLite Database";
const database_size = 200000;

let selectedTable = 'Inventory';

export const setTable = (table) => {
  selectedTable = table;
};

export const getDBConnection = async () => {
  return await SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size
  );
};

export const createTables = async () => {
  const db = await getDBConnection();
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT,
        Type TEXT
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Wanted (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT,
        Type TEXT
      );`
    );
  });
};

export const initDatabase = async () => {
  const db = await getDBConnection();
  await createTables();
  return db;
};

export const itemExists = async (name, type = '') => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${selectedTable} WHERE LOWER(Name) = ? AND LOWER(Type) = ?`,
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
        `INSERT INTO ${selectedTable} (Name, Type) VALUES (?, ?)`,
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

    const results = Papa.parse(fileContent, {
      header: false,
      skipEmptyLines: true,
    });

    if (results.errors.length) {
      Alert.alert('Error', `CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`);
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
    Alert.alert('Error', 'Error inserting items from CSV: ' + error.message);
    console.error('Error inserting items from CSV:', error);
    throw error;
  }
};

export const searchItems = async (query = '', type = '') => {
  const db = await getDBConnection();
  let sql = `SELECT * FROM ${selectedTable}`;
  let conditions = [];
  let params = [];

  if (query) {
    conditions.push('LOWER(Name) LIKE ?');
    params.push(`%${query.toLowerCase()}%`);
  }
  if (type) {
    conditions.push('LOWER(Type) LIKE ?');
    params.push(`%${type.toLowerCase()}%`);
  }
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  console.log('SQL Query:', sql);
  console.log('Parameters:', params);

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(sql, params, (tx, results) => {
        const rows = [];
        for (let i = 0; i < results.rows.length; i++) {
          rows.push(results.rows.item(i));
        }
        console.log('Search Results:', rows);
        resolve(rows);
      }, error => {
        console.error('SQL Error:', error);
        reject(error);
      });
    });
  });
};

export const getAllItems = async () => {
  const db = await getDBConnection();
  const sql = `SELECT * FROM ${selectedTable}`;

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, results) => {
          const rows = [];
          for (let i = 0; i < results.rows.length; i++) {
            rows.push(results.rows.item(i));
          }
          resolve(rows);
        },
        (tx, error) => {
          console.error('Failed to retrieve items:', error);
          reject(error);
        }
      );
    });
  });
};

export const deleteItemsByIds = async (ids) => {
  if (ids.length === 0) return;

  const db = await getDBConnection();
  const placeholders = ids.map(() => '?').join(', ');
  const sql = `DELETE FROM ${selectedTable} WHERE id IN (${placeholders})`;

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        ids,
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
