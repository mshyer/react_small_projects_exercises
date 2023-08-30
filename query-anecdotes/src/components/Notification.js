import { useReducer, useEffect } from "react";
import { useNotificationDispatch, useNotificationMessage } from "../NotificationContext";

// import NotificationContext from "../NotificationContext";{ useNotificationDispatch, useNotificationMessage } from "../NotificationContext"

//button onClick={() => counterDispatch({ type: "INC"})}>+</button

import { notificationReducer } from "../NotificationContext";
const Notification = () => {
  // const [message, messageDispatch] = useReducer(notificationReducer, 'initial');
  // useEffect(() => {
  //   console.log('yum :>> ', message);
  // }, [message])
  // const [message, ] = useNotificationMessage();
  const message = useNotificationMessage();
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      <span>{message}</span>
    </div>
  )
}

export default Notification
