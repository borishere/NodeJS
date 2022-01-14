import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  if (req.url === '/users/login') {
    return next();
  }

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(403).json({ message: 'Failed authenticate' });
      } else if (payload) {
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'No token' });
  }
};