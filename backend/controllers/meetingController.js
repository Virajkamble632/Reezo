import Meeting from "../models/Meeting.js";
import crypto from "crypto";


const genrateMeetingCode = () => {

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789";

    let code = "";

    for(let i=0; i<7; i++){
        const randomIndex = Math.floor(Math.random() * characters.length);

        code += characters[randomIndex];
    }

    return code;
};

// Create Meeting
export const createMeeting = async(req, res) => {
    try{
        // Genrate unique meeting code
        let roomId;
        let meetingExists = true;

        while(meetingExists) {
            roomId = genrateMeetingCode();

            meetingExists = await Meeting.findOne({
                roomId,
            });
        }

        // Create Meeting
        const meeting = await Meeting.create({
            roomId,
            host: req.user._id,
            participants: [req.user._id],
        });

        return res.status(201).json({
            success : true,
            message: "Meeting created successfully.",
            meeting,
        });

    } catch(error){

        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Join Meeting
export const joinMeeting = async(req, res) => {
    try{
        const { roomId } = req.body;

        // Check Room ID
        if(!roomId){
            return res.status(400).json({
                success:false,
                message:"Room ID is required.",
            });
        }

        // Find Meeting
        const meeting = await Meeting.findOne({
            roomId,
            status: 'active',
        });

        if(!meeting){
            return res.status(404).json({
                success:false,
                message:'Meeting not found.',
            });
        }

        //Add participant only if not already present
        if(!meeting.participants.includes(req.user._id)) {
            meeting.participants.push(req.user._id);
            await meeting.save();
        }

        return res.status(202).json({
            success: true,
            message: 'Joined meeting successfully.',
            meeting,
        });

    } catch(error){
        return res.status(500).json({
            success:false,
            message: error.message,
        });
    } 
};