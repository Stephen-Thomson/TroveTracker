import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import { parse } from 'react-native-csv';

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

  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Items (Name, Type) VALUES (?, ?)',
        [name, type],
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

export const insertItemsFromCSV = async (filePath) => {
  const db = await getDBConnection();

  const fileContent = await RNFS.readFile(filePath, 'utf8');
  const records = parse(fileContent, { header: true });

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      records.forEach(record => {
        const { Name, Type } = record;
        if (Name) {
          tx.executeSql(
            'INSERT INTO Items (Name, Type) VALUES (?, ?)',
            [Name, Type || ''],
            (tx, results) => {
              // Continue to next record
            },
            (tx, error) => {
              reject(error);
            }
          );
        }
      });
      resolve();
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
