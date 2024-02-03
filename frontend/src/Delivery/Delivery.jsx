import React, { useEffect } from 'react'
import Login from '../AuthComponent/Login'
import Signup from '../AuthComponent/Signup'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import DeliveryDashboard from './DeliveryDashboard'
import localStorageHelper from '../Helpers/localStorageHelper';

function Delivery() {

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorageHelper.checkAuth()) {
            navigate("/delivery")
        }
    }, [])

    return (
        <div>
            <Routes>
                <Route path='/signup' element={<Signup formType="Delivery" />} />
                <Route path='/' element={<Login formType="Delivery" />} />
                <Route path='/dashboard' element={<DeliveryDashboard />} />
            </Routes>
        </div>
    )
}

export default Delivery