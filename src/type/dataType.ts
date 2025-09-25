// User type
export type User = {
    username: string;
    avatar: string;   // image path
    isCurrentUser?: boolean; // true if it's "you"
};

// Single Comment type
export type Comment = {
    id: number;
    content: string;
    createdAt: string; // e.g. "1 month ago"
    score: number;
    replyingTo: string;
    user: User;
    replies: Reply[]; // nested replies
};

// Reply type (same as Comment but with parentId)
export type Reply = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replyingTo: string; // username being replied to
    user: User;
    replies: Reply[]; // nested replies
};
