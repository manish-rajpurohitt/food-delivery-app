import { ClientModels, Models, clientTokenHelper } from "common";
import { Helpers } from "common";


const signup = async (req, res, next) => {
    try {
        if (Helpers.IsStringNullOrEmptyOrUndefined(req.body.email) || Helpers.IsStringNullOrEmptyOrUndefined(req.body.password)) {
            Helpers.responseHelper(res, 400, "Email and password cannot be empty!");
            return;
        }

        let address = await Models.Address.create({
            ...req.body.address
        });

        let client = await ClientModels.User.create({
            ...req.body,
            address: address._id
        });

        Helpers.responseHelper(res, 200, "Success Signup!", {
            client
        });

        return;
    }
    catch (ex) {
        console.log(ex);
        Helpers.responseHelper(res, 400, "Server error!", null)
    }
}


const signin = async (req, res, next) => {
    try {
        if (Helpers.IsStringNullOrEmptyOrUndefined(req.body.email) || Helpers.IsStringNullOrEmptyOrUndefined(req.body.password)) {
            Helpers.responseHelper(res, 400, "Email and password cannot be empty!");
            return;
        }

        let client = await ClientModels.User.findOne({ email: req.body.email });

        if (!client) {
            Helpers.responseHelper(res, 404, "User with email not found!", null);
            return
        }

        let isPasswordValid = await client.comparePassword(req.body.password);

        if (!isPasswordValid) {
            Helpers.responseHelper(res, 401, "Invalid Password", null);
            return;
        }
        let token = await clientTokenHelper.generateAuthToken({
            _id: client._id,
            name: client.username
        });

        Helpers.responseHelper(res, 200, "Success Login!", {
            token: token
        });

        return;
    }
    catch (ex) {
        console.log(ex);
        Helpers.responseHelper(res, 400, "Server error!", null)
    }
}

export default { signup, signin }