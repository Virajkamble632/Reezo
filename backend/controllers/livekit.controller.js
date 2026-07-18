import { AccessToken } from 'livekit-server-sdk';

export const generateToken = async(req, res) => {
    
    try{
        const { roomName, participantName } = req.body;

        if(!roomName || !participantName) {
            return res.status(400).json({
                success: false,
                message: "Room name and participant name are required",
            });
        }

        const token = new AccessToken(
            process.env.LIVEKIT_API_KEY,
            process.env.LIVEKIT_API_SECRET,
            {
                identity: participantName,
            }
        );

        token.addGrant({
            roomJoin: true,
            room: roomName,
            canPublish: true,
            canSubscribe: true,
        });

        const jwt = await token.toJwt();

        res.status(200).json({
            success: true,
            token: jwt,
            url: process.env.LIVEKIT_URL,
        });

    } catch(error){

        console.log(error);

        res.status(500).json({
            success:false,
            message: "Failed to genrate LiveKit token.",
        });
    }
}