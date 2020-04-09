import React, { Component } from 'react'

export default class Time extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    }
    this.updateTime = this.updateTime.bind(this);
  };

  //UPDATE THE STATE TIME TO THE CURRENT TIME
  updateTime = () => {
    this.setState({
      time: new Date()
    })
  }

  //SET ONE SECOND INTEVAL TO SET STATE TO CURRENT TIME
  componentDidMount() {
    this.timerId = setInterval(() => { this.updateTime() }, 1000)
  }

  //CLEAR THE INITIAL SET STATE CALLED INTERVALLY TO AVOID RECURSSION
  componentWillUnmount() {
    clearInterval(this.timerId)
  }


  render() {
    return (
      <div className="clock">
        {this.state.time.toLocaleTimeString()}
      </div>
    )
  }
}
