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
    const userUrl = {
      url: this.state.url
    };
    axios.post('/api/shorturl/new',userUrl)
      .then(res => {
        var shortName = res.data.shortName;
        console.log('shortname : ' + shortName);
        console.log(window.location.href);
        console.log(Object.keys(res));
        console.log('url : ' + res.data.url.shortName);
        var test = JSON.stringify(res);
        var testdata = test.data;
        this.setState({
          shortUrl: window.location.href + 'api/' + res.data.url.shortName
        });
        // console.log("res.data " + JSON.stringify(res.data)); //undefined with familiar
        // console.log("res.data.shortName " + JSON.stringify(res.data.shortName)); //undefined with familiar
        // console.log("res.config.data " + JSON.stringify(res.config.data));//is this old data?
        // console.log("res.config " + JSON.stringify(res.config));
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
        <div className="banner">URL Shortener</div>
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
    );
  }
}

const FormField = (props) => {
  return (
    <div className="inner formField">
      <form onSubmit={props.handleSubmit}>
        <label>
          Insert Your Url:
          <input type="text" name="id" onChange={props.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

const ShortenedOutput = (props) => {
  return (
    <div className="inner copyLink row">
      <div className="copyLink-left">
        <a href={props.shortUrl}>{props.shortUrl}</a>
      </div>

      <div className="copyLink-right">
        <button onClick={props.handleClick}>
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default App;
