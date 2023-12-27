var _tables = require("../../config.json").tables,
  dataAccess = require("../../DAL/");

var career = {
    career: async (req, res) => {
        var data = req.body;        
        data.createdOn = new Date().toISOString();
        data.updatedOn = new Date().toISOString();
        data.cv = req.file.filename;
        var insertQuery = 'INSERT into ldr.' + _tables.career +  ' ("name", "emailAddress", "phoneNumber", "dob", "gender", "role", "experience", "ctc", "address", "resume", "createdOn", "updatedOn") VALUES (' + "'" + data.name + "'" + "," + "'" + data.emailAddress + "'" + ","+ "'" + data.phoneNumber + "'" + "," + "'" + data.dob  + "'" + "," + "'" + data.gender  + "'" + "," + "'" + data.role  + "'" + "," + "'" + data.experience  + "'" + "," + "'" + data.ctc  + "'" + "," + "'" + data.address  + "'" + "," + "'" + data.cv  + "'" + "," + "'" + data.createdOn  + "'" + "," + "'" + data.updatedOn  + "')";
        dataAccess.insert(insertQuery)
        .then((result)=> {
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
            console.log("Error while career in DB" + err);
        });
    },
};

module.exports = career;