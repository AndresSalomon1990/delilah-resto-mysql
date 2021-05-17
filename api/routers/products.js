const express = require('express');
const productsRouter = express.Router();

/* MySQL actions */
const dbActions = require('../db/actions.js');

/* Get all products */
productsRouter.get('/', async (req, res, next) => {
  try {
    const response = await dbActions.get('SELECT * FROM products');

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
});

/* Get product by id */
productsRouter.get('/:productId', async (req, res, next) => {
  try {
    const response = await dbActions.get('SELECT * FROM products WHERE id = :productId', { productId: req.params.productId });

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
});

/* Create a product */
productsRouter.post('/', async (req, res, next) => {
  // this user contains the decoded token so we can validate if it is an admin
  const userLogged = req.user;
  // only the admin can create products
  if (userLogged.user_type == 1) {
    try {
      const response = await dbActions.create(`
        INSERT INTO products (description, price, photo_url) 
        VALUES (:description, :price, :photo_url)`,
        req.body);

      if (response.length > 0) {
        res.status(201).json({ message: 'Producto creado con éxito.', product: req.body });
        return;
      };
      
      throw new Error('Error al conectarse con la base de datos. Por favor intente nuevamente.');
    } catch (error) {
      console.log(error.message);
      res.status(400).json( { message: error.message } );
      return;
    };
  } else {
    res.status(401).json({ message: 'No tiene permisos para realizar esta acción.' });
    return;
  }
});

/* Update product info by id */
productsRouter.put('/:productId', async (req, res, next) => {
  // this user contains the decoded token so we can validate if it is an admin
  const userLogged = req.user;
  // only the admin can update products info
  if (userLogged.user_type == 1) {
    try {
      const response = await dbActions.update(`
        UPDATE products 
        SET description = :description,
            price = :price,
            photo_url = :photo_url
        WHERE id = :productId`, 
        { ...req.body, productId: req.params.productId });
        
      // response = [undefined, rowsAffected]
      if (response[1] == 1) {
        res.status(200).json({ message: 'Producto modificado con éxito.', product: req.body });
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

/* Delete product by id */
productsRouter.delete('/:productId', async (req, res, next) => {
  // this user contains the decoded token so we can validate if it is an admin
  const userLogged = req.user;
  // only the admin can delete a product
  if (userLogged.user_type == 1) {
    try {
      const response = await dbActions.delete('DELETE FROM products WHERE id = :productId', { productId: req.params.productId });
      
      if (response == 1) {
        res.status(200).json({ message: 'Producto eliminado con éxito.' });
        return;
      } else if (response == 0) {
        res.status(404).json({ message: 'El producto no existe.' });
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

module.exports = productsRouter;