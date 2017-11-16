import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SignUpForm from './components/signup_form';

class Signup extends Component {
    constructor(props){
        super(props);

        this.state = { 
            videos: [], 
            selectedVideo: null
        };

    }

    render(){

        return (
            <SignUpForm />
        );
    }
}

ReactDOM.render(<Signup />, document.querySelector('.signup-area'));