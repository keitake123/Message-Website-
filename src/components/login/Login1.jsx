import "./login.css";

const Login = () => {
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
            <input type="file" id="file"/>
            <input type="text" placeholder="Username" name="username" />
            <input type="password" placeholder="Password" name="password" />
            <button>Sign In </button>
            </form>
            </div>
            </div>;
}

export default Login;