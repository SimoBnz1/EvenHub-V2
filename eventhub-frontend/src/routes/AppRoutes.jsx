import { Routes, Route } from "react-router-dom";
import Home from "../features/home/pages/Home";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import EventDetails from "../features/events/pages/EventDetails";
import Reservation from "../features/client/pages/Reservations";

function AppRoutes() {
    return (
        
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/reservation/:id" element={<Reservation />} />
        </Routes>
    );
}

export default AppRoutes;