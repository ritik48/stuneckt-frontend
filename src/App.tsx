import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Create from "./pages/Create";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { UserProvider, useUser } from "./contexts/UserContext";
import { PostProvider } from "./contexts/PostContext";
import { UserProfile } from "./pages/User";

function App() {
    useUser();

    return (
        <BrowserRouter>
            <UserProvider>
                <PostProvider>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="/create" element={<Create />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/user" element={<UserProfile />} />
                        </Route>
                    </Routes>
                </PostProvider>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
