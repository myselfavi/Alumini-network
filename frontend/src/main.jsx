import {createRoot} from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, Route, Navigate, RouterProvider} from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import AlumniSignup from './pages/AlumniSignup.jsx';
import StudentSignup from './pages/StudentSignup.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Home from './pages/dashboard/Home.jsx';
import Network from './pages/dashboard/Network.jsx';
import {AuthProvider, useAuthContext} from './contexts/useAuthContext.jsx';

const ProtectedRoute = ({children}) => {
    const {user, loading} = useAuthContext();
    if (loading) {
        return <div>Loading...</div>;
    }
    return user ? children : <Navigate to="/login"/>;
};

const CheckAuthRoute = ({children}) => {
    const {user, loading} = useAuthContext();
    if (loading) {
        return <div>Loading...</div>;
    }
    return user ? <Navigate to="/dashboard"/> : children;
};

const router = createBrowserRouter(
    createRoutesFromElements(   
        <Route path="/" element={<App/>}>
            <Route index element={<LandingPage/>}/>
            <Route
                path="/login"
                element={
                    <CheckAuthRoute>
                        <LoginPage/>
                    </CheckAuthRoute>
                }
            />
            <Route
                path="/signup"
                element={
                    <CheckAuthRoute>
                        <SignupPage/>
                    </CheckAuthRoute>
                }
            />
            <Route
                path="/signup/student"
                element={
                    <CheckAuthRoute>
                        <StudentSignup/>
                    </CheckAuthRoute>
                }
            />
            <Route
                path="/signup/alumni"
                element={
                    <CheckAuthRoute>
                        <AlumniSignup/>
                    </CheckAuthRoute>
                }
            />
            <Route
                path="/dashboard/"
                element={
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                }
            >
                <Route
                    path="network"
                    element={<Network/>}
                />
                <Route index element={<Home/>} />
            </Route>
        </Route>
    )
);

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={router}/>
    </AuthProvider>
);