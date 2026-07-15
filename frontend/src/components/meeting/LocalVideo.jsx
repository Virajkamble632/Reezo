import { useEffect, useRef } from "react";

const LocalVideo = ({ localStream }) => {

    const videoRef = useRef(null);

    useEffect(() => {
        if (localStream && videoRef.current) {
            videoRef.current.srcObject = localStream;
        }
    }, [localStream]);

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