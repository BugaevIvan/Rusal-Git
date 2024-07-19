import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Pass from "./pages/Pass";
import Main from "./pages/Main";
import Auth from "./pages/Auth";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/pass" element={<Pass />} />
                <Route path="/pass/:passId" element={<Pass />} />
                <Route path="/main" element={<Main />} />
                <Route path="*" element={<Navigate to="/auth" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
