import seedData from "../helpers/dummydata.js";
import axios from "axios";

let baseUrl = "http://localhost:{PORT}";
let signup = async (payload, type) => {
    let path = getport(type);

    let url = baseUrl.replace("{PORT}", 3000) + path + "/signup";

    let res = await axios.post(url, payload);
    if (res.hasError) return false;
    return true;
}

let signin = async (payload, type) => {
    let path = getport(type);

    let url = baseUrl.replace("{PORT}", 3000) + path + "/login";

    let res = await axios.post(url, payload);
    if (res.hasError) return false;
    return res;
}

let getport = (type) => {
    if (type === "Restaurant") {
        return "/v1/restaurant";
    } else if (type === "Delivery") {
        return "/v1/delivery";
    } else {
        return "/v1/client";
    }
}

let addCategoryAndFoodItems = async (payload) => {
    let catUrl = baseUrl.replace("{PORT}", 3001) + "/v1/restaurant/category";
    let foodUrl = baseUrl.replace("{PORT}", 3001) + "/v1/restaurant/item";
    let cat = await axios.post(catUrl, {
        "name": payload.name,
        "description": payload.description,
        "imageUrl": payload.imageUrl,
        restaurantId: payload.restaurantId
    });

    if (cat.hasError) return false;

    for (let item of payload.foodItems) {
        let res = await axios.post(foodUrl, { ...item, categoryId: cat.data._id });
        if (res.hasError) return false;
    }
    return true;
}

let getRestaurantDetails = async (email, token) => {
    let url = baseUrl.replace("{PORT}", 3001) + "/v1/restaurant/";

    let res = await axios.get(url, {
        headers: {
            authorization: "Bearer " + token
        }
    });
    if (res.hasError) return false;
    return res.data;

}


for (let data of seedData.restaurants) {
    let res = await signup(data, "Restaurant");
    if (!res) break;
}

for (let data of seedData.riders) {
    let res = await signup(data, "Delivery");
    if (!res) break;
}

for (let data of seedData.users) {
    let res = await signup(data, "Client");
    if (!res) break;
}

for (let data of Object.keys(seedData.categories)) {
    let tokenData = await signin({
        email: data,
        password: data.split('@')[0]
    }, "Restaurant");
    console.log(tokenData)

    // let res = await getRestaurantDetails(data, tokenData.data.token);
    // let restaurantId = res._id;
    // for (let cat of seedData.categories[data]) {
    //     res = await addCategoryAndFoodItems({ ...cat, restaurantId: restaurantId });
    // }

}