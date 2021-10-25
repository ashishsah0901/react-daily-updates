import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

const App = () => {
  const pageSize = 6
  const apiKey = process.env.REACT_APP_API_KEY

  const [darkMode, setDarkMode] = useState('light');
  const [progress, setProgress] = useState(0);

  const toggleMode = () => {
    if (darkMode === 'light') {
      setDarkMode('dark')
      document.body.style.backgroundColor = '#343a40'
    } else {
      setDarkMode('light')
      document.body.style.backgroundColor = 'white'
    }
  }

  return (
    <div>
      <Router>
        <LoadingBar
          color="red"
          progress={progress}
          height="1px" />
        <Navbar mode={darkMode} toggleDark={toggleMode} />
        <Switch>
          <Route exact path="/"><News mode={darkMode} setProgress={setProgress} key="general" pageSize={pageSize} apiKey={apiKey} country="in" categopageSize={pageSize} ry="general" /></Route>
          <Route exact path="/business"><News mode={darkMode} setProgress={setProgress} key="business" pageSize={pageSize} apiKey={apiKey} country="in" category="business" /></Route>
          <Route exact path="/entertainment"><News mode={darkMode} setProgress={setProgress} key="entertainment" pageSize={pageSize} apiKey={apiKey} country="in" category="entertainment" /></Route>
          <Route exact path="/health"><News mode={darkMode} setProgress={setProgress} key="health" pageSize={pageSize} apiKey={apiKey} country="in" category="health" /></Route>
          <Route exact path="/science"><News mode={darkMode} setProgress={setProgress} key="science" pageSize={pageSize} apiKey={apiKey} country="in" category="science" /></Route>
          <Route exact path="/sports"><News mode={darkMode} setProgress={setProgress} key="sports" pageSize={pageSize} apiKey={apiKey} country="in" category="sports" /></Route>
          <Route exact path="/technology"><News mode={darkMode} setProgress={setProgress} key="technology" pageSize={pageSize} apiKey={apiKey} country="in" category="technology" /></Route>
        </Switch>

      </Router>
    </div>
  )
}

export default App