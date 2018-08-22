import React, { Component } from 'react';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      shortUrl: '',
      copied: false,
      displayBottom: false
    };
    this.handleClickCopy = this.handleClickCopy.bind(this);
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
        let newUrlState = '';
        if(res.data.url.errno === 'ENOTFOUND') {
          newUrlState = 'ERROR: ' + res.data.url.hostname + ' not responsive';
        } else {
          newUrlState = window.location.href + 'api/' + res.data.url.shortName;
        }
        this.setState({
          shortUrl: newUrlState,
          displayBottom: true
        });
      })
      .catch(e => console.log(e));
  }

  handleClickCopy = () => {
    this.setState({copied: true});
    setTimeout( () => {
      this.setState({copied: false});
    }, 5000);
  }

  render() {

    return (
      <div className="container-fluid text-center justify-content-center">
        <div className="banner"><h1>URL Shortener</h1></div>
        <div className="row top justify-content-center">
          <FormField
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
        <div className="row bottom justify-content-center">
          {
            this.state.displayBottom ?
              <ShortenedOutput
                shortUrl={this.state.shortUrl}
                handleClickCopy={this.handleClickCopy}
                copied={this.state.copied}
              />
              : null
          }
        </div>
      </div>

    );
  }
}

const FormField = (props) => {
  return (
    <div className="form-group inner formField">
      <form onSubmit={props.handleSubmit}>
        <label className="mr-3">Insert Your Url:</label>
        <input type="text" name="id" onChange={props.handleChange} />
        <input className="btn btn-info" type="submit" value="Submit" />
      </form>
    </div>
  );
};

const ShortenedOutput = (props) => {
  return (
    <div className="row">
      <div className="col formp-group inner copyLink ">
        <div className="copyLink-left">
          <a href={props.shortUrl}>{props.shortUrl}</a>
        </div>
      </div>

      <div className="col copyLink-right">
        <CopyToClipboard text={props.shortUrl}
          onCopy={props.handleClickCopy}>
          <button className="btn btn-info">Copy</button>
        </CopyToClipboard>
        {props.copied ? <div style={{color:'red'}}>Copied</div>:null}
      </div>
    </div>
  );
};

export default App;
