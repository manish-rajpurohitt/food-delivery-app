import React from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import clientApiService from "../ApiService/ClientApiService";
import deliveryApiService from "../ApiService/DeliveryAppiService";
import restaurantApiService from "../ApiService/RestaurantApiService";
import localStorageHelper from '../Helpers/localStorageHelper';
function Login(props) {
    const { formType } = props;
    const [data, updateData] = React.useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const submit = async () => {
        if (!data.email || data.email === "" || !data.password || data.password === "") {
            toast.error("Email or password cannot be empty");
            return;
        }

        let res = {};
        if (formType === "Delivery") {
            res = await deliveryApiService.login(data);
        }
        else if (formType === "Client") {
            res = await clientApiService.login(data);
        }
        else if (formType === "Restaurant") {
            res = await restaurantApiService.login(data);
        }
        console.log(res);
        if (!res.hasError)
            handleLoginSuccess(res.data.token);
        return;
    }

    const handleLoginSuccess = (token) => {
        localStorageHelper.handleLoginSession({
            type: formType,
            token: token
        });
        navigate("/" + formType.toLowerCase() + "/dashboard");
    }
    return (
        <div>
            <Link to={"/"}>Redirector ?</Link>
            <h1>Login</h1>
            <div>
                <label>Email</label>
                <input type="email" value={data.email} onChange={(e) => updateData({ ...data, email: e.target.value })} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={data.password} onChange={(e) => updateData({ ...data, password: e.target.value })} />
            </div>
            <button onClick={submit}>Submit</button>
            <div>
                New User ?
                <Link to={"/" + formType.toLowerCase() + "/signup"}>Sign up</Link>
            </div>
        </div>
    )
}

export default Login