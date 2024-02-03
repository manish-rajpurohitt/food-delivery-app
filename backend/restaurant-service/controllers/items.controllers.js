import { RestaurantModels } from "common";
import { Helpers } from "common";

let addItem = async (req, res, next) => {
    try {
        if (Helpers.IsStringNullOrEmptyOrUndefined(req.body.name) || Helpers.IsStringNullOrEmptyOrUndefined(req.body.price)) {
            Helpers.responseHelper(res, 400, "Item Name and price cannot be empty");
        }

        let item = await RestaurantModels.Item.create({ ...req.body, restaurantId: req.authPayload._id });
        if (!item)
            Helpers.responseHelper(res, 400, "Unable to add item", null);
        else
            Helpers.responseHelper(res, 200, "Added Successfully", item);
        return;
    }
    catch (ex) {
        Helpers.responseHelper(res, 500, "Server error !", ex);
    }

}

let getItems = async (req, res, next) => {
    try {

        let items = await RestaurantModels.Item.find({ restaurantId: req.authPayload._id });

        if (!items)
            Helpers.responseHelper(res, 400, "Unable to get items", null);
        else
            Helpers.responseHelper(res, 200, "Fetched Successfully", items);
        return;
    }
    catch (ex) {
        Helpers.responseHelper(res, 500, "Server error !", ex);
    }

}

let getItemsByCategoryId = async (req, res, next) => {
    try {

        let items = await RestaurantModels.Item.find({ categoryId: req.params.categoryId, restaurantId: req.authPayload._id });

        if (!items)
            Helpers.responseHelper(res, 400, "Unable to get items", null);
        else
            Helpers.responseHelper(res, 200, "Fetched Successfully", items);
        return;
    }
    catch (ex) {
        Helpers.responseHelper(res, 500, "Server error !", ex);
    }

}

let getItem = async (req, res, next) => {
    try {

        let item = await RestaurantModels.Item.findOne({ _id: req.params.id, restaurantId: req.authPayload._id });

        if (!item)
            Helpers.responseHelper(res, 400, "Unable to get item", null);
        else
            Helpers.responseHelper(res, 200, "Fetched Successfully", item);
        return;
    }
    catch (ex) {
        Helpers.responseHelper(res, 500, "Server error !", ex);
    }

}


let updateItem = async (req, res, next) => {
    try {
        if (Helpers.IsStringNullOrEmptyOrUndefined(req.body.name) || Helpers.IsStringNullOrEmptyOrUndefined(req.body.price)) {
            Helpers.responseHelper(res, 400, "Item Name or price cannot be empty");
        }

        let item = await RestaurantModels.Item.findOne({ _id: req.params.id, restaurantId: req.authPayload._id });

        if (!item)
            Helpers.responseHelper(res, 400, "Unable to get item", null);
        else {
            let item = await RestaurantModels.Item.updateOne({ _id: req.params.id, restaurantId: req.authPayload._id }, { ...req.body });

            if (!item)
                Helpers.responseHelper(res, 400, "Unable to update item", null);
            else
                Helpers.responseHelper(res, 200, "Updated Successfully", category);
        }
        return;
    }
    catch (ex) {
        Helpers.responseHelper(res, 500, "Server error !", ex);
    }

}

let deleteItem = async (req, res, next) => {
    try {
        let item = await RestaurantModels.Item.findOne({ _id: req.params.id, restaurantId: req.authPayload._id });

        if (!item)
            Helpers.responseHelper(res, 400, "Unable to get item", null);
        else {

            let isDeleted = await RestaurantModels.Item.delete({ _id: req.params.id, restaurantId: req.authPayload._id });

            if (!isDeleted)
                Helpers.responseHelper(res, 400, "Unable to delete item", null);
            else
                Helpers.responseHelper(res, 200, "Deleted Successfully", item);
        }
        return;
    }
    catch (ex) {
        Helpers.responseHelper(res, 500, "Server error !", ex);
    }

}



export default {
    addItem, getItem, deleteItem, updateItem, getItems, getItemsByCategoryId
}