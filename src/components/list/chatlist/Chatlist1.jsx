import { useEffect, useState } from "react";
import "./chatList.css";
import Adduser from "./adduser/Adduser1";
import { useUserStore } from "../../../lib/userstore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const Chatlist = () => {
    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);
    const { currentUser } = useUserStore();

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userChats", currentUser.id), async (res) => {
            const data = res.data();
            if (!data || !data.chats) {
                console.log("No chat data found.");
                setChats([]);
                return;
            }

            const items = data.chats;

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiverId); // Corrected reference
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const user = userDocSnap.data();
                    return { ...item, user };
                } else {
                    console.log(`User with ID ${item.receiverId} does not exist.`);
                    return null;
                }
            });

            const chatData = await Promise.all(promises);
            // Filter out null values and sort based on updatedAt
            setChats(
                chatData.filter(Boolean).sort((a, b) => {
                    const aDate = a.updatedAt?.toDate() || 0;
                    const bDate = b.updatedAt?.toDate() || 0;
                    return bDate - aDate;
                })
            );
        });

        return () => {
            unSub();
        };
    }, [currentUser.id]);

    return (
        <div className='chatlist'>
            <div className='search'>
                <div className='searchbar'>
                    <img src="./search.png" alt="Search icon" />
                    <input type="text" placeholder="Search" />
                </div>
                <img
                    src={addMode ? "./minus.png" : "./plus.png"}
                    alt="Toggle add mode"
                    className="add"
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>
            {chats.length > 0 ? (
                chats.map((chat) => (
                    <div className="item" key={chat.chatId}>
                        <img src={chat.user.avatar || "./avatar.png"} alt="User avatar" />
                        <div className="texts">
                            <span>{chat.user.username}</span>
                            <p>{chat.lastMessage || "No message yet"}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No chats available</p>
            )}
            {addMode && <Adduser />}
        </div>
    );
}

export default Chatlist;
