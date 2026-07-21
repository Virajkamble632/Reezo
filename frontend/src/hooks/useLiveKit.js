import { useEffect, useState } from "react";
import { Room, RoomEvent } from "livekit-client";
import axios from "axios";

const useLiveKit = (roomId, user) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);

  useEffect(() => {
    if (!roomId || !user) return;

    let livekitRoom;

    const refreshParticipants = () => {
      if (!livekitRoom) return;

      setParticipants([
        ...livekitRoom.remoteParticipants.values(),
      ]);
    };

    const connectRoom = async () => {
      try {
        console.log("Requesting LiveKit Token...");

        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/livekit/token`,
          {
            roomName: roomId,
            participantName: user.name,
          }
        );

        livekitRoom = new Room();

        await livekitRoom.connect(data.url, data.token);

        console.log("Connected to LiveKit");

        await livekitRoom.localParticipant.setCameraEnabled(true);
        await livekitRoom.localParticipant.setMicrophoneEnabled(true);

        const publication =
          livekitRoom.localParticipant.getTrackPublication("camera");

        if (publication?.videoTrack) {
          setLocalVideoTrack(publication.videoTrack);
        }

        setRoom(livekitRoom);

        refreshParticipants();

        // ---------------- Participant Events ----------------

        livekitRoom.on(RoomEvent.ParticipantConnected, (participant) => {
          console.log("Joined:", participant.identity);
          refreshParticipants();
        });

        livekitRoom.on(RoomEvent.ParticipantDisconnected, (participant) => {
          console.log("Left:", participant.identity);
          refreshParticipants();
        });

        // ---------------- Track Events ----------------

        const update = (event, participant, trackKind = "") => {
          console.log(
            `${event}:`,
            participant?.identity,
            trackKind
          );

          refreshParticipants();
        };

        livekitRoom.on(
          RoomEvent.TrackSubscribed,
          (track, publication, participant) => {
            update("TrackSubscribed", participant, track.kind);
          }
        );

        livekitRoom.on(
          RoomEvent.TrackUnsubscribed,
          (track, publication, participant) => {
            update("TrackUnsubscribed", participant, track.kind);
          }
        );

        livekitRoom.on(
          RoomEvent.TrackPublished,
          (publication, participant) => {
            update("TrackPublished", participant, publication.kind);
          }
        );

        livekitRoom.on(
          RoomEvent.TrackUnpublished,
          (publication, participant) => {
            update("TrackUnpublished", participant, publication.kind);
          }
        );

        livekitRoom.on(
          RoomEvent.TrackMuted,
          (publication, participant) => {
            update("TrackMuted", participant, publication.kind);
          }
        );

        livekitRoom.on(
          RoomEvent.TrackUnmuted,
          (publication, participant) => {
            update("TrackUnmuted", participant, publication.kind);
          }
        );

      } catch (err) {
        console.error("LiveKit Error:", err);
      }
    };

    connectRoom();

    return () => {
      if (livekitRoom) {
        livekitRoom.disconnect();
      }
    };
  }, [roomId, user]);

  const toggleScreenShare = async () => {
      if(!room) return;

      try{

        await room.localParticipant.setScreenShareEnabled( !room.localParticipant.isScreenShareEnabled );

        // Refresh UI after toggling
        setParticipants([...room.remoteParticipants.values()]);

      } catch(error) {  
          console.log("Share screen error:", error);
      }
  };

  return {
    room,
    localParticipant: room?.localParticipant,
    localVideoTrack,
    participants,
    toggleScreenShare,
  };
};

export default useLiveKit;