// App.tsx
import CommentReplyBox from "./components/commentReplyBox/CommentReplyBox.tsx";
import {Comment, Reply} from './type/dataType.ts'
import {comments} from './data.ts'
import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import CommentInputBox from "./components/commentInputBox/CommentInputBox.tsx";

const App = () => {
    const [data, setData] = useState<Comment[]>(comments);
    const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
    const [activeId, setActiveId] = useState<number | null>(null);

    const user = {
        username: "juliusomo",
        avatar: "images/avatars/image-juliusomo.png",
        isCurrentUser: true
    };

    function send(commentText: string) {
        const newComment: Comment = {
            id: Date.now(),
            content: commentText,
            createdAt: new Date().toISOString(),
            score: 0,
            replyingTo: '',
            user: user,
            replies: [],
        };
        setData((prev) => [...prev, newComment]);
    }

    function reply(replyText: string, comment: Comment, commentId: number) {
        const prefix = `@${comment.user.username}, `;
        const cleanedText = replyText.startsWith(prefix)
            ? replyText.slice(prefix.length).trim()
            : replyText.trim();
        if (cleanedText === "") return;

        const newReply: Reply = {
            id: comment.id + 1,
            content: cleanedText,
            createdAt: new Date().toISOString(),
            score: 0,
            replyingTo: comment.user.username,
            user: user,
            replies: [],
        };

        setData((prev) =>
            prev.map((c) =>
                c.id === commentId ? {...c, replies: [...c.replies, newReply]} : c
            )
        );
    }

    function onDeleteClick(comment: Comment, commentId: number, replyOrComment: boolean) {
        if (replyOrComment) {
            // 🔹 Delete a reply
            setData((prev) =>
                prev.map((c) =>
                    c.id === commentId
                        ? {...c, replies: c.replies.filter((r) => r.id !== comment.id)}
                        : c
                )
            );
        } else {
            // 🔹 Delete a top-level comment
            setData((prev) => prev.filter((c) => c.id !== comment.id));
        }
    }

    function onEditClick(
        comment: Comment,
        content: string,
        commentId: number,
        replyOrComment: boolean
    ) {
        if (replyOrComment) {
            // 🔹 Editing a reply
            setData((prev) =>
                prev.map((c) =>
                    c.id === commentId
                        ? {
                            ...c,
                            replies: c.replies.map((r) =>
                                r.id === comment.id ? {...r, content} : r
                            ),
                        }
                        : c
                )
            );
        } else {
            // 🔹 Editing a top-level comment
            setData((prev) =>
                prev.map((c) =>
                    c.id === commentId ? {...c, content} : c
                )
            );
        }
    }

    function onVote(comment: Comment, commentId: number, replyOrComment: boolean, delta: number) {
        if (replyOrComment) {
            // reply vote
            setData(prev =>
                prev.map(c =>
                    c.id === commentId
                        ? {
                            ...c,
                            replies: c.replies.map(r =>
                                r.id === comment.id ? {...r, score: r.score + delta} : r
                            ),
                        }
                        : c
                )
            );
        } else {
            // top-level vote
            setData(prev =>
                prev.map(c =>
                    c.id === commentId ? {...c, score: c.score + delta} : c
                )
            );
        }
    }

    return (
        <div className="main">
            <div className="container">
                {data.map((comment: Comment) => (
                    <section aria-label="comment-section" key={comment.id} className="flex flex-col gap-4">
                        <CommentReplyBox
                            key={comment.id}
                            comment={comment}
                            user={user}
                            commentId={comment.id}
                            onReplyClick={() => setActiveReplyId(comment.id)}
                            onDeleteClick={onDeleteClick}
                            onEditClick={onEditClick}
                            onVote={onVote}
                        />


                        <AnimatePresence>
                            {activeReplyId === comment.id && (
                                <motion.div
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    // exit={{opacity: 0, y: -10}}
                                    transition={{duration: 0.3}}
                                    key={comment.id}
                                >
                                    <CommentInputBox
                                        user={user}
                                        prefix={`@${comment.user.username}, `}
                                        onSubmit={(text) => reply(text, comment, comment.id)}
                                        buttonLabel="REPLY"
                                        onClose={() => setActiveReplyId(null)}
                                    />

                                </motion.div>
                            )}
                        </AnimatePresence>

                        {comment.replies.length > 0 && (
                            <AnimatePresence>
                                <motion.div
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    // exit={{opacity: 0, y: -10}}
                                    transition={{duration: 0.3}}
                                >
                                    <div className="flex flex-row">
                                        <div className="basis-1/6 flex justify-center">
                                            <div className="w-[2px] h-full bg-Grey-100"/>
                                        </div>
                                        <div className="basis-full flex flex-col gap-2">
                                            {comment.replies.map((r) => (
                                                <>
                                                    <CommentReplyBox
                                                        key={r.id}
                                                        comment={r}
                                                        commentId={comment.id}
                                                        onReplyClick={() => setActiveId(r.id)}
                                                        onDeleteClick={onDeleteClick}
                                                        onEditClick={onEditClick}
                                                        onVote={onVote}
                                                        user={user}
                                                    />

                                                    {activeId === r.id && (
                                                        <motion.div key={r.id}>
                                                            <CommentInputBox
                                                                user={user}
                                                                prefix={`@${r.user.username}, `}
                                                                onSubmit={(text) => reply(text, r, comment.id)}
                                                                buttonLabel="REPLY"
                                                                onClose={() => setActiveId(null)}
                                                            />
                                                        </motion.div>
                                                    )
                                                    }
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </section>
                ))}

                <CommentInputBox
                    user={user}
                    onSubmit={(text) => send(text)}
                    buttonLabel="SEND"
                />

            </div>
        </div>
    );
};

export default App;
