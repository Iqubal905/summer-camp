
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/navbar';
import Footer from '../pages/shared/Footer';

const Main = () => {
    return (
        <div >
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;