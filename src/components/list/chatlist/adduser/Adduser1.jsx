import "./adduser.css";
import { db } from "../../../../lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";

const Adduser = () => {
  const [user, setUser] = useState(null); // Initialize state for user

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

  

  return (
    <div className='adduser'>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      
      {user && (
        <div className='user'>
          <div className='detail'>
            <img src={user.avatar || './avatar.png'} alt="User avatar" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>)}
    </div>
  );
};

export default Adduser;
