import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  state = {
    apiResponse: ""
  }

  // class component
  callAPI = async () => {
    const response = await fetch('http://localhost:5000/', {method: 'get', mode: "cors"})
    const json = await response.json()
    this.setState({
      status: json.status,
      apiResponse: json.message
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.apiResponse || 'No Response'}
          </p>
          <button onClick={this.callAPI}>Check API</button>
      </header>
    </div>
    )
  }
}


export default App;
