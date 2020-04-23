import React, { useState } from "react";
import Form from "./Form";
import "./App.css";


import * as yup from "yup";
import axios from "axios";

const url = "https://reqres.in/api/users";

//default Onboarding list
const memberList = [
  {
    name: "Bobby",
    email: "Bobby@LambdaSchool.com",
    password: "chickenpox",
    termsOfService: "Agree",
  },
];

//Setting the inital empty form values
const initialFormValues = {
  //text inputs
  name: "",
  email: "",
  password: "",
  //checkbox
  termsOfService: "",
};

//the shape of the validation errors object
const initialFormErrors = {
  name: "",
  email: "",
  password: "",
  termsOfService: "",
};

// creating schema for validation
const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "username must have atleast 3 characters you goon!")
    .required("username is required bro!"),
  email: yup
    .string()
    .email("a valid email is required brosepf!")
    .required("must input an email"),
  password: yup
    .string()
    .min(5, "must input 5 characters at least!")
    .required("password is required"),
  termsOfService: yup
    .string()
    .matches(/(Agree|Agree)/, 'Please Agree to the Terms')
    .required('Terms are Required..bro')
});

////////////////////////////////////////////////////////////////////////

function App() {
  //member list set to state
  const [members, setMembers] = useState(memberList);
  //form values set to state
  const [formValues, setFormValues] = useState(initialFormValues);
  //errors section
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  //input change
  const onInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    // set a new state for the whole form
    setFormValues({ ...formValues, [name]: value });

    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        // yoohoo, validates :)
        // CLEAR ERROR
        setFormErrors({
          ...formErrors,
          [name]: '',
        })
      })
      .catch(err => {
        // dangit, does not validate :(
        // SET THE ERROR IN THE RIGHT PLACE
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })
  };

  // onSubmit function
  const onSubmit = (evt) => {
    // don't allow the browser to reload!

    evt.preventDefault();

    const newMember = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
    };

    newData(newMember);
    setFormValues(initialFormValues);
  };

  const newData = (member) => {
    axios
      .post(url, member)
      .then((res) => {
        console.log(res.data);
        // setFormValues(res.data)
        setMembers([...members, res.data]);
      })
      .catch((err) => {
        debugger;
      });
  };

  console.log(members);
  return (
    <div className="App">
      <div>
      <h1>Onboarding Form</h1>
      <p>Welcome Aboard, Sign up for the chance to join our once in a lifetime coding team.
        <br></br>
        To join the team, you must pass the tests of inputting some data..
        <br></br>
        only then may you have a chance..
        <br></br>
        maybe.
      </p>
      </div>

      
      {members.map((member) => {
        console.log(members)
      
        return (
        <div key={member.name} id="card">
          
          <p>Name: {member.name}</p>
          <p>Email: {member.email}</p>
        <p>Password: {member.password}</p>
        <p>Terms of Service: {member.termsOfService}</p>
        
        </div>)
      })}

      <Form
        //props that we need to come back to
        values={formValues}
        onInputChange={onInputChange}
        // onCheckboxChange={onCheckboxChange}
        onSubmit={onSubmit}
        errors={formErrors}
      />
    </div>
  );
}

export default App;
