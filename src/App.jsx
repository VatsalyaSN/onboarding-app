import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import OnboardingPage from './pages/OnboardingPage/OnboardingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <OnboardingPage />
    </div>
  )
}

export default App
