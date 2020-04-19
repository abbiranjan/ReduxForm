
/**You Tube video link */
/** https://www.youtube.com/watch?v=itlSR3hm5AM */


import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form';

/** const renderField = (field) => (
    <div className="input-row">
      <input {...field.input} type="text"/>
      {field.meta.touched && field.meta.error &&
       <span className="error">{field.meta.error}</span>}
    </div>
  ) */

/** Modified version */
/** Here we are destructuring input and meta which also contains touched and error from field to make it simpler */
const renderField = ({input, label, id, type, meta: {touched, error}}) => (
    <div className="input-row">
      <label htmlFor={id}>{label}</label>
      <br/>
      <input {...input} type={type} id={id} />
      {touched && error &&
       <span className="error">{error}</span>}
    </div>
  )
let ContactForm = ({handleSubmit}) => {
  //const { handleSubmit } = props
  const submit = ({firstName='', lastName='', email=''}) => { /** setting default value to empty string is case values comes undefined */
      let error={};
      let isError = false;
      if(firstName.trim() === ''){
        error.firstName = 'Required';
        isError = true;
      }
      if(lastName.trim() === ''){
        error.lastName = 'Required';
        isError = true;
      }
      if(email.trim() === ''){
        error.email = 'Required';
        isError = true;
      }
      if(isError){
          throw new SubmissionError(error);
      }
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <Field name="firstName" label='First Name' id='first_name' component={renderField} type="text" />
      </div>
      <div>
        <Field name="lastName" label='Last Name' id='last_name' component={renderField} type="text" />
      </div>
      <div>
        <Field name="email" label='Email' id='email' component={renderField} type="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

ContactForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactForm)

export default ContactForm