import "./addUser.css";
import { db } from "../../../../lib/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useUserStore } from "../../../../lib/userstore";

const Adduser = () => {
  const [user, setUser] = useState(null); // Initialize state for user
  const { currentUser } = useUserStore(); // Assuming currentUser is the logged-in user

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data()); // Set the user data in state
      } else {
        setUser(null); // If no user found, clear the state
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");

    try {
      // Create a new document reference for the chat
      const newChatRef = doc(chatRef);

      // Add the document to the "chats" collection with the necessary fields
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        message: [],
      });

      // Define references for both users' chat documents
      const userChatDocRef = doc(userChatsRef, user.id);
      const currentUserChatDocRef = doc(userChatsRef, currentUser.id);

      // Get documents to check if they exist
      const userChatDocSnap = await getDoc(userChatDocRef);
      const currentUserChatDocSnap = await getDoc(currentUserChatDocRef);

      // If the user's chat document doesn't exist, create it using setDoc
      if (!userChatDocSnap.exists()) {
        await setDoc(userChatDocRef, {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: currentUser.id,
          }),
          updatedAt: serverTimestamp(),
        });
      } else {
        // If the document exists, update it using updateDoc
        await updateDoc(userChatDocRef, {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: currentUser.id,
          }),
          updatedAt: serverTimestamp(),
        });
      }

      // Similarly, check and create/update the current user's chat document
      if (!currentUserChatDocSnap.exists()) {
        await setDoc(currentUserChatDocRef, {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: user.id,
          }),
          updatedAt: serverTimestamp(),
        });
      } else {
        await updateDoc(currentUserChatDocRef, {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: user.id,
          }),
          updatedAt: serverTimestamp(),
        });
      }

      console.log("Chat added successfully");
    } catch (err) {
      console.log("Error adding chat:", err);
    }
  };

  return (
    <div className="adduser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>

      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || './avatar.png'} alt="User avatar" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default Adduser;
