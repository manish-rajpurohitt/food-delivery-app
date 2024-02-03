import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'

import './App.css'
import Delivery from './Delivery/Delivery';
import Client from './Client/Client';
import Restaurant from './Restaurant/Restaurant';
import Redirector from './Shared/Redirector';
import localStorageHelper from './Helpers/localStorageHelper';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Redirector />} />
          <Route path='/client/*' element={<Client formType={"Client"} />} />
          <Route path='/restaurant/*' element={<Restaurant formType={"Restaurant"} />} />
          <Route path='/delivery/*' element={<Delivery formType={"Delivery"} />} />
        </Routes>
        <Toaster position='bottom-right' toastOptions={{
          duration: 1500, style: { background: '#363636', color: '#fff' },
        }} />
      </BrowserRouter>
    </>
  )
}

export default App
