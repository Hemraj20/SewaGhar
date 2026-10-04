import React from 'react'
import Sidebar from '../Components/PrivateComponents/SideBar'
import { Outlet } from 'react-router-dom'

const AdminLayouts = () => {
    return (
        <div className="flex min-h-screen bg-slate-50">

            {/* Sidebar */}
            <Sidebar />

            {/* Page Content */}
            <main className="ml-64 flex-1">
                <Outlet />
            </main>

        </div>
    )
}

export default AdminLayouts