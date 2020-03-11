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
            res.data.forEach(item => {
              axios
                .get(item.url)
                .then( response =>{
                  this.setState({
                    cards: [...this.state.cards, response.data]
                  })
          })
        })
          .catch(err => console.log(err.message))
      })
      .catch(err => console.log(err.message))
  })
}

  render(){
    return (
      console.log('cards', this.state.cards),
      <div className="App">
        <div className="container">
          <div className="cards">
            {
              this.state.cards.map(account =>(
                <div className ="card">
                  <img src={account.avatar_url} />
                  <h3>{account.name}</h3>
                  <p>{account.login}</p>
                  <p>Followers: {account.followers}</p>
                  <p>Following: {account.following}</p>
                  <p>Link to Github: {account.url}</p>
                  <p>Biography: {account.bio}</p>
                </div>
              ))
            }
          </div>{/*cards*/}
        </div>{/*container*/}
      </div>
    );
  }
}

export default App;
