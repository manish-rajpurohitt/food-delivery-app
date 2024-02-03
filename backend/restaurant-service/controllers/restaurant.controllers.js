import { RestaurantModels } from "common";
import { Helpers } from "common";

let getRestaurant = async (req, res, next) => {
    try {
        let restaurant = await RestaurantModels.Restaurant.findOne({ _id: req.authPayload._id });

        if (!restaurant)
            Helpers.responseHelper(res, 400, "Unable to get Restaurant Details", null);
        else
            Helpers.responseHelper(res, 200, "Fetched Successfully", restaurant);
        return;
    }
    catch (ex) {
        Helpers.responseHelper(res, 500, "Server error !", ex);
    }

}


let updateRestaurant = async (req, res, next) => {
    try {
        if (Helpers.IsStringNullOrEmptyOrUndefined(req.body.restaurantName) || Helpers.IsStringNullOrEmptyOrUndefined(req.body.liveCoordinates)) {
            Helpers.responseHelper(res, 400, "liveCoordinates or name cannot be empty");
        }

        let restaurant = await RestaurantModels.Restaurant.findOne({ _id: req.authPayload._id });

        if (!restaurant)
            Helpers.responseHelper(res, 400, "Unable to get Restaurant", null);
        else {
            let restaurant = await RestaurantModels.Restaurant.updateOne({ _id: req.authPayload._id }, { ...req.body });

            if (!restaurant)
                Helpers.responseHelper(res, 400, "Unable to update Restaurant", null);
            else
                Helpers.responseHelper(res, 200, "Updated Successfully", restaurant);
        }
        return;
    }
    catch (ex) {
        Helpers.responseHelper(res, 500, "Server error !", ex);
    }

}

let deleteRestaurant = async (req, res, next) => {
    try {
        let restaurant = await RestaurantModels.Restaurant.findOne({ _id: req.authPayload._id });

        if (!restaurant)
            Helpers.responseHelper(res, 400, "Unable to get Restaurant", null);
        else {

            let isDeleted = await RestaurantModels.Restaurant.delete({ _id: req.authPayload._id });

            if (!isDeleted)
                Helpers.responseHelper(res, 400, "Unable to delete Restaurant", null);
            else
                Helpers.responseHelper(res, 200, "Deleted Successfully", category);
        }
        return;
    }
    catch (ex) {
        Helpers.responseHelper(res, 500, "Server error !", ex);
    }

}



export default {
    updateRestaurant, deleteRestaurant, getRestaurant
}