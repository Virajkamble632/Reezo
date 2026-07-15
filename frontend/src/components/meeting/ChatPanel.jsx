import { useState, useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";

const ChatPanel = ({ messages = [], sendMessage, user }) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="fixed right-6 top-28 flex h-[70vh] w-80 flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl">

      {/* Header */}

      <div className="border-b border-white/10 p-4">

        <h2 className="text-lg font-semibold text-white">
          💬 Meeting Chat
        </h2>

      </div>

      {/* Messages */}

      <div className="flex-1 space-y-3 overflow-y-auto p-4">

        {messages.length === 0 ? (

          <div className="mt-10 text-center text-slate-400">
            No messages yet.
          </div>

        ) : (

          messages.map((msg, index) => {

            const messageUserId = msg.user?._id || msg.user?.id;
            const currentUserId = user?._id || user?.id;

            const isMe =
              String(messageUserId) === String(currentUserId);

            return (

              <div
                key={index}
                className={`flex ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-lg ${
                    isMe
                      ? "rounded-br-md bg-blue-600 text-white"
                      : "rounded-bl-md bg-slate-800 text-white"
                  }`}
                >

                  <p
                    className={`mb-1 text-xs font-medium ${
                      isMe
                        ? "text-blue-100"
                        : "text-blue-400"
                    }`}
                  >
                    {isMe ? "You" : msg.user?.name || "Unknown"}
                  </p>

                  <p className="break-words text-[15px]">
                    {msg.message}
                  </p>

                  <p
                    className={`mt-2 text-right text-[11px] ${
                      isMe
                        ? "text-blue-100"
                        : "text-slate-400"
                    }`}
                  >
                    {msg.time
                      ? new Date(msg.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </p>

                </div>

              </div>

            );
          })

        )}

        <div ref={messagesEndRef} />

      </div>

      {/* Input */}

      <div className="border-t border-white/10 p-3">

        <div className="flex gap-2">

          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            className="flex-1 rounded-xl bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500"
          />

          <button
            onClick={handleSend}
            className="rounded-xl bg-blue-600 px-4 text-white transition hover:bg-blue-700"
          >
            <FiSend size={18} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default ChatPanel;