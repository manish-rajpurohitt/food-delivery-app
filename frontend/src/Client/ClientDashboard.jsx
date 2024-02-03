import React, { useEffect } from 'react'
import localStorageHelper from '../Helpers/localStorageHelper'
import { useNavigate } from 'react-router-dom';
import ClientApiService from '../ApiService/ClientApiService';
import toast from 'react-hot-toast';
import RestaurantItem from './RestaurantItem';


function ClientDashboard() {
    const navigate = useNavigate();

    const [restaurants, updateRestaurants] = React.useState([]);
    const logout = () => {
        localStorageHelper.handleLogoutSession();
        navigate("/client/");
    }

    useEffect(() => {
        let fetchRes = async () => {
            let res = await ClientApiService.fetchAllRestaurants();
            if (res.hasError)
                toast.error("Error fetching restaurants");
            else {
                console.log(res.data)
                updateRestaurants(res.data);
            }
        }
        fetchRes();
    }, [])

    return (
        <div>
            <div>ClientDashboard
                <button onClick={logout}>Logout</button>
            </div>
            <div>
                <label>All Restaurants</label>
                {restaurants.map((res, idx) => {
                    return <RestaurantItem key={idx} restaurant={res} />
                })}

            </div>
        </div>
    )
}

export default ClientDashboard