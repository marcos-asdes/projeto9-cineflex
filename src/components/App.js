import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectMovie from "./SelectMovie.js";
/* import SelectMovieSession from "./SelectMovieSession.js";
import SelectSeats from "./SelectSeats.js";
import RequestCompleted from ".RequestCompleted.js"; */


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SelectMovie />} />
{/*                 <Route path="/sessions" element={<SelectMovieSession />} />
 */}{/*                 <Route path="/seats" element={<SelectSeats />} /> */}
{/*                 <Route path="/sucess" element={<RequestCompleted />} /> */}
            </Routes>
        </BrowserRouter>
    )
}