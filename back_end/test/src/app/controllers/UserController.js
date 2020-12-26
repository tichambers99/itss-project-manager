const User = require('../models/User')
const user = new User()

class UserController{
    view(req, res){
        user.findUserByIdV2(req.signedCookies.userId, function(result){
            if (result) {
                return res.json({
                    message: "User founded",
                    result: result
                })
            }
            return res.send("Cannot find");
        })
    }

    viewEditInfor(req, res){
        res.render('./editUser.hbs');
    }

    editInfor(req, res){
       user.updateInfor(req.body, req.signedCookies.userId, function(result){
            if (result) {
                return res.status(200).json({ message: "Update success" })
            } else {
                return res.status(500).json({ message: "Failed to update" })
            }
        }) 
    }

    changePassword(req, res){
        if(req.signedCookies.userId){
            user.changePassword(req.body, req.signedCookies.user, function(){
                res.json({message: 'Change successed'})
            })
        } else{
            return res.json({ message: "You need login to update" })
        }
    }
}

module.exports = new UserController