const User = require('../models/User')
const user = new User()
class UserController{
    view(req, res){
        var id = req.params.id;
        console.log(id);
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
}

module.exports = new UserController