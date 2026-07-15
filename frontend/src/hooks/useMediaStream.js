// import { useState, useEffect } from "react";

// const useMediaStream = () => {
//   const [stream, setStream] = useState(null);

//   useEffect(() => {
//     const getMedia = async () => {
//       try {
//         const media = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });

//         console.log("Media Stream:", media);

//         setStream(media);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getMedia();

//     return () => {
//       stream?.getTracks().forEach(track => track.stop());
//     };
//   }, []);

//   return stream;
// };

// export default useMediaStream;


import { useState, useEffect } from "react";

const useMediaStream = () => {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const getMedia = async () => {

      console.log("Navigator:", navigator);
      console.log("MediaDevices:", navigator.mediaDevices);

      if (!navigator.mediaDevices) {
        console.error("mediaDevices is not available.");
        return;
      }

      try {
        const media = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        console.log("Media Stream:", media);

        setStream(media);

      } catch (err) {
        console.error("getUserMedia Error:", err);
      }
    };

    getMedia();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return stream;
};

export default useMediaStream;