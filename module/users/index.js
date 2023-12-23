var _tables = require("../../config.json").tables,
  dataAccess = require("../../DAL/");

var users = {
    getAllUsers: async (req, res) => {
        var getUsersQuery = 'SELECT * FROM ldr.' + _tables.users +  ' WHERE "role"=' + "'user'";
        console.log(getUsersQuery);
        users.select(getUsersQuery, (userRes, userNameErr)=>{
            if(userRes){
                if(userRes.length === 0) {
                    return res.status(200).json({
                        status : 400,
                        message : "No user data!"
                    }); 
                }
                else {
                    return res.status(200).json({
                        status : 200,
                        message : userRes
                    }); 
                }
            }
            else {
                return res.status(400).json({
                    status : 400,
                    message : "Something Went Wrong!"
                }); 
            }
        });
    },
    select: function (query, cb) {
        dataAccess.select(query)
        .then((result)=> {
            cb(result.rows, null); 
        })
        .catch(function (err) {
            cb(null, err); 
            console.log("Error : while Sign In subscribers in DB" + err);
        });
    },
};

module.exports = users;