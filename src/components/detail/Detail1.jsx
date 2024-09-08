import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import "./detail.css";

const Detail = () => {
    return (
        <div className ='detail'>
        <div className ='user'>
        <img src="./avatar.png" alt="" />
        <h2>Kei Taketsuna</h2>
        <p>Description</p>
        </div>
        <div className ='info'>
        <div className ='option'>
        <div className ='title'>
        <span>chat settings</span>
        <img src="./arrowUp.png" alt="" />
        </div>
        </div>
        <div className ='option'>
        <div className ='title'>
        <span>Privacy & Help</span>
        <img src="./arrowUp.png" alt="" />
        </div>
        </div>
        <div className ='option'>
        <div className ='title'>
        <span>Shared Photos</span>
        <img src="./arrowDp.png" alt="" />
        </div>
        <div className ='photos'>
        <div className ='photoItem'>
        <div className ='photoDetail'>  
        <img src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"  alt=""/>
        <span>photo_2024_2.png</span>
        </div>
        <img src="download.png"  alt="" className="icon" />
        </div>
        <div className ='photoItem'>
        <div className ='photoDetail'>  
        <img src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"  alt=""/>
        <span>photo_2024_2.png</span>
        </div>
        <img src="download.png"  alt="" className="icon"/>
        </div>
        <div className ='photoItem'>
        <div className ='photoDetail'>  
        <img src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"  alt=""/>
        <span>photo_2024_2.png</span>
        </div>
        <img src="download.png"  alt="" className="icon"/>
        </div>
        <div className ='photoItem'>
        <div className ='photoDetail'>  
        <img src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"  alt=""/>
        <span>photo_2024_2.png</span>
        </div>
        <img src="download.png"  alt="" className="icon"/>
        </div>
        <div className ='photoItem'>
        <div className ='photoDetail'>  
        <img src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"  alt=""/>
        <span>photo_2024_2.png</span>
        </div>
        <img src="download.png"  alt="" className="icon"/>
        </div>
        </div>
        </div>
        <div className ='option'>
        <div className ='title'>
        <span>Shared Files</span>
        <img src="./arrowUp.png" alt="" className="icon"/>
        </div>
        </div>
        <button>Block User</button>
        <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
        </div>
        </div>
    )
}

export default Detail

