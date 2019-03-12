import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//import { CopyToClipboard } from 'react-copy-to-clipboard';
import FormField from './components/FormField';
import ShortenedOutput from './components/ShortenedOutput';

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
      <div className="MainApp container-fluid text-center justify-content-center">
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

App.propTypes = {
  url: PropTypes.string,
  shortUrl: PropTypes.string,
  copied: PropTypes.bool,
  displayBottom: PropTypes.bool
}

export default App;
