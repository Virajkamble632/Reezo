import { useEffect, useRef } from "react";

const LocalVideo = ({ localVideoTrack }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (!localVideoTrack || !videoRef.current) return;

        localVideoTrack.attach(videoRef.current);

        return () => {
            localVideoTrack.detach(videoRef.current);
        };
    }, [localVideoTrack]);

    return (
        <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover rounded-2xl"
        />
    );
};

export default LocalVideo;