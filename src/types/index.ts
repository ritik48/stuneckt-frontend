interface User {
    username: string;
    followers: string[];
}

interface Post {
    content: string;
    author: User;
    createdAt: Date;
}

export { type Post };
