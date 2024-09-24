// server.js
// api/twitter.js
import fetch from 'node-fetch';
import 'dotenv/config'; // For Vercel to load the environment variables

export default async function handler(req, res) {
    const { username } = req.query; // Use req.query for serverless functions
    const bearerToken = process.env.TWITTER_BEARER_TOKEN;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

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
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//
// app.listen(PORT, () => {
//    console.log(`Server running on port ${PORT}`);
// });
//