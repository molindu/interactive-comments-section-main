import styles from './CommentReplyBox.module.css';
import {Comment, User} from '../../type/dataType.ts'
import VoteBox from "../VoteBox.tsx";
import {useTimeAgo} from "../../hooks/useTimeAgo.ts";
import ReplyIcon from "../icons/Reply.tsx";
import DeleteIcon from "../icons/Delete.tsx";
import EditIcon from "../icons/Edit.tsx";
import {useState} from "react";
import DeleteConfirm from "../deleteConfirm/DeleteConfirm.tsx";

type CommentBoxProps = {
    comment: Comment;
    user: User;
    commentId: number;
    onReplyClick: () => void;
    onDeleteClick: (comment: Comment, commentId: number, replyOrComment: boolean) => void;
    onEditClick: (comment: Comment, content: string, commentId: number, replyOrComment: boolean) => void;
    onVote: (comment: Comment, commentId: number, replyOrComment: boolean, delta: number) => void;
};


const CommentReplyBox = ({
                             comment,
                             user,
                             commentId,
                             onReplyClick,
                             onDeleteClick,
                             onEditClick,
                             onVote
                         }: CommentBoxProps) => {
    const timeAgo = useTimeAgo(comment.createdAt);
    const userActive = user.username === comment.user.username
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(comment.content);
    const replyingTo = comment.replyingTo === '' ? '' : `@${comment.replyingTo}`;
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);

    function handleDelete() {
        const isReply = commentId !== comment.id;
        onDeleteClick(comment, commentId, isReply);
        setDeleteConfirm(false);
    }

    function handleEdit() {
        const isReply = commentId !== comment.id;
        onEditClick(comment, text, commentId, isReply);
        setEdit(false);
    }

    function handleVote(delta: number) {
        const isReply = commentId !== comment.id;
        onVote(comment, commentId, isReply, delta);
    }

    return (
        <div className={'bg-White rounded-lg pb-4'}>
            <div className={`${styles.container}`}>
                <div className={`${styles.vote_container}`}>
                    <VoteBox
                        vote={comment.score}
                        onUpvote={() => handleVote(1)}
                        onDownvote={() => handleVote(-1)}
                        disabled={user.username === comment.user.username}
                    />

                </div>
                <div className={`${styles.avatar}`}>
                    <img src={comment.user.avatar} alt={comment.user.username}
                         className={`${styles.avatar_img}`}/>
                </div>
                <div className={`${styles.username_container}`}>
                    <p className={`${styles.username}`}>{comment.user.username}</p>
                    {userActive && <div className={`${styles.active}`}>
                        you
                    </div>}
                    <p className={`${styles.timeAgo}`}>{timeAgo}</p>
                </div>
                <div className={`${styles.reply_container}`}>
                    {!userActive ? (
                        <button className={`${styles.reply_btn}`} onClick={onReplyClick}>
                            <ReplyIcon/>
                            Reply
                        </button>
                    ) : (
                        <div className={`${styles.edit_delete}`}>
                            <button className={`${styles.delete_btn}`} onClick={() => setDeleteConfirm(true)}>
                                <DeleteIcon/>
                                Delete
                            </button>
                            <button className={`${styles.edit_btn}`} onClick={() => setEdit(!edit)}>
                                <EditIcon/>
                                Edit
                            </button>
                        </div>
                    )}

                </div>
                <div className={`${styles.comment_text}`}>
                    {edit ? (
                        <textarea
                            name="comment"
                            id="comment"
                            placeholder="Add a comment..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={3}
                        />
                    ) : (
                        <p><span
                            className={`${styles.mention}`}>{`${replyingTo}`}</span> {comment.content}
                        </p>
                    )}
                </div>
            </div>
            {edit && (
                <div className={'flex items-center justify-end px-4'}>
                    <button className={`${styles.update_btn}`} onClick={handleEdit}>
                        UPDATE
                    </button>
                </div>
            )}
            {deleteConfirm && (
                <DeleteConfirm cancel={() => setDeleteConfirm(false)} onDelete={() => handleDelete()}/>
            )}

        </div>
    );
};

export default CommentReplyBox;