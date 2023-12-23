const { Client } = require("pg");
config = require("../config.json");
var _db = null;
var clientCredentials = null;

module.exports = {
  connect: function () {
    try {
      if (config.production) {
        clientCredentials = {
          user: config.database.production.user,
          host: config.database.production.host,
          database: config.database.production.database,
          password: config.database.production.password,
          port: config.database.production.port,
        };
      } else {
        clientCredentials = {
          user: config.database.localHost.user,
          host: config.database.localHost.host,
          database: config.database.localHost.database,
          password: config.database.localHost.password,
          port: config.database.localHost.port,
        };
      }

      const client = new Client(clientCredentials);

      client.connect()
      .then(()=>{
        _db = client;
        console.log("PG Connected!");
      }).catch((err)=>{
        console.log("PG Error! connecting with DB: " + err);
      });
    } catch (err) {
      console.log("PG Error! connecting with DB: " + err);
      process.exit();
    }
  },
  get: function () {
    return _db;
  },
};
