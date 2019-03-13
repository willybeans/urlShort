import React from 'react';
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ShortenedOutput = (props) => {
  return (
    <div className="ShortenedOutput row">
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

ShortenedOutput.propTypes = {
  shortUrl: PropTypes.string.isRequired,
  handleClickCopy: PropTypes.func.isRequired
}

export default ShortenedOutput;
