import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

const PublicLayouts = () => {
    return (
        <div className='w-full min-h-screen'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default PublicLayouts