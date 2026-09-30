import LoginPage from '../Components/AuthCompoents/Login';
import Register from '../Components/AuthCompoents/Register';
import AuthLayouts from '../Layouts/AuthLayouts'

const AuthRoutes = {
    element: <AuthLayouts />,
    children: [
        { path: '/login', element: <LoginPage /> },
        { path: '/register', element: <Register /> }
    ]
}

export default AuthRoutes;