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
    axios.post('/api/shorturl/new',test)
      .then(res => {
        var test = JSON.stringify(res);
        var testdata = test.data;
        console.log("res.data " + JSON.stringify(res.data)); //undefined with familiar
        console.log("res.data " + JSON.stringify(res.config.data));//is this old data?
        console.log("res.data.data " + JSON.stringify(res.config));
        console.log("status: " + res.status);
        console.log("status: " + JSON.stringify(res.status));

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
