const fs = require('fs');
const csv = require('csv-parser');
const sqlite3 = require('sqlite3').verbose();

// Path to the CSV file
const csvFilePath = 'file.csv';

// Path to the SQLite database file
const dbFilePath = 'data.db';

// Create a new SQLite database connection
const db = new sqlite3.Database(dbFilePath);

//clear scriptures.db first
db.run(`DROP TABLE IF EXISTS verses`);

// Create a table in the database to store the CSV data
db.run(`
    CREATE TABLE IF NOT EXISTS verses (
        reference TEXT,
        text TEXT
    )
`);

// Read and parse the CSV file
fs.createReadStream(csvFilePath)
    .pipe(csv({ headers: false }))
    .on('data', (data) => {
        // Insert each row of data into the database
        db.run(`
            INSERT INTO verses (reference, text)
            VALUES (?, ?)
        `, [data[0], data[1]]);
        console.log(data[0]);
    })
    .on('end', () => {
        console.log('CSV file successfully parsed and saved to SQLite database.');
        // Close the database connection
        db.close();
    });