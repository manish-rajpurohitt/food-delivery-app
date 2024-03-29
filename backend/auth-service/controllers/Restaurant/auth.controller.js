import { RestaurantModels, Models, restaurantTokenHelper } from "common";
import { Helpers } from "common";



const signup = async (req, res, next) => {
    try {
        if (Helpers.IsStringNullOrEmptyOrUndefined(req.body.email) || Helpers.IsStringNullOrEmptyOrUndefined(req.body.password)) {
            Helpers.responseHelper(res, 400, "Email and password cannot be empty!");
            return;
        }


        let restaurant = await RestaurantModels.Restaurant.findOne({ email: req.body.email });

        if (restaurant) {
            Helpers.responseHelper(res, 400, "Restaurant Already Created. Please Login to continue.", null);
            return
        }


        let address = await Models.Address.create({
            ...req.body.address
        });

        restaurant = await RestaurantModels.Restaurant.create({
            ...req.body,
            address: address._id
        });

        Helpers.responseHelper(res, 200, "Success Signup!", {
            restaurant
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

        let restaurant = await RestaurantModels.Restaurant.findOne({ email: req.body.email });

        if (!restaurant) {
            Helpers.responseHelper(res, 404, "User with email not found!", null);
            return
        }

        let isPasswordValid = await restaurant.comparePassword(req.body.password);

        if (!isPasswordValid) {
            Helpers.responseHelper(res, 401, "Invalid Password", null);
            return;
        }
        let token = await restaurantTokenHelper.generateAuthToken({
            _id: restaurant._id,
            name: restaurant.restaurantName
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