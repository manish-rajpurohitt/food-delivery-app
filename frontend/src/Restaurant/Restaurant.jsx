import React, { useEffect } from 'react'
import Login from '../AuthComponent/Login'
import Signup from '../AuthComponent/Signup'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import RestaurantDashboard from './RestaurantDashboard'
import localStorageHelper from '../Helpers/localStorageHelper';

function Restaurant() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorageHelper.checkAuth()) {
            navigate("/restaurant")
        }
    }, [])
    return (
        <div>
            <Routes>
                <Route path='/signup' element={<Signup formType="Restaurant" />} />
                <Route path='/' element={<Login formType="Restaurant" />} />
                <Route path='/dashboard' element={<RestaurantDashboard />} />
            </Routes>
        </div>
    )
}

export default Restaurant