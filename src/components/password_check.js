import React, { Component } from 'react';
import IconSwitch from './icons';
import ClassName from 'classnames';


class PasswordCheck extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: this.props.value,
            requiredLength: this.props.requiredLength,
            requiredCapitals: this.props.requiredCapitals,
            requiredLower: this.props.requiredLower,
            requiredNumbers: this.props.requiredNumbers,
            requiredSymbols: this.props.requiredSymbols,
            name: this.props.name
        };
    }

    validatorTitle(){
        if(this.props.valid && this.props.value !== '') {
            return(
                <h4 className="validator_title valid">
                    {this.props.name} IS OK
                </h4>
            );
        } else {
            return( 
                <h4 className="validator_title invalid">
                    {this.props.name} RULES
                </h4>
            );
        }
    }
    
    render(){
        var validatorClass = ClassName({
            'password_validator':   true,
            'visible':              this.props.visible,
            'invisible':            !this.props.visible
        });

        

        return (
            <div className={validatorClass}>
            <div className="validator_container">

                {this.validatorTitle()}

                <ul className="rules_list">
            
                <li className={ClassName({'valid': this.props.validData.minChars})}> 
                    <i className="icon_valid"> <IconSwitch type="circle_tick_filled"/> </i>
                    <i className="icon_invalid"> <IconSwitch type="circle_error"/> </i>
                    <span className="error_message">{this.state.requiredLength} characters minimum</span>
                </li>

                <li className={ClassName({'valid': this.props.validData.mixLetters})}> 
                    <i className="icon_valid"> <IconSwitch type="circle_tick_filled"/> </i>
                    <i className="icon_invalid"> <IconSwitch type="circle_error"/> </i>
                    <span className="error_message">Contains at least {this.state.requiredCapitals} uppercase letter and {this.state.requiredLower} lowercase letter</span>
                </li>

                <li className={ClassName({'valid': this.props.validData.numbers})}> 
                    <i className="icon_valid"> <IconSwitch type="circle_tick_filled"/> </i>
                    <i className="icon_invalid"> <IconSwitch type="circle_error"/> </i>
                    <span className="error_message">Contains at least {this.state.requiredNumbers} number</span>
                </li>

                <li className={ClassName({'valid': this.props.validData.symbols})}> 
                    <i className="icon_valid"> <IconSwitch type="circle_tick_filled"/> </i>
                    <i className="icon_invalid"> <IconSwitch type="circle_error"/> </i>
                    <span className="error_message">Contains at least {this.state.requiredSymbols} special symbol</span>
                </li>
                </ul>
            </div>
            </div>
        );
    }
}

export default PasswordCheck;