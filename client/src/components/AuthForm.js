import React from 'react'
import { Field, reduxForm } from 'redux-form'

import '../styles/Form.css'
import '../styles/AuthForm.css'

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

    if(!formValues.login) {
        errors.login = 'You must enter a login';
    }

    if(!formValues.password) {
        errors.password = "You must enter a password"
    }

    return errors;
}

const AuthForm = (props) => {

    const onAuthSubmit = (formValues) => {
        console.log(formValues)
        
    }

    return (
        <form onSubmit={props.handleSubmit(onAuthSubmit)} action="http://localhost:5000/auth" method="post">
            <div className="form auth-form">
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
                        name="password" 
                        type="password" 
                        placeholder="Password"
                        input_icon="lock"
                    />
                </div>

                <div className="row">
                    <button className="action__button action__button-auth">Sign in</button>
                </div>

                <div className="row">
                    <span>OR</span>
                </div>

                <div className="row">
                    <div className="actions__block">
                        <a href="/auth/google" className="action">
                            <div className="icon google-logo" />
                        </a>
                        <a href="/auth/facebook" className="action">
                            <div className="icon facebook-logo" />
                        </a>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'authForm',
    validate
})(AuthForm);