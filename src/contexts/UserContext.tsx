import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types";
import {
    getUser,
    userLogin,
    userLogout,
    userSignup,
    userUpdate,
} from "../apis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ValueProp {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    signup: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    update: ({
        username,
        password,
    }: {
        username?: string;
        password?: string;
    }) => Promise<void>;
}

const UserContext = createContext<ValueProp>({
    user: null,
    loading: false,
    login: async () => {},
    signup: async () => {},
    logout: async () => {},
    update: async () => {},
});

interface PropType {
    children: React.ReactNode;
}

const UserProvider = ({ children }: PropType) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const data = await getUser();

            if (data.success) {
                setUser(data.user);
            }

            setLoading(false);
        };

        fetchUser();
    }, [setLoading]);

    const login = async (username: string, password: string) => {
        const data = await userLogin(username, password);
        console.log(data);
        if (!data.success) {
            toast.error(data.message);
            return;
        }

        setUser(data.user);
        toast.success(data.message);
        navigate("/");
    };

    const signup = async (username: string, password: string) => {
        const data = await userSignup(username, password);
        console.log(data);
        if (!data.success) {
            toast.error(data.message);
            return;
        }

        setUser(data.user);
        toast.success(data.message);
        navigate("/");
    };

    const update = async (updatedData: {
        username?: string;
        password?: string;
    }) => {
        const data = await userUpdate(updatedData);
        if (!data.success) {
            toast.error(data.message);
            return;
        }

        setUser(data.user);
        toast.success(data.message);
        navigate(`/user?id=${data.user._id}`);
    };

    const logout = async () => {
        const data = await userLogout();

        if (!data.success) {
            toast.error(data.message);
            return;
        }

        toast.success(data.message);
        setUser(null);
        navigate("/");
    };

    return (
        <UserContext.Provider
            value={{ signup, update, user, loading, login, logout }}
        >
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    const userContext = useContext(UserContext);

    return userContext;
};

export { useUser, UserProvider };
