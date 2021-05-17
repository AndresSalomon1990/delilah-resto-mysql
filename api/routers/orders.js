const express = require('express');
const ordersRouter = express.Router();

/* MySQL actions */
const dbActions = require('../db/actions.js');

/* get all orders */
ordersRouter.get('/', async (req, res, next) => {
  // this user contains the decoded token so we can validate if it is an admin
  const userLogged = req.user;
  // only the admin can get all orders
  if (userLogged.user_type == 1) {
    try {
      const response = await dbActions.get(`
        SELECT s.description AS ESTADO,
        o.timestamp AS HORA,
          o.id AS NÚMERO,
          o.description AS DESCRIPCIÓN,
          pt.description AS MÉTODO_DE_PAGO,
          o.total AS TOTAL,
          CONCAT(u.name, ' ', u.last_name) AS USUARIO,
          u.address AS DIRECCIÓN
        FROM orders AS o
        INNER JOIN users AS u
          ON o.user_id = u.id
        INNER JOIN payment_type as pt
          ON o.payment_type_id = pt.id
        INNER JOIN status as s
          ON o.status_id = s.id`);
      
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

/* get a single order */
ordersRouter.get('/:orderId', async (req, res, next) => {
  // this user contains the decoded token so we can validate if it is an admin
  const userLogged = req.user;
  // only the admin can get orders by id
  if (userLogged.user_type == 1) {
    try {
      const response = await dbActions.get(`
        SELECT s.description AS ESTADO,
        o.timestamp AS HORA,
          o.id AS NÚMERO,
          o.description AS DESCRIPCIÓN,
          pt.description AS MÉTODO_DE_PAGO,
          o.total AS TOTAL,
          CONCAT(u.name, ' ', u.last_name) AS USUARIO,
          u.address AS DIRECCIÓN
        FROM orders AS o
        INNER JOIN users AS u
          ON o.user_id = u.id
        INNER JOIN payment_type as pt
          ON o.payment_type_id = pt.id
        INNER JOIN status as s
          ON o.status_id = s.id
        WHERE o.id = :order_id`,
        { order_id: req.params.orderId });
      
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

/* get all orders by user */
ordersRouter.get('/ordersByUser/:userId', async (req, res, next) => {
  // this user contains the decoded token so we can validate if it is an admin
  const userLogged = req.user;
  // only the admin can get all orders by userId or the user logged
  if (userLogged.id == req.params.userId || userLogged.user_type == 1) {
    try {
      const response = await dbActions.get(`
        SELECT s.description AS ESTADO,
        o.timestamp AS HORA,
          o.id AS NÚMERO,
          o.description AS DESCRIPCIÓN,
          pt.description AS MÉTODO_DE_PAGO,
          o.total AS TOTAL,
          CONCAT(u.name, ' ', u.last_name) AS USUARIO,
          u.address AS DIRECCIÓN
        FROM orders AS o
        INNER JOIN users AS u
          ON o.user_id = u.id
        INNER JOIN payment_type as pt
          ON o.payment_type_id = pt.id
        INNER JOIN status as s
          ON o.status_id = s.id
        WHERE o.user_id = :user_id`,
        { user_id: req.params.userId });
      
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

/* Create an order 
  order schema:
  {
    payment_type_id: '1',
    product_1: {
      id: 1,
      quantity: 1
    },
    product_2: {
      id: 4,
      quantity: 2
    },
    ...
  }
*/
ordersRouter.post('/', async (req, res, next) => {
  const userLogged = req.user;
  const order = req.body;
  try {
    const orderResponse = await dbActions.create(`
      INSERT INTO orders (payment_type_id, user_id) 
      VALUES (:payment_type_id, :user_id)`,
      { payment_type_id: order.payment_type_id, user_id: userLogged.id });

    const orderId = orderResponse[0];
    const ordersProducts = []; // testing purposes

    // fill in the bridge table orders_products
    for (const product in order) {
      if (product != "payment_type_id") {
        const orderProductsResponse = await dbActions.create(`
          INSERT INTO orders_products (order_id, product_id, quantity)
          VALUES (:order_id, :product_id, :quantity)`,
        { order_id: orderId, product_id: order[product].id, quantity: order[product].quantity });

        ordersProducts.push(orderProductsResponse); // testing purposes
      };
    };

    // query to update the description and total price of the orders table
    const orderUpdateData = await dbActions.get(`
      SELECT op.order_id, 
        GROUP_CONCAT(CONCAT(p.description, 'x', op.quantity) SEPARATOR' ') AS description, 
        SUM(p.price * op.quantity) AS total
      FROM orders_products as op
      INNER JOIN products AS p
        ON p.id = op.product_id
      WHERE op.order_id = :order_id 
      GROUP BY op.order_id`,
      { order_id: orderId });

    // update the data in order
    const orderUpdate = await dbActions.update(`
      UPDATE orders
      SET description = :description,
          total = :total 
      WHERE id = :order_id`,
      { description: orderUpdateData[0].description, total: orderUpdateData[0].total, order_id: orderId });
    
    // orderUpdate = [undefined, rowsAffected]
    // if the second value of the array orderUpdate == 1, means that 1 row has been affected/modified  
    if (orderUpdate[1] == 1) {
      res.status(201).json({ message: 'Orden creada con éxito.', order: req.body });
      return;
    };
    
    throw new Error('Error al crear la orden. Por favor intente nuevamente.');
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  };
});

/* update an order state */
ordersRouter.put('/:orderId/status/:orderStatusId', async (req, res, next) => {
  // this user contains the decoded token so we can validate if it is an admin
  const userLogged = req.user;
  // only the admin can update orders status
  if (userLogged.user_type == 1) {
    try {
      const response = await dbActions.update(`
        UPDATE orders 
        SET status_id = :orderStatus
        WHERE id = :orderId`, 
        { orderId: req.params.orderId, orderStatus: req.params.orderStatusId });
      
      // response = [undefined, rowsAffected]
      if (response[1] == 1) {
        res.status(200).json({ message: 'Orden modificada con éxito.', order: req.params.orderId, status: req.params.orderStatusId });
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

/* delete an order */
ordersRouter.delete('/:orderId', async (req, res, next) => {
  // this user contains the decoded token so we can validate if it is an admin
  const userLogged = req.user;
  // only the admin can delete an order
  if (userLogged.user_type == 1) {
    try {
      const response = await dbActions.delete('DELETE FROM orders WHERE id = :orderId', { orderId: req.params.orderId });
      
      if (response == 1) {
        res.status(200).json({ message: 'Orden eliminada con éxito.' });
        return;
      } else if (response == 0) {
        res.status(404).json({ message: 'La orden no existe.' });
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

module.exports = ordersRouter;