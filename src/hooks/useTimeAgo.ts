import { useEffect, useState } from "react";

function formatTimeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
}

export function useTimeAgo(timestamp: string) {
    const [timeAgo, setTimeAgo] = useState(() =>
        formatTimeAgo(new Date(timestamp))
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeAgo(formatTimeAgo(new Date(timestamp)));
        }, 60 * 1000); // update every minute

        return () => clearInterval(interval);
    }, [timestamp]);

    return timeAgo;
}
