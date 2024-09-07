import { useState, useRef, useEffect } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";


const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
      };
      const endRef = useRef(null);

      useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
      }, []);

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
            <div className='center'>
            <div className='message'>
            <img src="./avatar.png" alt="" />
            <div className='texts'>
            <p>
            afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin
            </p>
            <span>1 min ago</span>
            </div>
            </div>
            <div className='message own'>
            <div className='texts'>
            <p>
            afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin
            </p>
            <span>1 min ago</span>
            </div>
            </div>
            <div className='message'>
            <img src="./avatar.png" alt="" />
            <div className='texts'>
            <p>
            afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin
            </p>
            <span>1 min ago</span>
            </div>
            </div>
            <div className='message own'>
            <div className='texts'>
            <p>
            afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin
            </p>
            <span>1 min ago</span>
            </div>
            </div>
            <div className='message'>
            <img src="./avatar.png" alt="" />
            <div className='texts'>
            <p>
            afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin
            </p>
            <span>1 min ago</span>
            </div>
            </div>
            <div className='message own'>
            <div className='texts'>
            <p>
            afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin
            </p>
            <span>1 min ago</span>
            </div>
            </div>
            <div className='message'>
            <img src="./avatar.png" alt="" />
            <div className='texts'>
            <p>
            afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin
            </p>
            <span>1 min ago</span>
            </div>
            </div>
            <div className='message'>
            <img src="./avatar.png" alt="" />
            <div className='texts'>
            <p>
            afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa nin afefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa ninafefav feffanend  fniqninw fnqwnfa nin
            </p>
            <span>1 min ago</span>
            </div>
            </div>
            <div ref={endRef}></div>
            </div>
            <div className='bottom'>
                <div className='icons'>
                    <img src="./img.png" alt="Image" />
                    <img src="./camera.png" alt="Camera" />
                    <img src="./mic.png" alt="Mic" />
                </div>    
                <input 
                type="texts" 
                placeholder="Type a message..." 
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
                <div className='emoji'>
                    <img src="./emoji.png" alt=""onClick={() => setOpen((prev) => !prev)} />
                    <EmojiPicker open = {open} onEmojiClick={handleEmoji}/>  
                </div>
                <button className="sendButton">Send</button>
            </div>
        </div>
    );
}

export default Chat;
