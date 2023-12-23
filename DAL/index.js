var db = require("../database/index"),
  config = require("../config.json");

var dataAccess = {
    select: function (query) {
        console.log(query);
        return new Promise(function (resolve, reject) {
            var _db = db.get();
            _db.query(query).then((result)=>{
                resolve(result);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    insert: function (query) {
        console.log(query);
        return new Promise(function (resolve, reject) {
            var _db = db.get();
            _db.query(query).then((result)=>{
                resolve(result);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
};

module.exports = dataAccess;
