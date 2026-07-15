import ChatPanel from "./ChatPanel";
import ParticipantsPanel from "./ParticipantsPanel";


const MeetingSidebar = ({
    sidebar,
    participants,
    messages,
    sendMessage,
    user,
}) => {
    if(!sidebar) return null;

    return (
        <div className="w-80">
            {sidebar === 'participants' && (
                <ParticipantsPanel participants={participants} />
            )}

            {sidebar === "chat" && (
                <ChatPanel 
                    messages={messages}
                    sendMessage={sendMessage}
                    user={user}
                />
            )}
        </div>
    );
};


export default MeetingSidebar;