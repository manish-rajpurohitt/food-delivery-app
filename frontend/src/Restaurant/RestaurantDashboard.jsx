import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import localStorageHelper from '../Helpers/localStorageHelper';

function RestaurantDashboard() {
    const navigate = useNavigate();
    const logout = () => {
        localStorageHelper.handleLogoutSession();
        navigate("/restaurant/");
    }

    useEffect(() => {
        let getAllFoodItems = async () => {

        }
    })
    return (
        <div>
            <div>RestaurantDashboard
                <button onClick={logout}>Logout</button>
            </div>


        </div>
    )
}

export default RestaurantDashboard