import LocalVideo from "./LocalVideo";
import RemoteVideo from "./RemoteVideo";
import UserAvatar from "./UserAvatar";

const VideoGrid = ({
  localVideoTrack,
  participants,
  user,
  cameraOn: localCameraOn,
}) => {
  return (
    <div className="relative mt-6 h-[60vh] overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl sm:h-[65vh] md:h-[70vh] lg:h-[75vh]">
      {participants.length > 0 ? (
        <div
          className={`grid h-full w-full gap-4 p-4 ${
            participants.length === 1
              ? "grid-cols-1"
              : participants.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : participants.length <= 4
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
          }`}
        >
          {participants.map((participant) => {
            // ================= SCREEN SHARE =================

            const screenPublication = Array.from(
              participant.trackPublications.values()
            ).find(
              (pub) =>
                pub.source === "screen_share" &&
                pub.isSubscribed &&
                pub.track
            );

            const screenTrack = screenPublication?.track ?? null;

            // ================= CAMERA =================

            const cameraPublication = Array.from(
              participant.videoTrackPublications.values()
            ).find(
              (pub) =>
                pub.source === "camera" &&
                pub.isSubscribed &&
                pub.track
            );

            const cameraTrack = cameraPublication?.track ?? null;

            const cameraOn =
              !!cameraTrack &&
              !cameraPublication?.isMuted;

            // ================= AUDIO =================

            const audioPublication = Array.from(
              participant.audioTrackPublications.values()
            ).find(
              (pub) =>
                pub.kind === "audio" &&
                pub.isSubscribed
            );

            const micOn =
              !!audioPublication &&
              !audioPublication.isMuted;

            // ================= DEBUG =================

            console.log("---------------");
            console.log("Participant:", participant.identity);
            console.log("Camera:", cameraOn);
            console.log("Mic:", micOn);
            console.log("Screen Track:", screenTrack);
            console.log("Camera Track:", cameraTrack);

            return (
              <div
                key={participant.sid}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
              >
                <div className="relative h-full w-full">

                  {/* ================= SCREEN SHARE ================= */}

                  {screenTrack ? (
                    <>
                      <RemoteVideo track={screenTrack} />

                        <div className="absolute left-3 top-12 z-20 rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                          🖥️ Presenting
                        </div>
                    </>
                  ) : cameraOn ? (
                    <RemoteVideo track={cameraTrack} />

            
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900">
                      <UserAvatar
                        name={participant.identity}
                        size="h-28 w-28"
                        text="text-5xl"
                      />

                      <p className="mt-5 text-xl font-semibold text-white">
                        {participant.identity}
                      </p>
                    </div>
                  )}
                </div>

                {/* ================= NAME ================= */}

                  <div className="absolute left-3 top-3 z-20 rounded-lg bg-black/60 px-3 py-1 text-sm font-medium text-white backdrop-blur">
                    {participant.identity}
                  </div>

                {/* ================= MIC STATUS ================= */}

                {!micOn && (
                  <div className="absolute right-3 top-3 rounded-full bg-red-600 px-2 py-1 text-white shadow-lg">
                    🎤❌
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <div className="mb-5 text-7xl">👤</div>

          <h2 className="text-3xl font-bold text-white">
            Waiting for participant...
          </h2>

          <p className="mt-2 text-slate-400">
            Share the meeting code and invite others.
          </p>
        </div>
      )}

      {/* ================= LOCAL VIDEO ================= */}

      <div className="absolute bottom-24 right-3 h-28 w-40 sm:h-32 sm:w-48 md:bottom-6 md:right-6 md:h-40 md:w-64 lg:h-44 lg:w-72 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
        {localCameraOn ? (
          <LocalVideo localVideoTrack={localVideoTrack} />

          
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-900">
            <UserAvatar
              name={user.name}
              size="h-20 w-20"
              text="text-3xl"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoGrid;