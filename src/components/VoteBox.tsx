import Plus from "./icons/Plus.tsx";
import Minus from "./icons/Minus.tsx";
import {useState} from "react";

type VoteBoxType = {
    vote: number;
    onUpvote: () => void;
    onDownvote: () => void;
    disabled?: boolean;
};

const VoteBox = ({vote, onUpvote, onDownvote, disabled}: VoteBoxType) => {
    const vote_box = 'flex mobile:flex-col p-2 items-center justify-center w-24 rounded-lg font-semibold text-Purple-600 bg-Grey-100 mobile:w-8 gap-4 mobile:gap-3 mobile:text-xxs tablet:text-base';
    const [userVote, setUserVote] = useState<0 | 1 | -1>(0);

    function handleUpvote() {
        if (userVote === 1) return;
        setUserVote(1);
        onUpvote();
    }

    function handleDownvote() {
        if (userVote === -1) return;
        setUserVote(-1);
        onDownvote();
    }

    return (
        <div className={vote_box}>
            <button onClick={handleUpvote} disabled={disabled}>
                <Plus/>
            </button>
            {vote}
            <button onClick={handleDownvote} disabled={disabled}>
                <Minus/>
            </button>
        </div>
    );
};

export default VoteBox;
