import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      shortUrl: 'Shortened Url'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    alert('click');
    console.log('click;');
  }

  render() {

    return (
      <div className="container">
        <div className="form top">
            <FormField />
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
    <form>
      <label>
        Name:
        <input type="text" name="name" />
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
