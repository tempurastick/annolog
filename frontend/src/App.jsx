import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Examples from "./pages/Examples";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Examples />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="" element={<PrivateRoute />}>
                    {/* private routes  */}
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default App;
