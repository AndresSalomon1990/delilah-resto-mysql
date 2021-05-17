const express = require('express');
const loginRouter = express.Router();

/* MySQL actions */
const dbActions = require('../db/actions.js');

/* Authentication */
const authentication = require('../services/authentication.js');

/* Login and send token */
loginRouter.post('/', async (req, res) => {
  const arg = req.body;
  const { username, password } = arg; // same names in the front-end (or Postman) for the login
  try {
    const user = await dbActions.get(`
      SELECT id, username, password, user_type_id
      FROM users 
      WHERE username = :username 
        AND password = :password`, 
      { username: username, password: password });
    
    if (user.length > 0) {
      // send the token if the user exist
      const data = { id: user[0].id, username, password, user_type: user[0].user_type_id };
      const token = authentication.sign(data);
      res.status(200).json({
        result: 'Login correcto.',
        id: data.id,
        userType: data.user_type,
        token
      });
      return;
    } else if (user.length == 0) {
      res.status(404).json({
        result: 'El usuario no existe.',
      });
      return;
    } else {
      throw new Error('Error al conectarse con la base de datos. Por favor intente nuevamente.');
    };
  } catch (error) {
    console.log(error.message);
    res.status(400).json( { message: error.message } );
  };
});

module.exports = loginRouter;