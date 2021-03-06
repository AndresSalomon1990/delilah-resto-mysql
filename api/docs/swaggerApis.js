/* ---------- Register */
/**
 * @swagger
 * /registrar/registrarUsuario:
 *   post:
 *     tags:
 *      - registrar
 *     description: Crea un usuario cliente en la base de datos.            
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/user'
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Usuario cliente creado con éxito.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 * /registrar/registrarAdmin:
 *   post:
 *     tags:
 *      - registrar
 *     description: Crea un usuario administrador en la base de datos.            
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/user'
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Usuario administrador creado con éxito.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 */

/* ---------- Login  */
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *      - login
 *     description: Permite loguear un usuario en la aplicación con username y password.           
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/loginUser'
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Usuario creado con éxito.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 *       404:
 *         description: El usuario no existe.
 */

/* ---------- Users  */
/**
 * @swagger
 * /usuarios:
 *   get:
 *     tags:
 *       - name: usuarios
 *     description: Devuelve todos los usuarios registrados. Solo para admins.
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Todos los usuarios registrados.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 *       401:
 *         description: No tiene permisos para realizar esta acción.
 * /usuarios/:userId:
 *   get:
 *     tags:
 *       - name: usuarios
 *     description: Devuelve un usuario seleccionado por su id. Solo para admins o el mismo usuario.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Id del usuario.
 *         type: integer
 *       - in: header
 *         name: token
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: El usuario requerido.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 *       401:
 *         description: No tiene permisos para realizar esta acción.
 *   put:
 *     tags:
 *       - name: usuarios
 *     description: Actualiza datos del usuario. Solo para admins o el mismo usuario. No se puede actualizar el id o el user_type.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Id del usuario.
 *         type: integer
 *       - in: header
 *         name: token
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/user'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Usuario modificado con éxito. Más los datos del usuario modificado.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 *       401:
 *         description: No tiene permisos para realizar esta acción.
 *   delete:
 *     tags:
 *       - name: usuarios
 *     description: Remueve un usuario del sistema. Solo para admins.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Id del usuario.
 *         type: integer
 *       - in: header
 *         name: token
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 *       401:
 *         description: No tiene permisos para realizar esta acción.
 *       404:
 *         description: El usuario no existe.
 * /usuarios/userByUsername/:username:
 *   get:
 *     tags:
 *       - name: usuarios
 *     description: Devuelve un usuario seleccionado por su username. Solo para admins o el mismo usuario.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Nombre de usuario del usuario.
 *         type: string
 *       - in: header
 *         name: token
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: El usuario requerido.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 *       401:
 *         description: No tiene permisos para realizar esta acción.
 */

/* ---------- Products  */
/**
 * @swagger
 * /productos:
 *   get:
 *     tags:
 *       - name: productos
 *     description: Devuelve toda la lista de productos registrados.
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Toda la lista de productos registrados.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 *   post:
 *     tags:
 *       - name: productos
 *     description: Crea un producto. Solo para admins.
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/product'
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Producto creado con éxito. Más los datos del producto creado.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 *       401:
 *         description: No tiene permisos para realizar esta acción.
 * /productos/:productId:
 *   get:
 *     tags:
 *       - name: productos
 *     description: Devuelve un producto seleccionado por su id.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Id del producto.
 *         type: integer
 *       - in: header
 *         name: token
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: El usuario requerido.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 *   put:
 *     tags:
 *       - name: productos
 *     description: Actualiza datos de un producto. Solo para admins. No se puede actualizar el id.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Id del producto.
 *         type: integer
 *       - in: header
 *         name: token
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/product'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Producto modificado con éxito. Más los datos del producto modificado.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 *       401:
 *         description: No tiene permisos para realizar esta acción.
 *   delete:
 *     tags:
 *       - name: productos
 *     description: Remueve un producto del sistema. Solo para admins.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Id del producto.
 *         type: integer
 *       - in: header
 *         name: token
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 *       401:
 *         description: No tiene permisos para realizar esta acción.
 *       404:
 *         description: El producto no existe.
 */

/* ---------- Orders */
/**
 * @swagger
 * /ordenes:
 *   get:
 *     tags:
 *       - name: ordenes
 *     description: Devuelve toda la lista de órdenes. Solo para admins.
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Toda la lista de productos registrados.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 *       401:
 *         description: No tiene permisos para realizar esta acción.
 *   post:
 *     tags:
 *       - name: ordenes
 *     description: Crea una orden.
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/createOrder'
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Orden creada con éxito. Más los datos de la orden creada.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 * /ordenes/:orderId:
 *   get:
 *     tags:
 *       - name: ordenes
 *     description: Devuelve una orden seleccionada por su id. Solo para admins.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: Id de la orden.
 *         type: integer
 *       - in: header
 *         name: token
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: La orden requerida.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 *       401:
 *         description: No tiene permisos para realizar esta acción.
 * /ordenes/ordersByUser/:userId:
 *   get:
 *     tags:
 *       - name: ordenes
 *     description: Devuelve todas las órdenes de un usuario. Solo para admins y el usuario mismo.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Id del usuario.
 *         type: integer
 *       - in: header
 *         name: token
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: La lista de órdenes realizadas por el usuario.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 *       401:
 *         description: No tiene permisos para realizar esta acción.
 * /ordenes/:orderId/status/:orderStatusId:
 *   put:
 *     tags:
 *       - name: ordenes
 *     description: Actualiza el estado de una orden. Solo para admins.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: Id de la orden.
 *         type: integer
 *       - in: path
 *         name: orderStatusId
 *         required: true
 *         description: Id del status de la orden.
 *         type: integer
 *       - in: header
 *         name: token
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/orderStatus'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Orden modificada con éxito. Más los datos de la orden modificada.
 *       400:
 *         description: Error al conectarse con la base de datos. Por favor intente nuevamente.
 *       401:
 *         description: No tiene permisos para realizar esta acción.
 */

/* ---------- Schemas */
/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user name.
 *           example: Michael
 *         last_name:
 *           type: string
 *           description: The user last name.
 *           example: Jordan
 *         username:
 *           type: string
 *           description: The user username.
 *           example: m.jordan
 *         password:
 *            type: string
 *            description: The password of the user.
 *            example: MyPassword123
 *         email:
 *            type: string
 *            description: The email of the user.
 *            example: mjordan@gmail.com
 *         phone:
 *            type: string
 *            description: The email of the user.
 *            example: 222-12345678
 *         address:
 *            type: string
 *            description: The address of the user.
 *            example: False street 123
 *     loginUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The user username.
 *           example: m.jordan
 *         password:
 *            type: string
 *            description: The password of the user.
 *            example: MyPassword123
 *     product:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           description: The product description.
 *           example: Hamburguer
 *         price:
 *           type: decimal
 *           description: The product price.
 *           example: 12.50
 *         photo_url:
 *           type: string
 *           description: The path to the product photo.
 *           example: /photos/hamburguer.png
 *     createOrder:
 *       type: object
 *       properties:
 *         payment_type_id:
 *           type: integer
 *           description: The id of the payment type.
 *           example: 1
 *           enum:
 *            - 1 -> efectivo
 *            - 2 -> tarjeta
 *         product_1:
 *           type: object
 *           description: The product selected by the user and the quantity. Can be as many products as the user selects.
 *           properties:
 *             id:
 *               type: integer
 *               description: The id of the selected product.
 *               example: 1
 *             quantity:
 *               type: integer
 *               description: The quantity of the product selected to order.
 *               example: 2
 *         product_2:
 *           type: object
 *           description: The product selected by the user and the quantity. Can be as many products as the user selects.
 *           properties:
 *             id:
 *               type: integer
 *               description: The id of the selected product.
 *               example: 3
 *             quantity:
 *               type: integer
 *               description: The quantity of the product selected to order.
 *               example: 2
 *         product_n:
 *           type: object
 *           description: The product selected by the user and the quantity. Can be as many products as the user selects.
 *           properties:
 *             id:
 *               type: integer
 *               description: The id of the selected product.
 *               example: 1
 *             quantity:
 *               type: integer
 *               description: The quantity of the product selected to order.
 *               example: 3
 */