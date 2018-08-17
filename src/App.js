import React, { Component } from 'react';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      shortUrl: 'Shortened Url',
      copied: false
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
    let trimUrl = /(http)?s?:?(\/?\/?)?(www\.)?(.*)/;
    let splitUrlBody = this.state.url.split(trimUrl);

    const userUrl = {
      url: splitUrlBody[4]
    };
    axios.post('/api/shorturl/new',userUrl)
      .then(res => {
        this.setState({
          shortUrl: window.location.href + 'api/' + res.data.url.shortName
        });
      })
      .catch(e => console.log(e));
  }

  handleClick = () => {
    this.setState({copied: true});
    setTimeout( () => {
      this.setState({
        copied: false
      });
    }, 5000);
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
            copied={this.state.copied}
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
        <CopyToClipboard text={props.shortUrl}
          onCopy={props.handleClick}>
          <button>Copy to clipboard with button</button>
        </CopyToClipboard>
        {props.copied ? <div style={{color:'red'}}>Copied</div>:null}
      </div>
    </div>
  );
};

export default App;
