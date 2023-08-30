import { useState, useEffect} from 'react';
import blogService from '../services/blogs';


// const handleLogin = async function(eve) {
//   try {
//     const user = await loginService.login({
//       username, password
//     })
//     window.localStorage.setItem(
//       'loggedBlogappUser', JSON.stringify(user)
//     )
//     blogService.setToken(user.token);
//     setUser(user);
//     setUsername('');
//     setPassword('');
//   } catch(exception) {
//     console.log('problem logging in :>> ', exception);
//   }

// };


const NewBlogForm = ({props}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const handleSubmitNewBlog = async function(eve) {
    eve.preventDefault();
    const newObj = {
      title,
      author,
      url,
      likes: 0,
    };
    try {
      blogService.create(newObj);
    } catch (exception) {
      console.log('problem creating object :>> ', exception);
    }
  };
  
  const handleTitleChange = (eve) => {
    setTitle(eve.target.value);
  };
  
  const handleAuthorChange = (eve) => {
    setAuthor(eve.target.value)
  };
  
  const handleUrlChange = (eve) => {
    setUrl(eve.target.value)
  };

  return (
    <form onSubmit={handleSubmitNewBlog}>
    <h2>Create a new blog</h2>
    <label> title
      <input type='text' 
      value={title} 
      name="Title: "
      onChange={handleTitleChange} />
    </label>
    <label> author
      <input type='text' 
      name="Author: "
      value={author}
      onChange={handleAuthorChange} />
    </label>
    <label> url
      <input type='text' 
      name="url: "
      value={url}
      onChange={handleUrlChange} />
    </label>
    <button type='submit'>submit</button>
  </form>
  )
}

export default NewBlogForm;