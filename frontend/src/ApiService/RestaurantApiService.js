import toast from "react-hot-toast";
import ApiService, { setBaseUrl } from "./index.js";



const signup = async (payload) => {
    try {
        setBaseUrl("http://localhost:3000/v1/restaurant");

        const res = await ApiService.post("/signup", { ...payload });
        if (res.hasError) {
            toast.error(res.message);
        } else {
            console.log(res);
            toast.success(res.message);
            console.log(res.data);
        }
        return res.data;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const login = async (payload) => {
    try {
        setBaseUrl("http://localhost:3000/v1/restaurant");

        const res = await ApiService.post("/login", { ...payload });
        if (res.hasError) {
            toast.error(res.message);
        } else {
            console.log(res);
            toast.success(res.message);
            console.log(res.data);
        }
        return res;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}


export default {
    signup, login
}