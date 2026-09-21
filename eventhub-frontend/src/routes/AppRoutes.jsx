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
import Favorites from "../features/client/pages/Favorites";
import Profile from "../features/traiteur/pages/Profile";
import PrestataireProfile from "../features/events/pages/PrestataireProfile";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/reservation/:id" element={<Reservation />} />

            <Route path="/reservations" element={<ReservationCard />} />

            <Route path="/traiteur/equipment" element={
                <ProtectedRoute role="traiteur">
                    <Equipment />
                </ProtectedRoute>
            } />
            <Route path="/traiteur/profile" element={
                <ProtectedRoute role="traiteur">
                    <Profile />
                </ProtectedRoute>
            } />
            <Route path="/traiteur/reservations" element={
                <ProtectedRoute role="traiteur">
                    <TraiteurReservations />
                </ProtectedRoute>
            } />
            <Route path="/traiteur/events/:id/edit" element={
                <ProtectedRoute role="traiteur">
                    <EditEvent />
                </ProtectedRoute>
            } />
            <Route path="/traiteur/events" element={
                <ProtectedRoute role="traiteur">
                    <TraiteurEvents />
                </ProtectedRoute>
            } />
            <Route path="/traiteur/events/create" element={
                <ProtectedRoute role="traiteur">
                    <CreateEvent />
                </ProtectedRoute>
            } />
            <Route path="/traiteur/dashboard" element={
                <ProtectedRoute role="traiteur">
                    <TraiteurDashboard />
                </ProtectedRoute>
            } />

            <Route path="/prestataires/:id" element={<PrestataireProfile />} />
            <Route path="/favorites" element={
                <ProtectedRoute role="client">
                    <Favorites />
                </ProtectedRoute>
            } />

        </Routes>
    );
}

export default AppRoutes;