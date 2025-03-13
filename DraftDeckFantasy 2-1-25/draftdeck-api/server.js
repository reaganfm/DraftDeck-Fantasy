require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// Function to fetch data from a $ref URL
async function fetchRefData(refUrl) {
    try {
        const response = await axios.get(refUrl);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${refUrl}:`, error);
        return null;
    }
}

// Fetch player stats by ID (with resolved $ref links)
app.get('/api/player/:id', async (req, res) => {
    try {
        const playerId = req.params.id;
        const url = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes/${playerId}/statisticslog?lang=en&region=us`;
        
        const response = await axios.get(url);
        const statisticsLog = response.data.entries || [];

        // Process each season and fetch stats
        const statsPromises = statisticsLog.map(async (entry) => {
            const seasonData = await fetchRefData(entry.season.$ref);
            const statsData = await fetchRefData(entry.statistics[0].statistics.$ref); // Fetch total stats

            return {
                season: seasonData.name || "Unknown Season",
                stats: statsData
            };
        });

        const playerStats = await Promise.all(statsPromises);
        res.json({ playerId, playerStats });

    } catch (error) {
        console.error('Error fetching player stats:', error);
        res.status(500).json({ error: 'Failed to retrieve player data' });
    }
});

// Fetch team stats by season and team ID
app.get('/api/team/:season/:teamId', async (req, res) => {
    try {
        const { season, teamId } = req.params;
        const url = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${season}/teams/${teamId}/statistics?lang=en&region=us`;

        const response = await axios.get(url);
        res.json(response.data);

    } catch (error) {
        console.error('Error fetching team stats:', error);
        res.status(500).json({ error: 'Failed to retrieve team data' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
