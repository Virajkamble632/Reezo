import { useEffect, useRef } from "react";

const RemoteVideo = ({ track }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!track || !videoRef.current) return;

    track.attach(videoRef.current);

    return () => {
      track.detach(videoRef.current);
    };
  }, [track]);

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