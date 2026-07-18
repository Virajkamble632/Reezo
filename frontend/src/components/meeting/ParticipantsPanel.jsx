import { FiMic, FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";

const ParticipantsPanel = ({ participants }) => {
  return (
    <div className="fixed right-3 left-3 top-20 w-auto sm:left-auto sm:right-4 sm:w-80 md:right-6 md:w-72 rounded-2xl border border-white/10 bg-slate-900/90 p-5 backdrop-blur-xl">
      <h2 className="mb-4 text-lg font-semibold text-white">
        Participants ({participants.length})
      </h2>

      <div className="space-y-3">
        {participants.map((participant) => {
          const isLocal =
            participant.constructor.name === "LocalParticipant";

          let cameraOn = false;
          let micOn = false;

          if (isLocal) {
            cameraOn = participant.isCameraEnabled;
            micOn = participant.isMicrophoneEnabled;
          } else {
            const videoPublication = Array.from(
              participant.videoTrackPublications.values()
            ).find(
              (pub) =>
                pub.kind === "video" ||
                pub.source === "camera"
            );

            const audioPublication = Array.from(
              participant.audioTrackPublications.values()
            ).find(
              (pub) => pub.kind === "audio"
            );

            cameraOn =
              !!videoPublication?.track &&
              videoPublication.isSubscribed &&
              !videoPublication.isMuted;

            micOn =
              !!audioPublication?.track &&
              audioPublication.isSubscribed &&
              !audioPublication.isMuted;
          }

          return (
            <div
              key={participant.sid}
              className="flex items-center justify-between rounded-xl bg-slate-800 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                  {participant.identity.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-medium text-white">
                    {participant.identity}
                    {isLocal && " (You)"}
                  </p>

                  <p className="text-xs text-slate-400">
                    Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cameraOn ? (
                  <FiVideo className="text-green-400" />
                ) : (
                  <FiVideoOff className="text-red-400" />
                )}

                {micOn ? (
                  <FiMic className="text-green-400" />
                ) : (
                  <FiMicOff className="text-red-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParticipantsPanel;