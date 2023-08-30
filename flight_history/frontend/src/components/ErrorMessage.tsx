import { useEffect } from "react"
interface errorMessageInterface {
  error: string,
  setErrorMessage: Function,
}

const ErrorMessage = (props: errorMessageInterface) => {
  const errorStyle = {
    border: "1px solid red",
    fontWeight: "bold"
  }

  const handleCloseMessage = function() {
    props.setErrorMessage('');
  }

  return (
    <div>
      { (props.error) 
      ? (
      <div style={errorStyle}>
        <p>{props.error}</p>
        <button onClick={handleCloseMessage}>close</button>
      </div>
      )
      : ''
      }
    </div>
  )
}

export default ErrorMessage;