const connectedUsers = {};

export const initializeSocket = (io) => {

    io.on("connection", (socket) => {

        console.log("New User Connected:", socket.id);

        // ================= JOIN ROOM =================

        socket.on("join-room", ({ roomId, user }) => {

            socket.join(roomId);

            // ================= REMOVE OLD ENTRY =================

            const currentUserId = user._id || user.id;

            Object.keys(connectedUsers).forEach((id) => {

                const existingUserId =
                    connectedUsers[id].user._id ||
                    connectedUsers[id].user.id;

                if (
                    connectedUsers[id].roomId === roomId &&
                    existingUserId === currentUserId
                ) {
                    delete connectedUsers[id];
                }

            });

            // ================= ADD NEW USER =================

            connectedUsers[socket.id] = {
                socketId: socket.id,
                roomId,
                user,
                cameraOn: true,
                micOn: true,
                screenSharing: false,
            };

            // ================= SEND PARTICIPANTS =================

            const roomUsers = Object.values(connectedUsers).filter(
                (u) => u.roomId === roomId
            );

            socket.emit("existing-users", roomUsers.filter(
                (u) => u.socketId !== socket.id
            ));

            io.to(roomId).emit("participants-update", roomUsers);

            socket.to(roomId).emit("user-joined", {
                socketId: socket.id,
                user,
            });

            console.log(`${user.name} joined room ${roomId}`);

        });

        // ================= OFFER =================

        socket.on("offer", (data) => {

            console.log("OFFER Data", data);

            if(!data) {
                console.log("Offer data was undefined");
                return;
            }

            const { targetSocketId, offer} = data;

            console.log("From:", socket.id);
            console.log("To:", targetSocketId);

            io.to(targetSocketId).emit("offer", {
                offer,
                sender: socket.id,
            });

            console.log("Offer Forwarded");

        });

        // ================= ANSWER =================

        socket.on("answer", ({ targetSocketId, answer }) => {

            console.log("======ANSWER=====");
            console.log("From:", socket.id);
            console.log("To:", targetSocketId);

            io.to(targetSocketId).emit("answer", {
                answer,
                sender: socket.id,
            });

            console.log("Answer forwarded");
        });

        // ================= ICE =================

        socket.on("ice-candidate", ({ targetSocketId, candidate }) => {

            console.log("===== ICE =====");
            console.log("From:", socket.id);
            console.log("To:", targetSocketId);

            io.to(targetSocketId).emit("ice-candidate", {
                candidate,
                sender: socket.id,
            });

        });

        // ================= CAMERA TOGGLE ==============

        socket.on("camera-toggle", ({ roomId, cameraOn, user }) => {

            if (connectedUsers[socket.id]) {

                connectedUsers[socket.id].cameraOn = cameraOn;

            }

            const roomUsers = Object.values(connectedUsers).filter( 
                (u) => u.roomId === roomId
            )

            io.to(roomId).emit("participants-update", roomUsers);

            socket.to(roomId).emit("camera-toggle", {
                cameraOn,
                user,
            });
        });

        // ================= MIC TOGGLE =================

        socket.on("mic-toggle", ({ roomId, micOn, user }) => {

           if(connectedUsers[socket.id]) {

                connectedUsers[socket.id].micOn = micOn;

           }

           const roomUsers = Object.values(connectedUsers).filter(

                (u) => u.roomId === roomId
           );

           io.to(roomId).emit("participants-update", roomUsers);

            socket.to(roomId).emit("mic-toggle", {
                micOn,
                user,
            });

        });

        // ================= CHAT =================

        socket.on("send-message", ({ roomId, message, user }) => {

            console.log("=====New Message=====");
            console.log(user.name, ":", message);

            io.to(roomId).emit("receive-message", {
                message,
                user,
                time: new Date(),
            });
        });


        // ================= DISCONNECT =================

        socket.on("disconnect", () => {

            console.log("Disconnected:", socket.id);

            const roomId = connectedUsers[socket.id]?.roomId;

            delete connectedUsers[socket.id];

            if(roomId){

                const roomUsers = Object.values(connectedUsers).filter(
                    (u) => u.roomId === roomId
                );

                console.log("Participants:", roomUsers);
                io.to(roomId).emit("participants-update", roomUsers);

            }

        });

    });

};