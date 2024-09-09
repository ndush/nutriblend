import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ error: 'No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    req.userId = decoded.userId;
    next();
  });
}
