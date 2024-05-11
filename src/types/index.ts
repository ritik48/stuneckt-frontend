interface User {
    username: string;
    followers: string[];
}

interface Post {
    content: string;
    author: User;
    createdAt: Date;
    _id: string;
}

export { type Post, type User };
