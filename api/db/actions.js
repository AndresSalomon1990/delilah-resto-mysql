const Sequelize = require('sequelize');
const db = new Sequelize('mysql://root:root@127.0.0.1:3306/delilah_resto');

/* Get all or by id */
module.exports.get = async (sqlSentence, parameters) => {
  try {
    const response = await db.query(
      sqlSentence, 
      { replacements: parameters, type: db.QueryTypes.SELECT }
    );

    if (response) {
      return response;
    };

    throw new Error('Error al conectarse con la base de datos. Por favor intente nuevamente.');
  } catch (error) {
    console.log(error.message);
    return(error.message);
  };
};

/* Create type: db.QueryTypes.INSERT */
module.exports.create = async (sqlSentence, parameters) => {
  try {
    const response = await db.query(
      sqlSentence, 
      { replacements: parameters }
    );

    if (response) {
      return response;
    };

    throw new Error('Error al conectarse con la base de datos. Por favor intente nuevamente.');
  } catch (error) {
    console.log(error.message);
    return(error.message);
  };
};

/* Update */
module.exports.update = async (sqlSentence, parameters) => {
  try {
    const response = await db.query(
      sqlSentence, 
      { replacements: parameters, type: db.QueryTypes.UPDATE }
    );

    if (response) {
      return response;
    };

    throw new Error("Error al conectarse con la base de datos. Por favor intente nuevamente.");
  } catch (error) {
    console.log(error.message);
    return(error.message);
  };
};

/* Delete */
module.exports.delete = async (sqlSentence, parameters) => {
  try {
    const response = await db.query(
      sqlSentence, 
      { replacements: parameters }
    );
    
    if (response[0].affectedRows > 0) {
      return 1;
    } else if (response[0].affectedRows == 0) {
      return 0;
    }

    throw new Error('Error al conectarse con la base de datos. Por favor intente nuevamente.');
  } catch (error) {
    console.log(error.message);
    return(error.message);
  };
};