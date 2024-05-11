const BACKEND = "http://127.0.0.1:3000";

const getPosts = async (page: number, limit: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch(`${BACKEND}/post?page=${page}&limit=${limit}`, {
        method: "GET",
    });
    const data = await res.json();

    return data;
};

const createPost = async (content: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch(`${BACKEND}/post`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ content }),
    });

    const data = await res.json();

    return data;
};

const getUser = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch(`${BACKEND}/user`, {
        method: "GET",
        credentials: "include",
    });
    const data = await res.json();

    return data;
};

const userLogin = async (username: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch(`${BACKEND}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    return data;
};

const userSignup = async (username: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch(`${BACKEND}/user/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    return data;
};

const userLogout = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch(`${BACKEND}/user/logout`, {
        method: "POST",
        credentials: "include",
    });
    const data = await res.json();

    return data;
};

export { getPosts, createPost, getUser, userLogin, userSignup, userLogout };
