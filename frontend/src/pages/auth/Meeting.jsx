import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import socket from "../../socket/socket";
import { useAuth } from "../../context/AuthContext";

import MeetingHeader from "../../components/meeting/MeetingHeader";
import VideoGrid from "../../components/meeting/VideoGrid";
import MeetingControls from "../../components/meeting/MeetingControls";
import ParticipantsPanel from "../../components/meeting/ParticipantsPanel";
import ChatPanel from "../../components/meeting/ChatPanel";
import MeetingSidebar from "../../components/meeting/MeetingSidebar";
import useMediaStream from "../../hooks/useMediaStream";
import useWebRTC from "../../hooks/useWebRTC";

console.log("Meeting Component Rendered");
const Meeting = () => {

  const { roomId } = useParams();
  const { user } = useAuth();

  const localStream = useMediaStream();
  const {peersRef, remoteStreams,  remoteUsers, participantsState } = useWebRTC(roomId, localStream, user);

  const [participants, setParticipants] = useState([]);
  const [meeting, setMeeting] = useState([]);
  const [sidebar, setSidebar] = useState(null);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [messages, setMessages] = useState([]);

  const toggleCamera = () => {
    if (!localStream) return;

    const videoTrack = localStream.getVideoTracks()[0];

    if(!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;

    setCameraOn(videoTrack.enabled);

    console.log("Emitting camera-toggle...");

    socket.emit("camera-toggle", {
      roomId,
      cameraOn: videoTrack.enabled,
      user,
    });
  }

  const toggleMic = () => {
    if (!localStream) return;

    const audioTrack = localStream.getAudioTracks()[0];

    if(!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;

    setMicOn(audioTrack.enabled);

    console.log("Emitting mic-toggle...");

    socket.emit("mic-toggle", {
      roomId,
      micOn: audioTrack.enabled,
      user,
    })
  }

  const toggleScreenShare = async() => {
    try{

      if(!screenSharing) {

        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video:true });

        const screenTrack = screenStream.getVideoTracks()[0];

        Object.values(peersRef.current).forEach((peer) => {

              const sender = peer.getSenders().find((sender) => sender.track?.kind === "video");

              if(sender) { 
                sender.replaceTrack(screenTrack);
              }

        });

        setScreenSharing(true);

        console.log("Screen Sharing Started");

        // When users click stop sharing
        screenTrack.onended = () => {
          
          const cameraTrack = localStream.getVideoTracks()[0];

          Object.values(peersRef.current).forEach((peer) => {

            const sender = peer.getSenders().find((sender) => sender.track?.kind === "Video");

            if(sender && cameraTrack) {
              sender.replaceTrack(cameraTrack);
            }

          });

          setScreenSharing(false);

          console.log("Screen Sharing Stopped");
        };
      } 
    } catch(err){

      console.log(err);

    }
  }

  const sendMessage = (message) => {

    if(!message.trim()) return;

    socket.emit("send-message", {
      roomId,
      message,
      user,
    });
  };

  useEffect(() => {

    if (!user) return;

    // Join Socket Room
    console.log("Joining room:", roomId);
    console.log("JOIN ROOM EMITTED");
    // socket.emit("join-room", { roomId, user, });
    socket.onAny((event, ...args) => {
      console.log("Socket Event:", event, args);
    });
    console.log("Socket Connected:", socket.connected);
    console.log("Socket ID:", socket.id);

  }, [roomId, user]);

  useEffect(() => {

    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive-message", handleMessage);

    return () => {
      socket.off("reive-message", handleMessage);
    };
  }, []);

  useEffect(() => {

    const handleParticipants = (users) => {

      console.log("Participants", users);

      setParticipants(users);

    };

    socket.on("participants-update", handleParticipants);

    return () => {
      socket.off("participans-update", handleParticipants);
    };
  }, []);

  console.log("Camera State:", cameraOn);

  return (
    <div className="min-h-screen bg-slate-950 p-6">

      <MeetingHeader
        roomId={roomId}
        setSidebar={setSidebar}
      />

      <div className="mt-6 flex gap-6">

        {/* Video Area */}
        <div className="flex-1">
          <VideoGrid 
            localStream={localStream}
            remoteStreams={remoteStreams}
            remoteUsers={remoteUsers} 
            participantsState={participantsState}
            user={user} 
            cameraOn={cameraOn}/>
        </div>

        {/* Sidebar */}
        <MeetingSidebar
          sidebar={sidebar}
          participants={participants}
          messages={messages}
          sendMessage={sendMessage}
          user={user}
        />

      </div>

      <MeetingControls
        setSidebar={setSidebar}
        sidebar={sidebar}
        cameraOn={cameraOn}
        toggleCamera={toggleCamera}
        micOn={micOn}
        toggleMic={toggleMic}
        screenSharing={screenSharing}
        toggleScreenShare={toggleScreenShare}
        />

    </div>
  );
};

export default Meeting;