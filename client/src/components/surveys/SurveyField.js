// SurveyField contains logic to render a single
// label and text input
import React from 'react';

function SurveyField({ input, label }) {
  return (
    <div>
      <label>{ label }</label>
      <input {...input} />
    </div>
  );
}

export default SurveyField;