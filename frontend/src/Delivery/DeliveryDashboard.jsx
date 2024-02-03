import React from 'react'
import localStorageHelper from '../Helpers/localStorageHelper';
import { useNavigate } from 'react-router-dom';

function DeliveryDashboard() {
    const navigate = useNavigate();
    const logout = () => {
        localStorageHelper.handleLogoutSession();
        navigate("/delivery/");
    }
    return (
        <div>DeliveryDashboard
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default DeliveryDashboard;