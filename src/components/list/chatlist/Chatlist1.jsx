import { useEffect, useState } from "react";
import "./chatList.css";
import Adduser from "./adduser/Adduser1";
import { useUserStore } from "../../../lib/userstore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const Chatlist = () => {
    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);
    const {currentUser} =useUserStore()

    useEffect(() => {
          const unSub =onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const item = res.data().chats;

            const promisses= items.map( async(item)=>{
                const userDocRef = doc(db, "users", "item.recieverID");
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data()

                return {...item, user};
            });

            const chatData = await Promise.all(promises)

            setChats(chatData.sort((a,b) => b.updateAt - a.updateAt));
          });

          return () => {
            unSub();
          };
    }, [currentUser.id]);

    
    return (
        <div className='chatlist'>
            <div className='search'>
                <div className='searchbar'>
                    <img src="./search.png" alt="" /> 
                    <input type="text" placeholder="Search" />
                </div>
         <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)} 
          />
            </div>
        {chats.map((chat) =>(
            <div className="item"key={chat.chatId}>
            <img src="./avatar.png" alt="" />
            <div className="texts">
            <span>Kei T</span>
            <p>{chat.lastmessage}</p>
            </div>
            </div>
         ))};
        {addMode && <Adduser />}
        </div>

    );
}

export default Chatlist;