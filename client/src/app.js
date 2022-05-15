import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Page404 } from './pages/page404';

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Register />} />
                <Route path='*' element={<Page404 />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}