//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import logo from "./logo.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    logo,
    clickedLogo: [],
    score: 0
  };

//when you click on a card the logo is taken out of the array
  imageClick = event => {
    const currentLogo = event.target.alt;
    const LogoAlreadyClicked =
      this.state.clickedLogo.indexOf(currentLogo) > -1;

//if you click on a logo that has already been selected, the game is reset and cards reordered
    if (LogoAlreadyClicked) {
      this.setState({
        logo: this.state.logo.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedLogo: [],
        score: 0
      });
        alert("You already clicked that! You lose. Play again?");

//if you click on an available logo, your score is increased and cards reordered
    } else {
      this.setState(
        {
          logo: this.state.logo.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedLogo: this.state.clickedLogo.concat(
            currentLogo
          ),
          score: this.state.score + 1
        },
//if you get all 12 logo corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Nice job! You Win!");
            this.setState({
              logo: this.state.logo.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedLogo: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.logo.map(logo => (
            <FriendCard
              imageClick={this.imageClick}
              id={logo.id}
              key={logo.id}
              image={logo.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;