const { signedCookies } = require('cookie-parser');
const User = require('../models/User')
const user = new User()
class UserController{
    view(req, res){
        var id = req.params.id;
        if(req.signedCookies.userId){
            user.findUserbyId(id, function(result){
                if (result) {
                    return res.json({
                        message: "User founded",
                        result: result
                    })
                }
                return res.send("Cannot find");
            })
        }
        else{
            return res.json({
                message: "Error"
            })
        }
    }

    viewEditInfor(req, res){
        res.render('./editUser.hbs');
    }

    editInfor(req, res){
        if(req.signedCookies.userId){
            user.updateInfor(req.body, function(){
                res.json({message: 'update success'})
            })
        } else{
            return res.json({ message: "You need login to update" })
        }
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