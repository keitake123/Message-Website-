import List from "./components/list/List1"
import Chat from "./components/chat/Chat1"
import Detail from "./components/detail/Detail1"
import Login from "./components/login/Login1"
import Notification from "./components/notification/Notification1"
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const App = () => {
  const user = false;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
    });

    return () => {
      unSub();
    };
  }, []);

  return (
    <div className='container'>
      {
        user ? (
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