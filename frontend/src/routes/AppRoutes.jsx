import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Home from "../pages/auth/Home";
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register";
import Dashboard from "../pages/auth/Dashboard";
import Profile from "../pages/auth/Profile";
import Meeting from "../pages/auth/Meeting";
import NotFound from "../pages/auth/NotFound";
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/dashboard' element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>} />
                <Route path='/profile' element={<ProtectedRoute> <Profile/> </ProtectedRoute>} />
                <Route path='/meeting/:roomId' element={<ProtectedRoute> <Meeting/> </ProtectedRoute>} />
                <Route path='/forgot-password' element={<ForgotPassword/>} />
                <Route path='/reset-password/:token' element={<ResetPassword/>} />
                

                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;