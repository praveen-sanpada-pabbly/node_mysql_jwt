
require('dotenv').config()

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if token is provided
    if (!token) {
        return res.status(400).json({ message: 'Token not provided' });
    }

    // Verify the token
    jwt.verify(token.replace('Bearer ', ''), secret, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(401).json({ message: 'Invalid token' });
        }

        // If token is valid, attach the decoded user information to the request object
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;




// const jwt = require('jsonwebtoken');
// const secret = process.env.SECRET_KEY;

// module.exports = (req, res, next) => {

//     // Extract the token from the request headers
//     const token = req.header('Authorization');

//     console.log(secret)
//     // Check if token is provided
//     if (!token) {
//         return res.status(400).json({ message: 'Token not provided' });
//     }

//     try {
//         // Verify the token
//         const decoded = jwt.verify(token, secret);

//         // Attach the decoded user data to the request object
//         req.user = decoded;

//         // Proceed to the next middleware
//         next();
//     } catch (error) {
//         console.error('Error verifying token:', error);
//         return res.status(401).json({ message: 'Invalid token' });
//     }

// };
