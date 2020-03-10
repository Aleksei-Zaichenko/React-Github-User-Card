import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount(){
    axios
      .get('https://api.github.com/users/Aleksei-Zaichenko')
      .then(res =>{
        console.log('res',res.data)
        this.setState({
          user: res.data
        })
        
      })
      .catch(err => console.log(err.message))
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            I decided to keep React logo
          </p>
        </header>

      </div>
    );
  }
}

export default App;
