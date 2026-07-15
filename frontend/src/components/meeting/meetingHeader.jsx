import { FiCopy } from "react-icons/fi";
import { toast } from "react-hot-toast";

const MeetingHeader = ({ roomId, setSidebar }) => {

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Meeting ID copied!");
    } catch (error) {
      toast.error("Failed to copy Meeting ID");
    }
  };

  return (
    <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Reezo Meeting
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Room ID
        </p>

        <p className="font-mono text-blue-400 break-all">
          {roomId}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <button
          onClick={copyRoomId}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          <FiCopy />
          Copy
        </button>

      </div>

    </header>
  );
};

export default MeetingHeader;