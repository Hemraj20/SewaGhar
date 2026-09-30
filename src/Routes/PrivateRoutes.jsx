import Dashboard from '../Admin/Dashboard';
import ServiceDashboard from '../Admin/ServiceDashboard';
import ServicePostDashboard from '../Admin/servicePostDashboard';
import Userdashboard from '../Admin/Userdashboard';
import Vendordashboard from '../Admin/Vendordashboard';
import VendorServicesDashboard from '../Admin/VendorServicesDashboard';
import PrivateLayouts from '../Layouts/PrivateLayouts';
import Guard from './Guard';

const AuthRoutes = {
  element: <Guard />,
  children: [{
    element: <PrivateLayouts />,
    children: [
      { path: '/admin/dashboard', element: <Dashboard /> },
      { path: '/admin/users', element: <Userdashboard /> },
      { path: '/admin/vendors', element: <Vendordashboard /> },
      { path: '/admin/services', element: <ServiceDashboard /> },
      { path: '/admin/posts', element: <ServicePostDashboard /> },
      { path: '/admin/vendor/services', element: <VendorServicesDashboard /> }

    ]
  }]
}

export default AuthRoutes;