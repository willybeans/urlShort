import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      shortUrl: 'Shortened Url'
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({url: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    const test = {
      url: this.state.url
    };
    axios.post('/api/hello',test)
      .then(res => {
        console.log("res: " + res);
        console.log("res.data: " + res.data );
      })
      .catch(e => console.log(e));
  }

  handleClick = e => {
    e.preventDefault();
    alert('click');
    console.log('click;');
  }

  render() {

    return (
      <div className="container">
        <div className="form top">
            <FormField
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </div>
          <div className="form bottom">
            <ShortenedOutput
              shortUrl={this.state.shortUrl}
              handleClick={this.handleClick}
            />
         </div>
      </div>
    )
  }
};

const FormField = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <label>
        Insert Your Url:
        <input type="text" name="id" onChange={props.handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

const ShortenedOutput = (props) => {
  return (
    <div>
      <div> {props.shortUrl} </div>
      <button onClick={props.handleClick}>
        Copy Link
      </button>
    </div>
  )
}

export default App;
