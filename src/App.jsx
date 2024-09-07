import List from "./components/list/List1"
import Chat from "./components/chat/Chat1"
import Detail from "./components/detail/Detail1"
import Login from "./components/login/Login1"
import Notification from "./components/notification/Notification1"
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useUserStore } from "./lib/userstore";

const App = () => {
  
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser)
  if (isLoading) return <div className="loading">Loading...</div>;


  return (
    <div className='container'>
      {
        currentUser ? (
          <>
      <List/>
      <Chat/>
      <Detail/>
      </>
        ) : (
          <Login/>
        )}
     <Notification/>
    </div>
  );
}

export default App