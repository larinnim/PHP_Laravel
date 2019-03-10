import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Home extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {isToggleOn: true};
    //     // This binding is necessary to make `this` work in the callback
    //      this.handleClick = this.handleClick.bind(this);
    //   }

    state = {
        isToggleOn: true
    };  
      handleClick() {
        setState(state => ({
          isToggleOn: !state.isToggleOn
        }));
      }

      render() {
        return (
          <button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'ON' : 'OFF'}
          </button>
        );
      } 
}
// ReactDOM.render(
//     <Home />,
//     document.getElementById('root')
// );
    