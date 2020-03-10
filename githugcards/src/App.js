import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import GithubCard from './components/GithubCard';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      cards: []
    };
  }

  componentDidMount(){
    axios
      .get('https://api.github.com/users/Aleksei-Zaichenko')
      .then(res =>{
        this.setState({
          cards: [...this.state.cards,res.data]
        })
        axios
          .get('https://api.github.com/users/Aleksei-Zaichenko/followers')
          .then(res =>{
            this.setState({
              cards: [...this.state.cards, ...res.data]
          })
          console.log('cards', this.state.cards)
        })
          .catch(err => console.log(err.message))
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
        <div className="container">
          <div className="cards">

          </div>{/*cards*/}
        </div>{/*container*/}
      </div>
    );
  }
}

export default App;
