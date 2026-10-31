import { Routes, Route } from "react-router-dom";
import Home from "../features/home/pages/Home";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import EventDetails from "../features/events/pages/EventDetails";
import Reservation from "../features/client/pages/Reservations";
import TraiteurDashboard from "../features/traiteur/pages/Dashboard";
import CreateEvent from "../features/traiteur/pages/CreateEvent";
import TraiteurEvents from "../features/traiteur/pages/Events";
import EditEvent from "../features/traiteur/pages/EditEvent";
import TraiteurReservations from "../features/traiteur/pages/Reservations";
import ReservationCard from "../features/client/components/ReservationCard";
import Equipment from "../features/traiteur/pages/Equipment";

function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/reservation/:id" element={<Reservation />} />

            <Route path="/traiteur/dashboard" element={<TraiteurDashboard />} />
            <Route path="/traiteur/events/create" element={<CreateEvent />} />
            <Route path="/traiteur/events" element={<TraiteurEvents />} />
            <Route path="/traiteur/events/:id/edit" element={<EditEvent />} />
            <Route path="/traiteur/reservations" element={<TraiteurReservations />} />

            <Route path="/reservations" element={<ReservationCard />} />

            <Route path="/traiteur/equipment" element={<Equipment />} />

        </Routes>
    );
}

export default AppRoutes;