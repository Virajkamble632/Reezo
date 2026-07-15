import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
    {
        roomId: {
            type: String,
            required: true,
            unique: true,
        },
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        status: {
            type: String,
            enum: ["active", "ended"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);


const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;