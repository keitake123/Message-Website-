import "./list.css";
import Userinfo from "./userinfo/Userinfo1"
import Chatlist from "./chatlist/Chatlist1"

const List = () => {
    return (
        <div className ='list'>
        <Userinfo/>
        <Chatlist/>
        </div>
    )
}

export default List;