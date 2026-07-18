import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import socket from "../../socket/socket";
import { useAuth } from "../../context/AuthContext";

import MeetingHeader from "../../components/meeting/meetingHeader";
import VideoGrid from "../../components/meeting/VideoGrid";
import MeetingControls from "../../components/meeting/MeetingControls";
import MeetingSidebar from "../../components/meeting/MeetingSidebar";

import useLivekit from "../../hooks/useLiveKit";

const Meeting = () => {
  const { user } = useAuth();
  const { roomId } = useParams();
  const navigate = useNavigate();

  const {
    room: livekitRoom,
    localParticipant,
    localVideoTrack,
    participants: livekitParticipants,
    toggleScreenShare,
  } = useLivekit(roomId, user);

  const [sidebar, setSidebar] = useState(null);
  const [messages, setMessages] = useState([]);

  // ================= LOCAL STATES =================

  const cameraOn =
    livekitRoom?.localParticipant?.isCameraEnabled ?? false;

  const micOn =
    livekitRoom?.localParticipant?.isMicrophoneEnabled ?? false;

  const screenSharing =
    livekitRoom?.localParticipant?.isScreenShareEnabled ?? false;

  // ================= LEAVE MEETING =================

  const leaveMeeting = () => {
    try {
      // Tell Socket.IO server that you're leaving
      socket.emit("leave-room", { roomId });

      // Disconnect from LiveKit
      if (livekitRoom) {
        livekitRoom.disconnect();
      }

      // Navigate back
      navigate("/dashboard");
    } catch (error) {
      console.error("Leave Meeting Error:", error);
    }
  };

  // ================= CAMERA =================

  const toggleCamera = async () => {
    if (!livekitRoom) return;

    await livekitRoom.localParticipant.setCameraEnabled(
      !livekitRoom.localParticipant.isCameraEnabled
    );
  };

  // ================= MIC =================

  const toggleMic = async () => {
    if (!livekitRoom) return;

    await livekitRoom.localParticipant.setMicrophoneEnabled(
      !livekitRoom.localParticipant.isMicrophoneEnabled
    );
  };

  // ================= CHAT =================

  const sendMessage = (message) => {
    if (!message.trim()) return;

    socket.emit("send-message", {
      roomId,
      message,
      user,
    });
  };

  // ================= JOIN SOCKET ROOM =================

  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-room", {
      roomId,
    });
  }, [roomId]);

  // ================= RECEIVE CHAT =================

  useEffect(() => {
    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive-message", handleMessage);

    return () => {
      socket.off("receive-message", handleMessage);
    };
  }, []);

  // ================= DEBUG =================

  useEffect(() => {
    if (livekitRoom) {
      console.log("Connected to LiveKit Room");
    }
  }, [livekitRoom]);

  useEffect(() => {
    if (localVideoTrack) {
      console.log("Local Video Track:", localVideoTrack);
    }
  }, [localVideoTrack]);

  useEffect(() => {
    if (localParticipant) {
      console.log("Local Participant:", localParticipant);
    }
  }, [localParticipant]);

  useEffect(() => {
    console.log("Remote Participants:", livekitParticipants);
  }, [livekitParticipants]);

  // ================= PARTICIPANTS =================

  const remoteParticipants = livekitParticipants;

  const allParticipants = [
    ...(localParticipant ? [localParticipant] : []),
    ...livekitParticipants,
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-3 sm:p-4 md:p-6">
      <MeetingHeader
        roomId={roomId}
        setSidebar={setSidebar}
      />

      <div className="mt-6 flex flex-col gap-6">
        {/* VIDEO GRID */}

        <div className="flex-1 min-w-0">
          <VideoGrid
            localVideoTrack={localVideoTrack}
            participants={remoteParticipants}
            user={user}
            cameraOn={cameraOn}
            screenSharing={screenSharing}
          />
        </div>

        {/* SIDEBAR */}

        <MeetingSidebar
          sidebar={sidebar}
          participants={allParticipants}
          messages={messages}
          sendMessage={sendMessage}
          user={user}
        />
      </div>

      {/* CONTROLS */}

      <MeetingControls
        sidebar={sidebar}
        setSidebar={setSidebar}
        cameraOn={cameraOn}
        toggleCamera={toggleCamera}
        micOn={micOn}
        toggleMic={toggleMic}
        screenSharing={screenSharing}
        toggleScreenShare={toggleScreenShare}
        leaveMeeting={leaveMeeting}
      />
    </div>
  );
};

export default Meeting;