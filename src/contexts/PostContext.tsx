import React, { createContext, useContext, useEffect, useState } from "react";
import { Post } from "../types";
import { getPosts } from "../apis";

interface ValueProp {
    posts: Post[] | [];
    loading: boolean;
    error: string;
    page: number;
    changePage: (page: number) => void;
    total: number;
    limit: number;
    fetchPosts: (page: number) => Promise<void>;
}

const PostContext = createContext<ValueProp>({
    posts: [],
    loading: false,
    error: "",
    page: 1,
    total: 0,
    limit: 5,
    changePage: () => {},
    fetchPosts: async () => {},
});

interface PropType {
    children: React.ReactNode;
}

const PostProvider = ({ children }: PropType) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const [page, setPage] = useState<number>(1);

    const [total, setTotal] = useState<number>(0);

    const limit = 5;

    const fetchPosts = async (page: number) => {
        try {
            setLoading(true);
            const data = await getPosts(page, limit);

            if (!data.success) {
                setError(data.message);
                return;
            }

            setPosts(data.posts);
            setTotal(data.total);
            setLoading(false);
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const changePage = (p: number) => {
        setPage(p);
    };

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    return (
        <PostContext.Provider
            value={{
                posts,
                loading,
                error,
                fetchPosts,
                page,
                changePage,
                total,
                limit,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

const usePost = () => {
    const userContext = useContext(PostContext);

    return userContext;
};

export { usePost, PostProvider };
