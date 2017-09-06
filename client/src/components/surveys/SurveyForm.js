import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'emails' }
];

class SurveyForm extends Component {

  renderFields() {
    return FIELDS.map(({ label, name }, i) => {
      return <Field key={i} component={SurveyField} type='text' label={ label } name={ name }/>
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Link to={'/surveys'} className='red btn-flat left white-text' type='submit'>
            Cancel 
            <i className='material-icons right'>done</i>
          </Link>
          <button className='teal btn-flat right white-text' type='submit'>
            Next
            <i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    );
  }
}


export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);