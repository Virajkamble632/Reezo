export const initializeSocket = (io) => {

    io.on("connection", (socket) => {

        console.log("New User Connected:", socket.id);

        // ================= JOIN ROOM =================

        socket.on("join-room", ({ roomId }) => {

            socket.join(roomId);

            console.log(`${socket.id} joined room ${roomId}`);

        });

        // ================= LEAVE ROOM =================

        socket.on("leave-room", ({ roomId }) => {

            socket.leave(roomId);

            console.log(`${socket.id} left room ${roomId}`);

        });

        // ================= CHAT =================

        socket.on("send-message", ({ roomId, message, user }) => {

            console.log(`${user.name}: ${message}`);

            io.to(roomId).emit("receive-message", {
                message,
                user,
                time: new Date(),
            });

        });

        // ================= DISCONNECT =================

        socket.on("disconnect", () => {

            console.log("Disconnected:", socket.id);

        });

    });

};