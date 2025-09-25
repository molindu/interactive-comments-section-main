import {Comment} from "./type/dataType.ts";

export const comments: Comment[] = [
    {
        id: 1,
        content:
            "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: "2025-07-23T11:09:06.668Z",
        score: 12,
        replyingTo: "",
        user: {
            username: "amyrobson",
            avatar: "images/avatars/image-amyrobson.png",
            isCurrentUser: false
        },
        replies: [],
    },
    {
        id: 2,
        content:
            "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon...",
        createdAt: "2025-09-07T11:09:06.668Z",
        score: 5,
        replyingTo: "",
        user: {
            username: "maxblagun",
            avatar: "images/avatars/image-maxblagun.png",
            isCurrentUser: false
        },
        replies: [
            {
                id: 1.1,
                content:
                    "If you’re still new, I’d recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It’s very tempting to jump ahead but lay a solid foundation first.",
                createdAt: "2025-09-08T11:09:06.668Z",
                score: 4,
                replyingTo: "maxblagun",
                user: {
                    username: "ramsesmiron",
                    avatar: "images/avatars/image-ramsesmiron.png",
                    isCurrentUser: false
                },
                replies: []
            },
            {
                id: 2.1,
                content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                createdAt: "2025-09-21T11:09:06.668Z",
                score: 2,
                replyingTo: "ramsesmiron",
                user: {
                    username: "juliusomo",
                    avatar: "images/avatars/image-juliusomo.png",
                    isCurrentUser: true
                },
                replies: []
            },
        ],
    },
];
