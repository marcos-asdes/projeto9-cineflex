import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SelectMovie from "./SelectMovie.js";
import SelectMovieSession from "./SelectMovieSession.js";
import SelectSeats from "./SelectSeats.js";
import RequestCompleted from "./RequestCompleted.js";


export default function App() {
    const [reservationMade, setReservationMade] = useState(null);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SelectMovie />} />
                <Route path="/movie/:movieId" element={<SelectMovieSession />} />
                <Route path="/session/:sessionId" element={<SelectSeats 
                completePurchase={(reservationMade) => setReservationMade(reservationMade)} />} />
                <Route path="/sucess" element={<RequestCompleted reservationMade={reservationMade} />} />
            </Routes>
        </BrowserRouter>
    )
}