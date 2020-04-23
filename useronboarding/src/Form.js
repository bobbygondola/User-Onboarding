import React from 'react';

function Form(props) {
    const {
        values,
        onInputChange,
        onCheckboxChange,
        onSubmit,
        disabled,
        errors,
      } = props

    return (
      <div className="FormContainer">
        <form onSubmit={onSubmit} >

        <div className='errors'>
        {errors.name}
        {errors.email}
        {errors.password}
        {errors.termsOfService}

      </div>
            
        {/* USERNAME FIELD */}
            <label>Username:
        <input
          value={values.name}
          onChange={onInputChange}
          
          name='name'
          type='text'
        /></label>


        <br></br>


        {/* //EMAIL FIELD */}
        <label>Email:
        <input
          value={values.email}
          onChange={onInputChange}
          name='email'
          type='text'
        /></label>


        <br></br>


        {/* PASSWORD FIELD */}
        <label>Password:
      <input
          value={values.password}
          onChange={onInputChange}
          name='password'
          type='password'
        /></label>


        <br></br>


        {/* TERMS OF SERVICE FIELD */}
        <label>Terms of Service
           <label> <input type="radio" value="Agree"/> Agree</label>
        </label>

        <br></br>

        <button onClick={onSubmit} >Submit</button>
        </form>
      </div>
    );
  }
  
  export default Form;