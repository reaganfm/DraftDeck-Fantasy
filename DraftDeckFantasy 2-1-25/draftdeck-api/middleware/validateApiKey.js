module.exports = (req, res, next) => {
    if (!process.env.RAPIDAPI_KEY) {
        return res.status(500).json({ error: "Server API key missing" });
    }
    next();
};
