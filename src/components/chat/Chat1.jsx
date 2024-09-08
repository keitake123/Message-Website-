import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
  Timestamp // Import Timestamp
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatstore";
import { useUserStore } from "../../lib/userstore";

const Chat = () => {
    const [chat, setChat] = useState();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const { currentUser } = useUserStore();
    const { chatId, user } = useChatStore();

    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChat(res.data());
        });
        return () => {
            unSub();
        };
    }, [chatId]);

    const handleSend = async () => {
        if (text === "") return;

        try {
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    sendId: currentUser.id,
                    text,
                    createdAt: Timestamp.now() // Use Timestamp here
                })
            });

            // Update userChats for both users
            const userIDs = [currentUser.id, user.id];
            userIDs.forEach(async (id) => {
                const userChatsRef = doc(db, "userChats", id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();
                    const chatIndex = userChatsData.chats.findIndex(
                        (c) => c.chatId === chatId
                    );

                    if (chatIndex !== -1) {
                        userChatsData.chats[chatIndex].lastMessage = text;
                        userChatsData.chats[chatIndex].updatedAt = Timestamp.now(); // Use Timestamp here

                        await updateDoc(userChatsRef, {
                            chats: userChatsData.chats,
                        });
                    }
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='chat'>
            <div className='top'>
                <div className='user'>
                    <img src={user?.avatar || "./avatar.png"} alt="Avatar" />
                    <div className="texts">
                        <span>{user?.username || "User"}</span>
                        <p>Hi, my name is Bob</p>
                    </div>
                </div>
                <div className='icons'>
                    <img src="./phone.png" alt="Phone" />
                    <img src="./video.png" alt="Video Call" />
                    <img src="./info.png" alt="Info" />
                </div>
            </div>
            <div className='center'>
                {chat?.messages?.map((message) => (
                    <div className={`message ${message.sendId === currentUser.id ? 'own' : ''}`} key={`${message.sendId}-${message.createdAt.toMillis()}`}>
                        <div className="texts">
                            {message.img && <img src={message.img} alt="" />}
                            <p>{message.text}</p>
                            {/* Removed "not seen" text */}
                        </div>
                    </div>
                ))}
                <div ref={endRef}></div>
            </div>
            <div className='bottom'>
                <div className='icons'>
                    <img src="./img.png" alt="Image" />
                    <img src="./camera.png" alt="Camera" />
                    <img src="./mic.png" alt="Mic" />
                </div>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className='emoji'>
                    <img src="./emoji.png" alt="" onClick={() => setOpen((prev) => !prev)} />
                    <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                </div>
                <button className="sendButton" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
