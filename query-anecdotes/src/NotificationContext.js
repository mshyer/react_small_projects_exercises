import { createContext, useContext, useReducer } from 'react'
export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY":
        return action.payload;
    default:
        return state
  }
  console.log('reducer firing')
  return 'Hello, world';
}

const NotificationContext = createContext();

// Divvy up the context
export const useNotificationMessage = () => {
  const messageAndDispatch = useContext(NotificationContext)
  return messageAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const messageAndDispatch = useContext(NotificationContext)
  return messageAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, 'X');

  return (
  <NotificationContext.Provider value={[message, messageDispatch] }>
    {props.children}
  </NotificationContext.Provider>  
  )
}

export default NotificationContext;