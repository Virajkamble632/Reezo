import {
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiMonitor,
  FiMessageSquare,
  FiUsers,
  FiPhoneOff,
  FiUser,
} from "react-icons/fi";

const MeetingControls = ({sidebar, setSidebar, cameraOn, toggleCamera, micOn, toggleMic,screenSharing, toggleScreenShare, leaveMeeting }) => {

  const toggleParticipants = () => {
    if(sidebar === "participants"){
      setSidebar(null);
    } else {
      setSidebar("participants");
    }
  };

  const toggleChat = () =>{
    if(sidebar === "chat"){
      setSidebar(null);
    } else {
      setSidebar("chat");
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -w-fit -max-w-[95vw] -translate-x-1/2 px-2">

      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2 backdrop-blur-xl shadow-2xl sm:gap-3 sm:py-3 sm:px-5 md:gap-4 md:px-6 md:py-4">

        {/* Mic */}
        <button onClick={toggleMic} className={`flex h-10 w-10 sm:h-11 sm:w-11 md:h-12 m:h-12 items-center justify-center rounded-full text-white transition ${
            micOn
              ? "bg-slate-800 hover:bg-slate-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {micOn ? (
            <FiMic size={20} />
          ) : (
            <FiMicOff size={20} />
          )}
        </button>

        {/* Camera */}
        <button  onClick={toggleCamera} className={`flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-white transition ${ cameraOn ? "bg-slate-800 hover:bg-slate-700" : "bg-red-600 hover:bg-red-700"}`}>
          {cameraOn ? (
            <FiVideo size={20} />
          ) : (
            <FiVideoOff size={20}/>
          )}
        </button>
        
        {/* Screen Share */}
          <button
            onClick={toggleScreenShare}
            className={`flex h-12 w-12 items-center justify-center rounded-full text-white transition ${
              screenSharing
                ? "bg-green-600 hover:bg-green-700"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            <FiMonitor size={20} />
          </button>

        <button onClick={toggleParticipants} className={`flex h-12 w-12 itmes-center justify-center rounded-full text-white transition ${
          sidebar === 'participants'? "bg-blue-600" : "bg-slate-800 hover:bg-slate-700"
        }`}>
          <FiUser size={25} className="mt-3"/>
        </button>

        {/* Chat */}
        <button onClick={toggleChat} className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-white transition hover:bg-slate-700">
          <FiMessageSquare size={20} />
        </button>
        
        {/* Leave */}
        <button onClick={leaveMeeting} className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700">
          <FiPhoneOff size={20} />
        </button>

      </div>

    </div>
  );
};

export default MeetingControls;