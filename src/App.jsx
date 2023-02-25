import { useState } from 'react'
import QuizicalApp from './components/QuizicalApp'

function App() {
  const [count, setCount] = useState(0)

  return (
   <QuizicalApp/>
  )
}

export default App
