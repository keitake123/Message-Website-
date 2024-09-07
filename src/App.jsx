import List from "./components/list/List1"
import Chat from "./components/chat/Chat1"
import Detail from "./components/detail/Detail1"
import Login from "./components/login/Login1"
import Notification from "./components/notification/Notification1"

const App = () => {

  const user = true

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