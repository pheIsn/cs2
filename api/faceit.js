const https = require('https');

const API_KEY = 'af617f2a-64ae-48f5-b277-d220bd594078';

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { nickname, type, player_id } = req.query;

    if (!nickname && !player_id) {
        res.status(400).json({ error: 'nickname or player_id required' });
        return;
    }

    let faceitUrl;
    if (type === 'player') {
        faceitUrl = `https://open.faceit.com/data/v4/players?nickname=${encodeURIComponent(nickname)}`;
    } else if (type === 'stats') {
        faceitUrl = `https://open.faceit.com/data/v4/players/${player_id}/stats/cs2`;
    } else {
        res.status(400).json({ error: 'Invalid type' });
        return;
    }

    const options = {
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Accept': 'application/json'
        }
    };

    https.get(faceitUrl, options, (faceitRes) => {
        let data = '';

        faceitRes.on('data', (chunk) => {
            data += chunk;
        });

        faceitRes.on('end', () => {
            res.status(faceitRes.statusCode).json(JSON.parse(data));
        });
    }).on('error', (err) => {
        res.status(500).json({ error: err.message });
    });
};
