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

const MeetingControls = ({sidebar, setSidebar, cameraOn, toggleCamera, micOn, toggleMic,screenSharing, toggleScreenShare, }) => {

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
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">

      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/80 px-6 py-4 backdrop-blur-xl shadow-2xl">

        {/* Mic */}
        <button onClick={toggleMic} className={`flex h-12 w-12 items-center justify-center rounded-full text-white transition ${
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
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700">
          <FiPhoneOff size={20} />
        </button>

      </div>

    </div>
  );
};

export default MeetingControls;