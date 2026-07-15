import { FiMic, FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";




const ParticipantsPanel = ({ participants }) => {
  return (
    <div className="fixed right-6 top-28 w-72 rounded-2xl border border-white/10 bg-slate-900/90 p-5 backdrop-blur-xl">

      <h2 className="mb-4 text-lg font-semibold text-white">
        Participants ({participants.length})
      </h2>

      <div className="space-y-3">

        {participants.map((participant) => (

          <div key={participant.socketId} className="flex items-center justify-between rounded-xl bg-slate-800 p-3" >

              {/* LEFT */}
              <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white"> 
                      {participant.user?.name?.charAt(0).toUpperCase()}  
                    </div>

                    <div>
                        <p className="text-white font-medium">
                            {participant.user?.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          Online
                        </p>
                    </div>  
              </div> 

              {/* RIGHT */}

              <div className="flex items-center gap-2">

                  {participant.cameraOn ? (
                      <FiVideo className="text-green-400" />
                  ) : (
                      <FiVideoOff className="text-red-400" />
                  )}

                  {participant.micOn ? (
                      <FiMic className="text-green-400" />
                  ) : (
                    <FiMicOff className="text-red-400" />
                  )}
                  
              </div>    

          </div>

        ))}

      </div>

    </div>
  );
};

export default ParticipantsPanel;