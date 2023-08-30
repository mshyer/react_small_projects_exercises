const LoginForm = ({
  username,
  password,
  handleLogin,
  handlePasswordChange,
  handleUsernameChange  }) => {
  return (
    <form onSubmit={handleLogin}>
    <h2>Log in to the application</h2>
    <label> username
      <input type='text' 
      value={username} 
      name="Username"
      onChange={handleUsernameChange} />
    </label>
    <label> password
      <input type='password' 
      name="Password"
      value={password}
      onChange={handlePasswordChange} />
    </label>
    <button type='submit'>login</button>
  </form>
  )
}

export default LoginForm;