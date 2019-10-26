import React, { Component } from 'react';
import {HEADER, ALERT} from './AppStyle'
import { Provider } from "react-redux";
import store from "./store";
import UserRegistrationForm from "./userRegistrationForm";

class App extends Component {
  state={
    MANDATORY_FIELD:[],
    USER_TYPES:[],
    loading:false,
    successResponse:null
  }
  componentDidMount() {
    this.getUserTypes()
      .then(res => {
        const {mandatory_fields, user_types} =res.ui_definition
        this.setState({loading:true, MANDATORY_FIELD:mandatory_fields, USER_TYPES:user_types})
      })
      .catch(err => console.error(err));
  }

  getUserTypes = async () => {
    const response = await fetch('/v1/reference_data');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  submitResponse= async data => {
    const response = await fetch('/v1/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const body = await response.text();
    this.setState({successResponse:body})
  };
  
  showResults=(response)=>{
    this.submitResponse(response)
  }
  render() {
    const {USER_TYPES, MANDATORY_FIELD, loading, successResponse} = this.state
    return (
      <Provider store={store}>
        <div>
          <HEADER>User resgistration Demo</HEADER>
          {loading && !successResponse &&
          <UserRegistrationForm submitHandler={this.showResults} mandatoryFields={MANDATORY_FIELD} userTypes={USER_TYPES}/>}
          {successResponse && <ALERT>
                                <strong>Your details has been submitted!! </strong> .
                                <p><strong>{successResponse}</strong></p>
                              </ALERT>}
        </div>
      </Provider>
    );
  }
}

export default App;