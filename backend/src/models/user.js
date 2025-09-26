// Simple in-memory user store for demo purposes
const users = [];

module.exports = {
    create: async ({ username, password, role }) => {
        const user = { id: users.length + 1, username, password, role };
        users.push(user);
        return user;
    },
    findOne: async ({ username }) => {
        return users.find(u => u.username === username);
    }
};