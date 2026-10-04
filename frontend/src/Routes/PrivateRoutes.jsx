
import PrivateLayouts from '../Layouts/PrivateLayouts';
import ProfilePage from '../Pages/ProfilePage';
import Guard from './Guard';
const AuthRoutes = {
  element: <Guard />,
  children: [{
    element: <PrivateLayouts />,
    children: [
      { path: '/profile', element: <ProfilePage /> }
    ]

  }]

}

export default AuthRoutes;