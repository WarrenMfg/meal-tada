/* eslint-disable no-console */
import jwt from 'jsonwebtoken';

export default (app, db) => {
  app.post('/api/login', (req, res) => {
    try {
      const { credentials } = req.body;
      if (
        credentials === process.env.ADMIN_1 ||
        credentials === process.env.ADMIN_2
      ) {
        const user = credentials.split(' ')[0];
        const payload = {
          user
        };
        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: process.env.EXPIRES_IN },
          (err, token) => {
            if (err) {
              return res
                .status(500)
                .json({ message: 'Could not log in user.' });
            } else {
              return res.send({ token: `MTA ${token}` });
            }
          }
        );
      } else {
        res.redirect('/');
      }
    } catch (err) {
      res.status(500);
      console.log(err.message, err.stack);
    }
  });
};
