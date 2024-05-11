interface User {
    username: string;
    followers: User[];
    _id: string;
    posts: Post[] | [];
}

interface Post {
    content: string;
    author: User;
    createdAt: Date;
    _id: string;
}

export { type Post, type User };
