// Simple in-memory user store for demo purposes
const users = [];

module.exports = {
    create: async ({ id, username, password, role, provider }) => {
        const user = { id, username, password, role, provider };
        users.push(user);
        return user;
    },
    findOne: async ({ username }) => {
        return users.find(u => u.username === username);
    },
    findById: async (id) => {
        return users.find(u => u.id === id);
    },
    saveRefreshToken: async (id, refreshToken) => {
        const user = users.find(u => u.id === id);
        if (user) user.refreshToken = refreshToken;
    },
    findByRefreshToken: async (refreshToken) => {
        const user = users.find(u => u.refreshToken === refreshToken);
        return user;
    },
    deleteRefreshToken: async (id) => {
        const user = users.find(u => u.id === id);
        if (user) user.refreshToken = null;
    }
};