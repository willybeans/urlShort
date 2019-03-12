import React from 'react';
import PropTypes from 'prop-types';

const FormField = (props) => {
  return (
    <div className="form-group inner FormField">
      <form onSubmit={props.handleSubmit}>
        <label className="mr-3">Insert Your Url:</label>
        <input type="text" name="id" onChange={props.handleChange} />
        <input className="btn btn-info" type="submit" value="Submit" />
      </form>
    </div>
  );
};

FormField.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default FormField;
