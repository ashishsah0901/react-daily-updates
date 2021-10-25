import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

export default class App extends Component {
  pageSize = 6
  apiKey = process.env.REACT_APP_API_KEY

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            color="red"
            progress={this.state.progress} />
          <Navbar />
          <Switch>
            <Route exact path="/"><News setProgress={this.setProgress} key="general" pageSize={this.pageSize} apiKey={this.apiKey} country="in" categopageSize={this.pageSize} ry="general" /></Route>
            <Route exact path="/business"><News setProgress={this.setProgress} key="business" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="business" /></Route>
            <Route exact path="/entertainment"><News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="entertainment" /></Route>
            <Route exact path="/health"><News setProgress={this.setProgress} key="health" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="health" /></Route>
            <Route exact path="/science"><News setProgress={this.setProgress} key="science" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="science" /></Route>
            <Route exact path="/sports"><News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="sports" /></Route>
            <Route exact path="/technology"><News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="technology" /></Route>
          </Switch>

        </Router>
      </div>
    )
  }
}