import { useContext } from 'react'
import {useCounterDispatch, useCounterValue} from '../CounterContext'

export const Display = () => {
  // const [counter, dispatch] = useContext(CounterContext)
  const counter = useCounterValue();
  return <div>
    {counter}
  </div>
}

export const Button = ({ type, label }) => {
  // const [counter, dispatch] = useContext(CounterContext)
  const dispatch = useCounterDispatch();
  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}