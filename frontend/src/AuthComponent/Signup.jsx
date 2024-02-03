import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import clientApiService from "../ApiService/ClientApiService";
import deliveryApiService from "../ApiService/DeliveryAppiService";
import restaurantApiService from "../ApiService/RestaurantApiService";

function Signup(props) {
    const navigate = useNavigate();

    const { formType } = props;
    const [data, updateData] = React.useState({
        restaurantName: "",
        username: "",
        liveCoordinates: [],
        address: {
            city: "",
            country: "",
            pincode: "",
            addressLine1: "",
            addressLine2: "",
            state: "",
            type: formType
        },
        email: "",
        password: "",
        description: "",
        logoUrl: "",
        confirmPassword: ""
    });
    const [geo, updateGeo] = React.useState({
        latitude: 0,
        longitude: 0
    });


    let getGeo = async () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                updateGeo({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                return
            }
        );
    }

    useEffect(() => {

        getGeo();

    }, [geo])

    const submit = async () => {
        console.log(data.email, data.password)
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords should match!");
            return;
        }
        else if (data.email === "" || !data.email || !data.password || data.password === "") {
            toast.error("Email and password cannot be empty!")
            return;
        }
        else {
            if (formType === "Restaurant") data.restaurantName = data.username;
            let res = null;
            if (formType === "Delivery") {
                res = await deliveryApiService.signup(data);
            }
            else if (formType === "Client") {
                res = await clientApiService.signup(data);
            }
            else if (formType === "Restaurant") {
                res = await restaurantApiService.signup(data);
            }
            if (res.hasError) {
                window.location.reload(false);
            } else {
                handleSignupResponse();
            }
            return;
        }
    }

    const handleSignupResponse = () => {
        navigate("/" + formType.toLowerCase() + "/");
    }

    return (
        <div>
            <h1>Signup</h1>
            <div>
                <label>Email</label>
                <input type="email" value={data.email} onChange={(e) => updateData({ ...data, email: e.target.value })} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={data.password} onChange={(e) => updateData({ ...data, password: e.target.value })} />
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" value={data.confirmPassword} onChange={(e) => updateData({ ...data, confirmPassword: e.target.value })} />
            </div>
            <div>
                <label>Name</label>
                <input type="text" value={data.username} onChange={(e) => updateData({ ...data, username: e.target.value })} />
            </div>

            {
                formType === "Delivery" ? <></> : <div>
                    <label>Logo URL</label>
                    <input type="text" value={data.logoUrl} onChange={(e) => updateData({ ...data, logoUrl: e.target.value })} />
                </div>
            }


            <div>
                <h1>Address</h1>
                <div>
                    <label>Address Line 1</label>
                    <input type="text" value={data.address.addressLine1} onChange={(e) => updateData({ ...data, address: { ...data.address, addressLine1: e.target.value } })} />
                </div>
                <div>
                    <label>Address Line 2</label>
                    <input type="text" value={data.address.addressLine2} onChange={(e) => updateData({ ...data, address: { ...data.address, addressLine2: e.target.value } })} />
                </div>
                <div>
                    <label>City/District/Village</label>
                    <input type="text" value={data.address.city} onChange={(e) => updateData({ ...data, address: { ...data.address, city: e.target.value } })} />
                </div>
                <div>
                    <label>State</label>
                    <input type="text" value={data.address.state} onChange={(e) => updateData({ ...data, address: { ...data.address, state: e.target.value } })} />
                </div>
                <div>
                    <label>Country</label>
                    <input type="text" value={data.address.country} onChange={(e) => updateData({ ...data, address: { ...data.address, country: e.target.value } })} />
                </div>
                <div>
                    <label>Pincode</label>
                    <input type="text" value={data.address.pincode} onChange={(e) => updateData({ ...data, address: { ...data.address, pincode: e.target.value } })} />
                </div>
                <button onClick={getGeo} disabled={geo.latitude !== 0 && geo.longitude !== 0}>Get Geo</button>

            </div>
            <button onClick={submit}>Submit</button>
            <div>
                Already User?
                <Link to={"/" + formType.toLowerCase() + "/"}>Login</Link>
            </div>
        </div>
    )
}

export default Signup