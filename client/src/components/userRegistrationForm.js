import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {FORM_CONATINER, FORM, RADIO_LABEL, SUBMIT_CONTAINER, FORM_FIELD_WRAPPER} from './userRegistrationFormStyle'

const renderField = ({ input, label, type, userOptions, maxLength,  meta: { touched, error, warning } }) => { 
  const inputType = <input {...input} placeholder={label} type={type} className="form-control" maxLength={maxLength} />
  const textareaType = <textarea {...input} placeholder={label} type={type} rows="5" className="form-control" maxLength={maxLength}/>
  const select = <select {...input} placeholder={label} type={type} className="form-control">
            {userOptions && userOptions.map(item=> <option key={item.key} value={item.value}>{item.value}</option>)}
  </select>
  const radio = 
  <div><RADIO_LABEL htmlFor="yesBuyer" className="pr-1">
              <Field name="first_home_buyer" id="yesBuyer" component="input" type="radio" value="Yes" />
              {' '}
              Yes
            </RADIO_LABEL>
            <RADIO_LABEL htmlFor="noBuyer">
              <Field name="first_home_buyer" id="noBuyer" component="input" type="radio" value="No" />
              {' '}
              No
            </RADIO_LABEL>
            </div>
    return (
      <div>
      <label className="control-label">{label}</label>
      <div>
        {type ==="textarea" ? textareaType : type ==="select" ? select: type ==="radio" ? radio: inputType}
        {error && <span className="text-danger">{error}</span>}
      </div>
    </div>
    )
}



const htmlEntities=(str) => String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/{/g, '&lcub;').replace(/}/g, '&rcub;').replace(/~/g, '&tilde;');


const userRegistrationForm = props => {
  const {handleSubmit, userTypes } = props;
  const submit=(values) =>{
    const {mandatoryFields} = props
    let errorList={}
    if(values.description && values.description.length<10){
        errorList.description='Must be 10 characters or more'
    }

    if (!values.name && mandatoryFields.includes("name")) {
      errorList.name ='This is a required field !!'
    } 
    if (!values.type && mandatoryFields.includes("type")) {
      errorList.type ='This is a required field !!'
    } 
    if (!values.first_home_buyer && mandatoryFields.includes("first_home_buyer")) {
      errorList.first_home_buyer ='This is a required field !!'
    } 
    if(Object.keys(errorList).length>0){
      throw new SubmissionError(errorList)
    } else{
      let encoded = htmlEntities(values.description)
      let response = values.description ? {...values, description:encoded}:{...values}
      props.submitHandler(response)
    }
  }
  return (
    <FORM_CONATINER>
    <FORM onSubmit={handleSubmit(submit)}>
    <div className="form-group">
        <Field name="name" component={renderField} label="Full Name" />
    </div>
    <div className="form-group">
        <Field name="type" type="select" component={renderField} userOptions={userTypes}label="User type"/>
    </div>
    <div className="form-group">
        <Field name="fullAddress" component={renderField} label="Full address" maxLength="50"/>
    </div>
    <div className="form-group">
        <Field name="description" type="textarea" component={renderField} label="Description" maxLength="200" />
    </div>
    <div className="form-group">
        <Field name="first_home_buyer" type="radio" component={renderField} label="First home buyer" />
    </div>
      <SUBMIT_CONTAINER>
        <button type="submit" className="btn btn-danger">Save</button>
      </SUBMIT_CONTAINER>
    </FORM>
    </FORM_CONATINER>
  );
};
export default reduxForm({
  form: 'userRegistrationForm'
})(userRegistrationForm);