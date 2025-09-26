exports.oauthMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token using your OAuth provider's library or API
    // This is a placeholder for actual OAuth verification logic
    verifyOAuthToken(token)
        .then(user => {
            req.user = user; // Attach user information to the request
            next();
        })
        .catch(err => {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        });
};

// Placeholder function for OAuth token verification
function verifyOAuthToken(token) {
    return new Promise((resolve, reject) => {
        // Implement your OAuth token verification logic here
        // For example, you might call an external API to validate the token
        // If valid, resolve with user data; if invalid, reject with an error
        const mockUser = { id: 1, name: 'John Doe', role: 'user' }; // Mock user data
        resolve(mockUser); // Simulate successful verification
    });
}