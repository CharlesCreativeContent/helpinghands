// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// To parse JSON data
app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

 app.get('/api/twitter/:username', async (req, res) => {
    const { username } = req.params;
    const bearerToken = process.env.TWITTER_BEARER_TOKEN; // Store Bearer token in environment variables

    try {
        const url = `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url,description,public_metrics`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Twitter API request failed');
        }

        const data = await response.json();
        console.log(data)
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});

module.exports = app;


// server.js
// api/twitter.js
// import fetch from 'node-fetch';
// import 'dotenv/config'; // For Vercel to load the environment variables

// export default async function handler(req, res) {
//     const { username } = req.query; // Use req.query for serverless functions
//     const bearerToken = process.env.TWITTER_BEARER_TOKEN;

//     if (!username) {
//         return res.status(400).json({ error: 'Username is required' });
//     }

//     try {
//         const url = `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url,description,public_metrics`;
//         const response = await fetch(url, {
//             headers: {
//                 Authorization: `Bearer ${bearerToken}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Twitter API request failed');
//         }

//         const data = await response.json();
//         return res.status(200).json(data);
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }