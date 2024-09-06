import "./chat.css";

const Chat = () => {
    return (
        <div className='chat'>
            <div className='top'>
                <div className='user'>
                    <img src="./avatar.png" alt="Avatar" />
                    <div className="texts">
                        <span>Josh J</span>
                        <p>Hi, my name is Josh</p>
                    </div>
                </div>
                <div className='icons'>
                    <img src="./phone.png" alt="Phone" />
                    <img src="./video.png" alt="Video Call" />
                    <img src="./info.png" alt="Info" />
                </div>
            </div>
            <div className='center'></div>
            <div className='bottom'>
                <div className='icons'>
                    <img src="./img.png" alt="Image" />
                    <img src="./camera.png" alt="Camera" />
                    <img src="./mic.png" alt="Mic" />
                </div>    
                <input type="text" placeholder="Type a message..." /> {/* Corrected placeholder */}
                <div className='emoji'>
                    <img src="./emoji.png" alt="Emoji" />  
                </div>
                <button className="sendButton">Send</button>
            </div>
        </div>
    );
}

export default Chat;
