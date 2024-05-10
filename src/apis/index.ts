const BACKEND = "http://localhost:3000";

const getPosts = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch(`${BACKEND}/post`, {
        method: "GET",
    });
    const data = await res.json();

    return data;
};

export { getPosts };
