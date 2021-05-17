const express = require('express');
const usersRouter = express.Router();

/* MySQL actions */
const dbActions = require('../db/actions.js');

/* Get all users */
usersRouter.get('/', async (req, res, next) => {
  // this user contains the decoded token so we can validate if it is an admin
  const userLogged = req.user;
  // only the admin can get all users
  if (userLogged.user_type == 1) {
    try {
      const response = await dbActions.get('SELECT * FROM users');
  
      if (response) {
        res.status(200).json(response);
        return;
      };
      
      throw new Error('Error al conectarse con la base de datos. Por favor intente nuevamente.');
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
      return;
    };
  } else {
    res.status(401).json({ message: 'No tiene permisos para realizar esta acción.' });
    return;
  };
});

/* Get user by id */
usersRouter.get('/:userId', async (req, res, next) => {
  // this user contains the decoded token so we can validate the id
  const userLogged = req.user;
  console.log(userLogged);
  // only the user logged can get their data (or the admin)
  if (userLogged.id == req.params.userId || userLogged.user_type == 1){
    try {
      const response = await dbActions.get(`
        SELECT name,
          last_name,
          username,
          password,
          email,
          phone,
          address
        FROM users 
        WHERE id = :userId`, { userId: req.params.userId });
      
      if (response) {
        res.status(200).json(response);
        return;
      };
      
      throw new Error('Error al conectarse con la base de datos. Por favor intente nuevamente.');
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
      return;
    };
  } else {
    res.status(401).json({ message: 'No tiene permisos para realizar esta acción.' });
    return;
  }
});

/* Get user by username */
usersRouter.get('/userByUsername/:username', async (req, res, next) => {
  // this user contains the decoded token so we can validate the id
  const userLogged = req.user;
  // only the user logged can get their data (or the admin)
  if (userLogged.id == req.params.userId || userLogged.user_type == 1){
    try {
      const response = await dbActions.get(`
        SELECT name,
          last_name,
          username,
          password,
          email,
          phone,
          address
        FROM users 
        WHERE username = :username`, { username: req.params.username });
      
      if (response) {
        res.status(200).json(response);
        return;
      };
      
      throw new Error('Error al conectarse con la base de datos. Por favor intente nuevamente.');
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
      return;
    };
  } else {
    res.status(401).json({ message: 'No tiene permisos para realizar esta acción.' });
    return;
  }
});

/* Update user by id */
usersRouter.put('/:userId', async (req, res, next) => {
  // this user contains the decoded token so we can validate if it is an admin
  const userLogged = req.user;
  // only the user logged can update their data (or the admin)
  if (userLogged.id == req.params.userId || userLogged.user_type == 1) {
    try {
      const response = await dbActions.update(`
        UPDATE users 
        SET name = :name,
            last_name = :last_name,
            username = :username,
            password = :password,
            email = :email,
            phone = :phone,
            address = :address
        WHERE id = :userId`, 
        { ...req.body, userId: req.params.userId });
        
      // response = [undefined, rowsAffected]
      if (response[1] == 1) {
        res.status(200).json({ message: 'Usuario modificado con éxito.', user: req.body });
        return;
      };
      
      throw new Error('Error al conectarse con la base de datos. Por favor intente nuevamente.');
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
      return;
    };
  } else {
    res.status(401).json({ message: 'No tiene permisos para realizar esta acción.' });
    return;
  };
});

/* Delete user by id */
usersRouter.delete('/:userId', async (req, res, next) => {
  // this user contains the decoded token so we can validate if it is an admin
  const userLogged = req.user;
  // only the admin can delete an user
  if (userLogged.user_type == 1) {
    try {
      const response = await dbActions.delete('DELETE FROM users WHERE id = :userId', { userId: req.params.userId });
      
      if (response == 1) {
        res.status(200).json({ message: 'Usuario eliminado con éxito.' });
        return;
      } else if (response == 0) {
        res.status(404).json({ message: 'El usuario no existe.' });
        return;
      };
      
      throw new Error('Error al conectarse con la base de datos. Por favor intente nuevamente.');
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
      return;
    };
  } else {
    res.status(401).json({ message: 'No tiene permisos para realizar esta acción.' });
    return;
  };
});

module.exports = usersRouter;