// CommentInputBox.tsx
import {useState} from "react";
import styles from "./CommentInputBox.module.css";
import {User} from "../../type/dataType";

type CommentInputBoxProps = {
    user: User;
    onSubmit: (text: string) => void;
    prefix?: string;          // For replies (like "@username, ")
    buttonLabel?: string;     // SEND or REPLY
    onClose?: () => void;     // Only for replies
};

const CommentInputBox = ({user, onSubmit, prefix = "", buttonLabel = "SEND", onClose}: CommentInputBoxProps) => {
    const [text, setText] = useState(prefix);

    function handleClick() {
        const trimmed = text.trim();

        // prevent sending only prefix
        if (prefix && trimmed === prefix.trim()) return;
        if (!trimmed) return;

        onSubmit(text);
        setText(prefix); // reset input

        if (onClose) onClose(); // close reply box
    }

    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img src={user.avatar} alt={user.username} className={styles.avatar_img}/>
            </div>
            <div className={styles.comment_text}>
        <textarea
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
        />
            </div>
            <div className={styles.reply_container}>
                <button className={styles.reply_btn} onClick={handleClick}>
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
};

export default CommentInputBox;
