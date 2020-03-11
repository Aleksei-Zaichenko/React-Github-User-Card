import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      cards: [],
      username: ''
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

handleChange =e =>{
  this.setState({
    username: e.target.value
  })
}

  render(){
    return (
      <div className="App">
        <div className="container">

          <input value ={this.state.username} onChange={this.handleChange}/>

          <div className="cards">
            {
              this.state.cards.map(account =>(
                <div className ="card" key={account.id}>
                  <img src={account.avatar_url} alt ="image of the person"/>
                  <h3>Name: {account.name}</h3>
                  <div className ="info">
                    <p>Username: {account.login}</p>
                    <p>Followers: {account.followers}</p>
                    <p>Following: {account.following}</p>
                    <p>Link to Github: <a href={account.html_url}>{account.html_url}</a></p>
                    <p>Biography: {account.bio}</p>
                  </div>
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
