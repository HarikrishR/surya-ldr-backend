var _tables = require("../../config.json").tables,
  dataAccess = require("../../DAL/"),
  _mailer = require("../../helper/email");

var contactUs = {
    contactUs: async (req, res) => {
        var data = req.body;        
        data.createdOn = new Date().toISOString();
        data.updatedOn = new Date().toISOString();
        var insertQuery = 'INSERT into ldr.' + _tables.contactUs +  ' ("name", "emailAddress", "phoneNumber", "location", "message", "createdOn", "updatedOn") VALUES (' + "'" + data.name + "'" + "," + "'" + data.emailAddress + "'" + ","+ "'" + data.phoneNumber + "'" + "," + "'" + data.location  + "'" + "," + "'" + data.message  + "'" + "," + "'" + data.createdOn  + "'" + "," + "'" + data.updatedOn  + "')";
        dataAccess.insert(insertQuery)
        .then((result)=> {
            _mailer.trigger(data, "contactUs", async (success, error) => {
                // return res.status(200).json({ statusText: "success", status: 200 });
            });
            return res.status(200).json({
                status : 200,
                message : "Our Team Will Contact You Soon!"
            });    
        })
        .catch(function (err) {
            return res.status(400).json({
                status : 400,
                message : "Something went wrong!"
            });
        });
    },
    select: function (query, cb) {
        dataAccess.select(query)
        .then((result)=> {
            cb(result.rows, null); 
        })
        .catch(function (err) {
            cb(null, err); 
            console.log("Error while contactUs in DB" + err);
        });
    },
};

module.exports = contactUs;