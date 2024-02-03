import React, { useEffect } from 'react'
import Login from '../AuthComponent/Login'
import Signup from '../AuthComponent/Signup'
import ClientDashboard from './ClientDashboard'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import localStorageHelper from '../Helpers/localStorageHelper';

function Client() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorageHelper.checkAuth()) {
            navigate("/client")
        }
    }, [])
    return (
        <div>
            <Routes>
                <Route path='/signup' element={<Signup formType="Client" />} />
                <Route path='/' element={<Login formType="Client" />} />
                <Route path='/dashboard' element={<ClientDashboard />} />
            </Routes>
        </div>
    )
}

export default Client