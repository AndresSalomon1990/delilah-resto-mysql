const express = require('express');
const registerRouter = express.Router();

/* MySQL actions */
const dbActions = require('../db/actions.js');

/* Register user/client */
registerRouter.post('/registrarUsuario', async (req, res, next) => {
  try {
    const newUser = await dbActions.create(`
    INSERT INTO users (name, last_name, username, password, email, phone, address, user_type_id) 
    VALUES (:name, :last_name, :username, :password, :email, :phone, :address, :user_type_id)`,
    { ...req.body, user_type_id: 2 });
    // newUser = [id, rowsAffected]
    if (newUser[1] == 1) {
      res.status(201).json({ message: 'Usuario creado con éxito.', user: req.body });
      return;
    };
    
    throw new Error('Error al conectarse con la base de datos. Por favor intente nuevamente.');
  } catch (error) {
    console.log(error.message);
    res.status(400).json( { message: error.message } );
  };
});

/* Register admin */
registerRouter.post('/registrarAdmin', async (req, res, next) => {
  try {
    const newAdmin = await dbActions.create(`
    INSERT INTO users (name, last_name, username, password, email, phone, address, user_type_id) 
    VALUES (:name, :last_name, :username, :password, :email, :phone, :address, :user_type_id)`,
    { ...req.body, user_type_id: 1 });
    // newAdmin = [id, rowsAffected]
    if (newAdmin[1] == 1) {
      res.status(201).json({ message: 'Admin creado con éxito.', user: req.body });
      return;
    };
    
    throw new Error('Error al conectarse con la base de datos. Por favor intente nuevamente.');
  } catch (error) {
    console.log(error.message);
    res.status(400).json( { message: error.message } );
  };
});

module.exports = registerRouter;