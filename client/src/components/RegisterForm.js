import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import axios from 'axios'

import '../styles/Form.css'
import '../styles/RegisterForm.css'
import { register } from '../actions'

const renderError = ({error, touched }) => {
    if(touched && error) {
        return (
            <div className="input__error-message">{error}</div>
        );
    }
}

const renderInput = ({ input, type, input_icon, placeholder, meta }) => {
    return (
        <div className="input-block">
            <div className="input-wrap">
                <div className={`icon ${input_icon} invert`}></div>
                    <input 
                        {...input} 
                        type={type} 
                        placeholder={placeholder}
                    />
                </div>
                {renderError(meta)}
        </div>
    );
}

const validate = formValues => {
    const errors = {};

    if(!formValues.username) {
        errors.username = 'You must enter your name';
    }

    if(!formValues.login) {
        errors.login = 'You must enter a login';
    }

    if(!formValues.email) {
        errors.email = 'You must enter your email';
    }

    if(!formValues.password) {
        errors.password = "You must enter a password";
    }

    if(!formValues.repeatPassword) {
        errors.repeatPassword = "You must enter repeat password";
    }

    if(formValues.password !== formValues.repeatPassword) {
        errors.password = "Passwords must be equals";
        errors.repeatPassword = "Passwords must be equals";
    }

    return errors;
}

const RegisterForm = (props) => {

    const onRegisterSubmit = (formValues) => {
        //props.register(formValues);
        console.log("SUBMIT");
        const res = axios.post('/user/register', formValues);
    }

    return (
        <div className="scroll">
            <form onSubmit={props.handleSubmit(onRegisterSubmit)} action="/user/register" method="post">
                <div className="form reg-form">
                    <div className="row">
                        <div className="action__title unselectable">Join with</div>
                        <div className="actions__block">
                            <a href="/auth/google" className="action">
                                <div className="icon google-logo" />
                            </a>
                            <a href="/auth/facebook" className="action">
                                <div className="icon facebook-logo" />
                            </a>
                        </div>
                    </div>

                    <div className="row">
                        <div className="action__title action__title--main unselectable">Create account</div>
                    </div>

                    <div className="row">
                        <Field 
                            component={renderInput} 
                            name="username"
                            type="text"
                            placeholder="Name"
                            input_icon="profile"
                        />
                    </div>

                    <div className="row">
                        <Field 
                            component={renderInput} 
                            name="login"
                            type="text"
                            placeholder="Login"
                            input_icon="profile"
                        />
                    </div>

                    <div className="row">
                        <Field 
                            component={renderInput} 
                            name="email" 
                            type="text" 
                            placeholder="Email"
                            input_icon="email"
                        />
                    </div>

                    <div className="row">
                        <Field 
                            component={renderInput} 
                            name="password" 
                            type="password" 
                            placeholder="Password"
                            input_icon="lock"
                        />
                    </div>

                    <div className="row">
                        <Field 
                            component={renderInput} 
                            name="repeatPassword" 
                            type="password" 
                            placeholder="Reapeat password"
                            input_icon="lock"
                        />
                    </div>

                    <div className="row">
                        <button 
                            className="action__button action__button-register action__button--main"
                        >
                            Register
                        </button>
                    </div>

                    <div className="row">
                        <button className="action__button action__button-auth action__button-child">Sign in</button>
                    </div>
                    
                </div>
            </form>
        </div>
    );
}

export default connect(null, { register })(reduxForm({
    form: 'registerForm',
    validate
})(RegisterForm));