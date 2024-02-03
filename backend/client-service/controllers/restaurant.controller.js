import { Helpers, RestaurantModels } from "common";
import { ClientModels } from "common";
import { Models } from "common";

const getAllRestaurants = async (req, res, next) => {
    try {
        let user = await ClientModels.User.findOne({ _id: req.authPayload._id });
        let userAddress = await Models.Address.findOne({ _id: user.address });

        let addresses = await Models.Address.find({ city: userAddress.city });

        let restaurants = [];
        for (let add of addresses) {
            let rest = await RestaurantModels.Restaurant.findOne({ address: add._id })
            if (rest)
                restaurants.push(rest);
        }

        Helpers.responseHelper(res, 200, "Restaurants fetched successfully !", restaurants);
        return;
    }
    catch (err) {
        Helpers.responseHelper(res, 500, "Server error", null);
        return;
    }
}


const getRestaurantItems = async (req, res, next) => {
    try {
        let items = await RestaurantModels.Item.find({ restaurantId: req.params.id });
        let itemsData = {}
        for (let item of items) {
            let cat = await RestaurantModels.Category.findOne({ _id: item.categoryId });

            if (!itemsData[cat.name]) {
                itemsData[cat.name] = [];

                itemsData[cat.name].push(item)
            }
        }
        Helpers.responseHelper(res, 200, "Restaurant Items fetch success", itemsData);
        return;
    }
    catch (err) {
        Helpers.responseHelper(res, 500, "Server error", null);
        return
    }
}

const getRestaurantCategories = async (req, res, next) => {
    try {
        let items = await RestaurantModels.Category.find({ restaurantId: req.params.id });

        Helpers.responseHelper(res, 200, "Restaurant Categories fetch success", items);
        return;
    }
    catch (err) {
        Helpers.responseHelper(res, 500, "Server error", null);
        return
    }
}

const getCategoryItems = async (req, res, next) => {
    try {
        let items = await RestaurantModels.Item.find({ restaurantId: req.params.restaurantId, categoryId: req.params.categoryId });

        Helpers.responseHelper(res, 200, "Restaurant Categories fetch success", items);
        return;
    }
    catch (err) {
        Helpers.responseHelper(res, 500, "Server error", null);
        return
    }
}

const getItemDetails = async (req, res, next) => {
    try {
        let items = await RestaurantModels.Item.find({ restaurantId: req.params.restaurantId, _id: req.params.itemId });

        Helpers.responseHelper(res, 200, "Restaurant Item fetch success", items);
        return;
    }
    catch (err) {
        Helpers.responseHelper(res, 500, "Server error", null);
        return
    }
}


export default {
    getAllRestaurants, getRestaurantItems, getRestaurantCategories, getCategoryItems, getItemDetails
}