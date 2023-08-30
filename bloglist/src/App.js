import { useState, useEffect, useRef} from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import NewBlogForm from './components/newBlogForm';


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async function(eve) {
    eve.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch(exception) {
      console.log('problem logging in :>> ', exception);
    }

  };

  const handleUsernameChange = function(eve) {
    setUsername(eve.target.value);
  };

  const handlePasswordChange = function(eve) {
    setPassword(eve.target.value);
  };

  const newBlogForm = () => {
    return (
    <Togglable buttonLabel="New Blog">
      <NewBlogForm />
    </Togglable>
    );
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm 
        username={username}
        password={password}
        handlePasswordChange={handlePasswordChange}
        handleUsernameChange={handleUsernameChange}
        handleLogin={handleLogin}
      />
    </Togglable>
    // <form onSubmit={handleLogin}>
    //   <h2>Log in to the application</h2>
    //   <label> username
    //     <input type='text' 
    //     value={username} 
    //     name="Username"
    //     onChange={handleUsernameChange} />
    //   </label>
    //   <label> password
    //     <input type='password' 
    //     name="Password"
    //     value={password}
    //     onChange={handlePasswordChange} />
    //   </label>
    //   <button type='submit'>login</button>
    // </form>
  );

  const blogsList = () => {
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        <NewBlogForm />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && blogsList()}
    </div>
  )
}

export default App