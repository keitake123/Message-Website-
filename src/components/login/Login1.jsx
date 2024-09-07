import "./login.css";

const Login = () => {
    const [avatar, setAvatar] = useState({
      file: null,
      url: "",
    });

    const handleAvatar = e = 

       return <div className="login">
          <div className="item">
            <h2>Welcome back,</h2>
            <form>
            <input type="text" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button>Sign In </button>
            </form>
            </div>
            <div className="Separator"></div>
            <div className="Item">
            <h2>Create an Account</h2>
            <form>
            <label htmlFor ="file">Upload an image</label>
            <input type="file" id="file" style={{display:"none"}} onchange={handleAvatar}/>
            <input type="text" placeholder="Username" name="username" />
            <input type="password" placeholder="Password" name="password" />
            <button>Sign In </button>
            </form>
            </div>
            </div>;
}

export default Login;