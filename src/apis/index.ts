// @ts-expect-error remove error
const BACKEND = import.meta.env.VITE_BACKEND || "http://127.0.0.1:3000";

const getPosts = async (page: number, limit: number) => {
    const res = await fetch(`${BACKEND}/post?page=${page}&limit=${limit}`, {
        method: "GET",
    });
    const data = await res.json();

    return data;
};

const createPost = async (content: string) => {
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

// TO GET THE LOGGED IN USER DETAILS
const getUser = async () => {
    const res = await fetch(`${BACKEND}/user`, {
        method: "GET",
        credentials: "include",
    });
    const data = await res.json();

    return data;
};

// TO GET THE USER WITH A PARTICULAR ID
const getUserData = async (id: string) => {
    let res = await fetch(`${BACKEND}/user/${id}`, {
        method: "GET",
        credentials: "include",
    });

    const userData = await res.json();

    if (!userData.success) {
        return userData;
    }

    // get followers
    res = await fetch(`${BACKEND}/user/${id}/followers`, {
        method: "GET",
        credentials: "include",
    });

    const followersData = await res.json();

    res = await fetch(`${BACKEND}/post/${id}`, {
        method: "GET",
        credentials: "include",
    });

    const postsData = await res.json();

    const result = {
        user: {
            username: userData.user.username,
            _id: userData.user._id,
            followers: followersData.success ? followersData.followers : [],
            posts: postsData.success ? postsData.posts : [],
        },
        success: true,
    };

    return result;
};

const userLogin = async (username: string, password: string) => {
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
    const res = await fetch(`${BACKEND}/user/logout`, {
        method: "POST",
        credentials: "include",
    });
    const data = await res.json();

    return data;
};

const userUpdate = async (data: { username?: string; password?: string }) => {
    const res = await fetch(`${BACKEND}/user`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const userData = await res.json();

    return userData;
};

export {
    getPosts,
    createPost,
    getUser,
    userLogin,
    userSignup,
    userLogout,
    getUserData,
    userUpdate,
};
