import { computeHeadingLevel } from '@testing-library/react'
import CounterContext, {CounterContextProvider} from './CounterContext'
import {Display, Button} from './components/misc'



// const App = () => {
//   const [counter, counterDispatch] = useReducer(counterReducer, 0)

//   return (
//     <div>
//       <div>{counter}</div>
//       <div>
//         <button onClick={() => counterDispatch({ type: "INC"})}>+</button>
//         <button onClick={() => counterDispatch({ type: "DEC"})}>-</button>
//         <button onClick={() => counterDispatch({ type: "ZERO"})}>0</button>
//       </div>
//     </div>
//   )
// }



const App = () => {


  // return (
  //   <CounterContext.Provider value={[counter, counterDispatch]}>
  //     <Display counter={counter}/>
  //     <div>
  //       <Button type='INC' label='+' />
  //       <Button type='DEC' label='-' />
  //       <Button type='ZERO' label='0' />
  //     </div>
  //   </CounterContext.Provider>
  // )
  return (
    <div>
      <Display />
        <div>
          <Button type='INC' label='+' />
          <Button type='DEC' label='-' />
          <Button type='ZERO' label='0' />
        </div>
    </div>
  )
};

export default App