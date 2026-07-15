import LocalVideo from "./LocalVideo";
import RemoteVideo from "./RemoteVideo";
import UserAvatar from "./UserAvatar";

const VideoGrid = ({
  localStream,
  remoteStreams,
  remoteUsers,
  participantsState,
  user,
  cameraOn,
}) => {

  const remoteEntries = Object.entries(remoteStreams);

  return (
    <div className="relative mt-6 h-[75vh] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">

      {/* ================= Remote Videos ================= */}

      {remoteEntries.length > 0 ? (

        <div
          className={`grid h-full w-full gap-4 p-4
            ${
              remoteEntries.length === 1
                ? "grid-cols-1"
                : remoteEntries.length === 2
                ? "grid-cols-2"
                : remoteEntries.length <= 4
                ? "grid-cols-2"
                : "grid-cols-3"
            }`}
        >

          {remoteEntries.map(([socketId, stream]) => {

            const participant = participantsState[socketId];
            const remoteUser = remoteUsers[socketId];

            return (
              <div
                key={socketId}
                className="relative overflow-hidden rounded-2xl bg-slate-900 border border-white/10"
              >

                <div className="relative h-full w-full">

                    {participant?.cameraOn ? (

                        <RemoteVideo stream={stream} />

                    ) : (

                        <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900">

                            <UserAvatar
                                name={remoteUser?.name || "User"}
                                size="h-28 w-28"
                                text="text-5xl"
                            />

                            <p className="mt-5 text-xl font-semibold text-white">
                                {remoteUser?.name || "Participant"}
                            </p>

                        </div>

                    )}

                </div>

                {/* User Name */}

                <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1 text-sm text-white backdrop-blur">

                  {remoteUser?.name || "Participant"}

                </div>

                {/* Mic Indicator */}

                {!participant?.micOn && (

                  <div className="absolute top-3 right-3 rounded-full bg-red-600 p-2">

                    🎤❌

                  </div>

                )}

              </div>
            );
          })}

        </div>

      ) : (

        <div className="flex h-full flex-col items-center justify-center">

          <div className="mb-5 text-7xl">
            👤
          </div>

          <h2 className="text-3xl font-bold text-white">
            Waiting for participant...
          </h2>

          <p className="mt-2 text-slate-400">
            Share the meeting code and invite others.
          </p>

        </div>

      )}

      {/* ================= Local Video ================= */}

      <div className="absolute bottom-6 right-6 h-44 w-72 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">

        {cameraOn ? (

          <LocalVideo localStream={localStream} />

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