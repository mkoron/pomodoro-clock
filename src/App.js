import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      lastTimestamp: 25
    }

    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.reset = this.reset.bind(this);
    this.start = this.start.bind(this);
  }

  incrementSession() {
    if (!this.valueInRange(this.state.session + 1)) return;

    this.setState( (prevState) => {
      return {
        session: prevState.session + 1
      }
    });
  }

  decrementSession() {
    if (!this.valueInRange(this.state.session - 1)) return;

    this.setState( (prevState) => {
      return {
        session: prevState.session - 1
      }
    });
  }

  incrementBreak() {
    if (!this.valueInRange(this.state.break + 1)) return;

    this.setState( (prevState) => {
      return {
        break: prevState.break + 1
      }
    });
  }

  decrementBreak() {
    if (!this.valueInRange(this.state.break - 1)) return;

    this.setState( (prevState) => {
      return {
        break: prevState.break - 1
      }
    });
  }

  valueInRange(value) {
    return value >= 1 && value <= 60 ? true : false; 
  }

  reset() {
    this.setState({
      break: 5,
      session: 25
    });
  }

  start() {
    setInterval(this.updateTimeRemaining, 1000);
  }

  updateTimeRemaining() {
    const millisNow = new Date().getTime();
    const elapsedMillis = millisNow - this.state.lastTimestamp;
    //const updatedTimeRemaining = this.state.timeRemaining - elapsedMillis;
   
    this.setState({ lastTimestamp: millisNow });
  }

  render() {
    return (
      <div className="App">
        <div className="title">Pomodoro Clock</div>
        <Timer start={ this.start } reset={ this.reset } lastTimestamp={ this.state.lastTimestamp } />
        <Session time={ this.state.session } incrementSession={ this.incrementSession } 
          decrementSession={ this.decrementSession } />
        <Break time={ this.state.break } incrementBreak={ this.incrementBreak } 
        decrementBreak={ this.decrementBreak }/>
      </div>
    );
  }
}

const Session = (props) => (
  <div>
    <div id="session-label">Session Length</div>
    <div id="session-length">{ props.time }</div>
    <button id="session-increment" className="btn-floating btn-medium waves-effect waves-light red" 
      onClick={ props.incrementSession }><i className="material-icons">add</i></button>
    <button id="session-decrement" className="btn-floating btn-medium waves-effect waves-light red" 
      onClick={ props.decrementSession }><i className="material-icons">remove</i></button>
  </div>
);

const Break = (props) => (
  <div>
    <div id="break-label">Break Length</div>
    <div id="break-length">{ props.time }</div>
    <button id="break-increment" className="btn-floating btn-medium waves-effect waves-light red" 
      onClick={ props.incrementBreak }><i className="material-icons">add</i></button>
    <button id="break-decrement" className="btn-floating btn-medium waves-effect waves-light red" 
      onClick={ props.decrementBreak }><i className="material-icons">remove</i></button>
  </div>
);

const Timer = (props) => (
  <div>
    <div id="timer-label">Session</div>
    <div id="time-left">{ props.lastTimestamp }</div>
    <button id="start_stop" className="waves-effect waves-light btn green darken-2" 
      onClick={ props.start }>Start</button>
    <button id="reset" className="waves-effect waves-light btn" 
      onClick={ props.reset }>Reset</button>
  </div>
);

export default App;
