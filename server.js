const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');

let client;
const url =
    'mongodb+srv://originalsidd:s0i0d0d0@cluster0.90vi4vl.mongodb.net/?retryWrites=true&w=majority';
client = new MongoClient(url);
client.connect();

async function main() {
    try {
        await client.connect();
        // await listDbs(client);
    } catch (e) {
        console.error(e);
    }
}

main().catch(console.error);

// async function listDbs(client) {
//     const dblist = await client.db().admin().listDatabases();
//     dblist.databases.forEach((db) => {
//         console.log(db.name);
//     });
// }

const check = require('./controllers/check');
const signup = require('./controllers/signup');
const signin = require('./controllers/signin');

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const domainsFromEnv = process.env.CORS_DOMAINS || '';
const whitelist = domainsFromEnv.split(',').map((item) => item.trim());

const app = express();

app.use(express.json());

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

const handleGetEvents = async (req, res) => {
    await client
        .db('Motorq_sidd')
        .collection('events')
        .find({})
        .toArray(function (err, result) {
            res.json(result);
        });
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('This is working');
});

app.get('/events', (req, res) => {
    handleGetEvents(req, res);
});

app.post('/signup', (req, res) => {
    signup.handleSignup(req, res, client, bcrypt);
});

app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, client, bcrypt);
});

app.get('/:id', (req, res) => {
    check.handleCheckGet(req, res);
});

app.listen(2000, () => {
    console.log('App is running on port 2000');
});
