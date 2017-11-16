import React, { Component } from 'react';
import InputTemplate from './input_template';

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            first: '',
            last: '',
            email: '',
            password: '',
            confirmPassword: '',
            signedUp: false
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.isPasswordMatch = this.isPasswordMatch.bind(this);
    }

    onFormSubmit(event){
        event.preventDefault();
        var allGood = this.validateEmail(this.state.email) 
            && (this.refs.first.isValid())
            && (this.refs.last.isValid())
            && this.refs.password.isValid()
            && this.refs.confirm.isValid();

        if(allGood) {
            var data = {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email
            }
            this.setState({
                signedUp: true
            });
        } else {
            this.refs.first.isValid();
            this.refs.last.isValid();
            this.refs.email.isValid();
            this.refs.password.isValid();
            this.refs.confirm.isValid();
        }
    }

    onFirstNameChange(event){
        this.setState({ first: event.target.value });
    }

    onLastNameChange(event){
        this.setState({ last: event.target.value });
    }

    onEmailChange(event){
        this.setState({ email: event.target.value });
    }

    onPasswordChange(event){
        this.setState({ password: event.target.value });
    }

    onConfirmPasswordChange(event){
        this.setState({ confirmPassword: event.target.value });
    }

    validateEmail(event) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(event);
    }

    isPasswordMatch(event) {
        return (event===this.state.password);
    }

    isIllegalCharacter(event) {
        var result = true;
        if(/[~`!#$%\^&*+=\-\[\]\\;,/{}|\\":<>\?]/g.test(event) || event===''){
            result=false;
        }
        return result;
    }


    render() {
       
        if(this.state.signedUp) {
            return(
                <div className="successful-signup">
                    <h1>Thanks for joining {this.state.first}!</h1>
                    <p>
                        Keep an eye out for our email to verify your account!
                    </p>
                </div>
                
            )
        }else {
            return(
                <div className="signup-div">
                    <h1>Create An Account</h1>
                    <p>Register for a faster and easier checkout experience.</p>
                    <form onSubmit={this.onFormSubmit} className="input-form">
                        <InputTemplate 
                            placeholder="First name"
                            ref="first"
                            type="text"
                            value={this.state.first}
                            onChange={this.onFirstNameChange}
                            validate={this.isIllegalCharacter}
                            errorMessage="Invalid character used"
                            emptyMessage="First name can not be empty"
                        />
                        <InputTemplate 
                            placeholder="Last name"
                            ref="last"
                            type="text"
                            value={this.state.last}
                            onChange={this.onLastNameChange}
                            validate={this.isIllegalCharacter}
                            errorMessage="Invalid character used"
                            emptyMessage="Last name can not be empty"
                        />
                        <InputTemplate 
                            placeholder="Email address"
                            ref="email"
                            type="text"
                            value={this.state.email}
                            onChange={this.onEmailChange}
                            validate={this.validateEmail}
                            errorMessage="Invalid email"
                            emptyMessage="Email can not be empty"
                        />
                        <InputTemplate 
                            placeholder="Password"
                            ref="password"
                            type="password"
                            requirements="true"
                            requiredLength="8"
                            requiredCapitals="1"
                            requiredLower="1"
                            requiredNumbers="1"
                            requiredSymbols="1"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                            errorMessage="Invalid password"
                            emptyMessage="Password must be set"
                        />
                        <InputTemplate 
                            placeholder="Confirm password"
                            ref="confirm"
                            type="password"
                            value={this.state.confirmPassword}
                            onChange={this.onConfirmPasswordChange}
                            validate={this.isPasswordMatch}
                            errorMessage="Passwords do not match"
                            emptyMessage="Need to confirm password"
                        />
                        <button type="submit" className="btn btn-secondary">Next</button>
                    </form>
                </div>
            );
        }
    }
}

export default SignUpForm;