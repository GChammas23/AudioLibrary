module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET,
    },

    mongo: {
        url: process.env.DB_URL,
    },

    apiKeys: {
        sendGrid: process.env.SEND_GRID_API_KEY,
    },

    server: {
        port: process.env.PORT,
    },

    email: process.env.EMAIL,
}