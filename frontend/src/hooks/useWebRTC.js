import {useEffect, useRef, useState} from 'react';
import socket from '../socket/socket';


const configuration = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

const useWebRTC = (roomId, localStream, user) => {

    // Peer Connections

    const peersRef = useRef({});

    // Remote Streams

    const [remoteStreams, setRemoteStreams] = useState({});

    // Remote Users

    const [remoteUsers, setRemoteUsers] = useState({});

    // Participants State

    const [participantsState, setParticipantsState] = useState({});

    const createPeer = (socketId) => {

        //If peer already exists, return it
        if(peersRef.current[socketId]) {
          return peersRef.current[socketId];
        }

        // Create new PeerConnection
        const peer = new RTCPeerConnection(configuration);

        console.log("Created Peer for:", socketId);

        addLocalTracks(peer);

        peer.ontrack = (event) => {
           console.log("Remote stream from: ", socketId);

           setRemoteStreams((prev) => ({
              ...prev,
              [socketId]: event.streams[0],

           }));
        };

        peer.onicecandidate = (event) => {

            if(!event.candidate) return;

            console.log("Sending ICE to:",  socketId);

            socket.emit("ice-candidate", {
                targetSocketId: socketId,
                candidate: event.candidate,
            });
        };

        // Save it
        peersRef.current[socketId] = peer;

        return peer;
    }

    const addLocalTracks = (peer) => {

      if(!localStream) return;

      //Avoid adding duplicate track
      if(peer.getSenders().length > 0 ) return;
      
      localStream.getTracks().forEach((track) => {
        peer.addTrack(track, localStream);
      });

      console.log("Local tracks added");
    }

    useEffect(() => {

      if(!localStream || !user) return;

      console.log("Joining room:", roomId);

      console.log("Joining Room",roomId);

      socket.emit("join-room", {
        roomId,
        user,
      });

      const handleExistingUsers = async (users) => {

          console.log("Existing Users:", users);

          const usersMap = {};
          const stateMap = {};

          users.forEach((participant) => {

              usersMap[participant.socketId] = participant.user;

              stateMap[participant.socketId] = {
                  cameraOn: participant.cameraOn,
                  micOn: participant.micOn,
                  screenSharing: participant.screenSharing,
              };

          });

          setRemoteUsers(usersMap);
          setParticipantsState(stateMap);

          console.log("Remote Users:", usersMap);
          console.log("Participants State:", stateMap);

          for (const participant of users) {

              const peer = createPeer(participant.socketId);

              console.log("Creating Offer for:", participant.user.name);

              const offer = await peer.createOffer();

              await peer.setLocalDescription(offer);

              console.log("Offer Created");

              socket.emit("offer", {
                  targetSocketId: participant.socketId,
                  offer,
              });

          }

      };

      const handleUserJoined = ({ socketId, user }) => {

          console.log("New participant:", user.name);

          setRemoteUsers((prev) => ({
              ...prev,
              [socketId]: user,
          }));

          setParticipantsState((prev) => ({
              ...prev,
              [socketId]: {
                cameraOn: true,
                micOn: true,
                screenSharing: false,
              },
          }));
      };

      const handleOffer = async ({ offer, sender }) => {

          console.log("Offer received from:", sender);

          // create peer for sender if it dosen't exists
          const peer = createPeer(sender);

          // save sender's offer
          await peer.setRemoteDescription(
              new RTCSessionDescription(offer)
          );

          console.log("Remote Description Set");

          // Create answer
          const answer = await peer.createAnswer();

          //Save locally
          await peer.setLocalDescription(answer);

          console.log("Answer created");

          // Send answer back only to sender
          socket.emit("answer", {
              targetSocketId: sender,
              answer,
          });

      };

      const handleAnswer = async ({answer, sender}) => {

          console.log("Answer received from: ", sender);

          const peer = peersRef.current[sender];

          if(!peer) {
            console.log("Peer not found");
            return;
          }

          await peer.setRemoteDescription(
            new RTCSessionDescription(answer)
          );

          console.log("Remote answer set successfully");
      };

      const handleIceCandidate = async ({candidate, sender}) => {

          console.log("ICE Received From:", sender);

          const peer = peersRef.current[sender];

          if(!peer) {
            console.log("Peer not found");
            return;
          }

          await peer.addIceCandidate(
              new RTCIceCandidate(candidate)
          );

          console.log("ICE added");
      };

      socket.on("existing-users", handleExistingUsers);
      socket.on("user-joined", handleUserJoined);
      socket.on("offer", handleOffer);
      socket.on("answer", handleAnswer);
      socket.on("ice-candidate", handleIceCandidate);

      return () => {

        socket.off("existing-users", handleExistingUsers);
        socket.off("user-joined", handleUserJoined);
        socket.off("offer", handleOffer);
        socket.off("answer", handleAnswer);
        socket.off("ice-candidate", handleIceCandidate);

      }

    }, [roomId, localStream, user]);

    return{
      peersRef,
      remoteStreams,
      remoteUsers,
      participantsState
    };

};


export default useWebRTC;