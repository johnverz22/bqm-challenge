const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose();
const figlet = require('figlet');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Variables to store settings and bible data
let settings = {};
let bible = [];

// Function to load data from the database
function loadData() {
    const db = new sqlite3.Database(path.join(__dirname, 'data.db'));

    // Load settings
    db.all('SELECT name, value FROM settings', (err, rows) => {
        if (err) {
            console.error('Error loading settings:', err);
        } else {
            rows.forEach(row => {
                settings[row.name] = row.value;
            });
            //console.log('Settings loaded:', settings);
        }
    });

    // Load bible data
    db.all('SELECT reference, text FROM verses', (err, rows) => {
        if (err) {
            console.error('Error loading bible data:', err);
        } else {
            bible = rows.map(row => [row.reference, row.text]);
            //console.log('Bible data loaded:', bible);
        }
    });

    db.close();
}

// Load data at startup
loadData();

// Set the "public" directory as the static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewer.html'));
});

app.get('/setting', (req, res) => {
     res.sendFile(path.join(__dirname, 'public', 'setting.html'));
});

app.get('/upload-csv')


app.get('/control', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'control.html'));
});

app.get('/get-timer', (req, res) => {
    const timerLength = settings['timer-length'];
    res.json({ timerLength });
});

app.get('/get-verses', (req, res) => {

    const number = settings['verses-number'];

    const verses = [];
    while (verses.length < number) {
        const randomIndex = Math.floor(Math.random() * bible.length);
        const verse = bible[randomIndex];
        if (!verses.includes(verse)) {
            verses.push({ reference: verse[0], text: verse[1] });
        }
    }
    res.json(verses);
});

app.get('/get-settings', (rec, res) => {
    res.json(settings);
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast the message to all clients except the sender
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
});

server.listen(3000, () => {
		figlet('BQM', function(err, data) {
			if (err) {
				console.log('Something went wrong...');
				console.dir(err);
				return;
			}
			console.log(data);
			console.log('Verse-location Challenge');
			console.log('Application started...');
			console.log('Do not close this window');
		});
		
}); 