import { RestaurantModels } from "common";
import { Helpers } from "common";

let addCategory = async (req, res, next) => {
    try {
        if (Helpers.IsStringNullOrEmptyOrUndefined(req.body.name)) {
            Helpers.responseHelper(res, 400, "Category Name cannot be empty");
        }

        let category = await RestaurantModels.Category.create({ ...req.body, restaurantId: req.authPayload._id });
        if (!category)
            Helpers.responseHelper(res, 400, "Unable to add Categgory", null);
        else
            Helpers.responseHelper(res, 200, "Added Successfully", category);
        return;
    }
    catch (ex) {
        Helpers.responseHelper(res, 500, "Server error !", ex);
    }

}

let getCategory = async (req, res, next) => {
    try {

        let category = await RestaurantModels.Category.findOne({ _id: req.params.id, restaurantId: req.authPayload._id });

        if (!category)
            Helpers.responseHelper(res, 400, "Unable to get Category", null);
        else
            Helpers.responseHelper(res, 200, "Fetched Successfully", category);
        return;
    }
    catch (ex) {
        Helpers.responseHelper(res, 500, "Server error !", ex);
    }

}
let getAllCategories = async (req, res, next) => {
    try {

        let category = await RestaurantModels.Category.find({ restaurantId: req.authPayload._id });

        if (!category)
            Helpers.responseHelper(res, 400, "Unable to get Category", null);
        else
            Helpers.responseHelper(res, 200, "Fetched Successfully", category);
        return;
    }
    catch (ex) {
        Helpers.responseHelper(res, 500, "Server error !", ex);
    }

}


let updateCategory = async (req, res, next) => {
    try {
        if (Helpers.IsStringNullOrEmptyOrUndefined(req.body.name)) {
            Helpers.responseHelper(res, 400, "Category Name cannot be empty");
        }

        let category = await RestaurantModels.Category.findOne({ _id: req.params.id, restaurantId: req.authPayload._id });

        if (!category)
            Helpers.responseHelper(res, 400, "Unable to get Categgory", null);
        else {
            let restaurant = await RestaurantModels.Category.updateOne({ _id: req.params.id, restaurantId: req.authPayload._id }, { ...req.body });

            if (!category)
                Helpers.responseHelper(res, 400, "Unable to update Category", null);
            else
                Helpers.responseHelper(res, 200, "Updated Successfully", category);
        }
        return;
    }
    catch (ex) {
        Helpers.responseHelper(res, 500, "Server error !", ex);
    }

}

let deleteCategory = async (req, res, next) => {
    try {
        let category = await RestaurantModels.Category.findOne({ _id: req.params.id, restaurantId: req.authPayload._id });

        if (!category)
            Helpers.responseHelper(res, 400, "Unable to get Categgory", null);
        else {

            let isDeleted = await RestaurantModels.Category.delete({ _id: req.params.id, restaurantId: req.authPayload._id });

            if (!isDeleted)
                Helpers.responseHelper(res, 400, "Unable to delete Category", null);
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
    addCategory, getCategory, deleteCategory, updateCategory, getAllCategories
}