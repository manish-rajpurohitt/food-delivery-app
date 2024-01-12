import {DeliveryModels, Models} from "common";
import {Helpers} from "common";
import tokenHekper from "../../services/tokenService.js";



const signup = async (req, res, next) => {
    try{
        if(Helpers.IsStringNullOrEmptyOrUndefined(req.body.email) || Helpers.IsStringNullOrEmptyOrUndefined(req.body.password)){
            Helpers.responseHelper(res, 400, "Email and password cannot be empty!");
            return;
        }

        let address = await Models.Address.create({
            ...req.body.address
        });

        let delUser = await DeliveryModels.DeliveryUser.create({
            ...req.body,
            address: address._id
        });

        Helpers.responseHelper(res, 200, "Success Signup!", {
            delUser
        });

        return;
    }
    catch(ex){
        console.log(ex);
        Helpers.responseHelper(res, 400, "Server error!", null)
    }
}


const signin = async (req, res, next) => {
    try{
        if(Helpers.IsStringNullOrEmptyOrUndefined(req.body.email) || Helpers.IsStringNullOrEmptyOrUndefined(req.body.password)){
            Helpers.responseHelper(res, 400, "Email and password cannot be empty!");
            return;
        }

        let delUser = await DeliveryModels.DeliveryUser.findOne({email: req.body.email});

        if(!delUser){
            Helpers.responseHelper(res, 404, "User with email not found!", null);
            return
        }

        let isPasswordValid = await delUser.comparePassword(req.body.password);
 
        if(!isPasswordValid){
            Helpers.responseHelper(res, 401, "Invalid Password", null);
            return;
        }
        let token = await tokenHekper.generateAuthToken({
            _id: delUser._id,
            name: delUser.username
        });

        Helpers.responseHelper(res, 200, "Success Login!", {
            token: token
        });

        return;
    }
    catch(ex){
        console.log(ex);
        Helpers.responseHelper(res, 400, "Server error!", null)
    }
}

export default {signup, signin}