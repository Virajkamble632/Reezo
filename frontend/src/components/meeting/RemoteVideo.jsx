import { useEffect, useRef } from "react";

const RemoteVideo = ({ stream }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (!stream || !videoRef.current) return;

        console.log("Assigning Remote Stream:", stream);

        videoRef.current.srcObject = stream;

        videoRef.current
            .play()
            .then(() => {
                console.log("Remote Video Playing");
            })
            .catch((err) => {
                console.error("Remote Play Error:", err);
            });

    }, [stream]);

    return (
        <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
        />
    );
};

export default RemoteVideo;