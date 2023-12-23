var _tables = require("../../config.json").tables,
  dataAccess = require("../../DAL/");

var subscribers = {
    signUp: async (req, res) => {
        var data = req.body;
        var selectUserNameQuery = 'SELECT * FROM ldr.' + _tables.users +  ' WHERE "userName"=' + "'" + data.userName + "'";
        var selectEmailAddressQuery = 'SELECT * FROM ldr.' + _tables.users +  ' WHERE "emailAddress"=' + "'" + data.emailAddress + "'";
        var selectPhoneNumberQuery = 'SELECT * FROM ldr.' + _tables.users +  ' WHERE "phoneNumber"='+ "'"  + data.phoneNumber + "'";
        subscribers.select(selectUserNameQuery, (userNameRes, userNameErr)=>{
            if(userNameRes){
                if(userNameRes.length === 0) {
                    subscribers.select(selectEmailAddressQuery, (userEmailRes, userEmailErr)=>{
                        if(userEmailRes){
                            if(userEmailRes.length === 0) {
                                subscribers.select(selectPhoneNumberQuery, (userPhoneRes, userPhoneErr)=>{
                                    if(userPhoneRes){
                                        if(userPhoneRes.length === 0) {
                                            data.createdOn = new Date().toISOString();
                                            data.updatedOn = new Date().toISOString();
                                            var insertQuery = 'INSERT into ldr.' + _tables.users +  ' ("userName", "emailAddress", "phoneNumber", "password", "role", "createdOn", "updatedOn") VALUES (' + "'" + data.userName + "'" + "," + "'" + data.emailAddress + "'" + ","+ "'" + data.phoneNumber + "'" + "," + "'" + data.password  + "'" + "," + "'" + data.role + "'"   + "," + "'" + data.createdOn + "'"   + "," + "'" + data.updatedOn + "')";
                                            dataAccess.insert(insertQuery)
                                            .then((result)=> {
                                                return res.status(200).json({
                                                    status : 200,
                                                    message : "Sign Up Success!"
                                                });    
                                            })
                                            .catch(function (err) {
                                                console.log("Error : while Sign In subscribers in DB" + err);
                                                return res.status(400).json({
                                                    status : 400,
                                                    message : "Something went wrong!"
                                                });
                                            
                                            });
                                        }
                                        else {
                                            return res.status(200).json({
                                                status : 400,
                                                message : "Phone Number Already Exists!"
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
                            }
                            else {
                                return res.status(200).json({
                                    status : 400,
                                    message : "Email Address Already Exists!"
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
                }
                else {
                    return res.status(200).json({
                        status : 400,
                        message : "User Name Already Exists!"
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
    signIn: async (req, res) => {
        var data = req.body;
        var selectUserPassQuery = 'SELECT * FROM ldr.' + _tables.users +  ' WHERE "userName"=' + "'" + data.userName + "' "+ ' AND "password"=' + "'" + data.password + "'";
        subscribers.select(selectUserPassQuery, (userNamePassRes, userNameErr)=>{
            if(userNamePassRes){
                if(userNamePassRes.length === 0) {
                    return res.status(200).json({
                        status : 400,
                        message : "User Name or Password Mismatch"
                    }); 
                }
                else {
                    return res.status(200).json({
                        status : 200,
                        message : userNamePassRes
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
};

module.exports = subscribers;