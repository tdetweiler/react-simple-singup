import React, { Component } from 'react';
import ErrorHandler from './error_handler';
import IconSwitch from './icons';
import PasswordCheck from './password_check';
import ClassName from 'classnames';

class InputTemplate extends Component {
    constructor(props){
        super(props);

        var valid = (this.props.isValid && this.props.isValid()) || true;

        this.state = { 
            value: this.props.value,
            empty: (this.props.value === ''),
            focus: false,
            iconsVisible: !this.props.validator,
            errorMessage: this.props.emptyMessage,
            validator: this.props.validator,
            checkerVisible: false,
            type: this.props.type,
            errorVisible: false,
            requiredLength: this.props.requiredLength,
            requiredCapitals: this.props.requiredCapitals,
            requiredLower: this.props.requiredLower,
            requiredNumbers: this.props.requiredNumbers,
            requiredSymbols: this.props.requiredSymbols,
            specificRequirements: {
              minChars: false,
              mixLetters: false,
              numbers: false,
              symbols: false
            },
            valid: valid
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.isValid = this.isValid.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.mouseEnterError = this.mouseEnterError.bind(this);
        this.checkRequirements = this.checkRequirements.bind(this);
    }


    //on input change for the input, set the state of the input to new changed value 
    //and run any requirement or validation checks
    onInputChange(event) {
        this.setState({
            value: event.target.value,
            empty: (event.target.value === '')
        });

        //run requirements check
        if(this.props.requirements) {
            this.checkRequirements(event.target.value)
        }

        // run regex validation check if required
        if(this.props.validate) {
            this.validateInput(event.target.value);
        }

        // call onChange method on the parent component to update their state
        if(this.props.onChange) {
            this.props.onChange(event);
        }
    }
    
    //confirm that the input meets the valid string regex if props require it
    validateInput(value) {
        // trigger custom validation method in the parent component
        if(this.props.validate && this.props.validate(value)){
          this.setState({
            valid: true,
            errorVisible: false
          });
        } else {
          this.setState({
            valid: false,
            errorMessage: (value !== '') ? this.props.errorMessage : this.props.emptyMessage
          });  
        }
    }

    //check if input was specific requirements to size and characters
    checkRequirements(value) {
        var validData = {
          minChars: (value!=='') ? value.length >= parseInt(this.state.requiredLength): false,
          mixLetters: (value!=='') ? this.countCapitals(value) >= parseInt(this.state.requiredCapitals) && this.countLower(value) >= parseInt(this.state.requiredLower): false,
          numbers: (value!=='') ? this.countNumbers(value) >= parseInt(this.state.requiredNumbers) : false,
          symbols: (value!=='') ? this.countSymbols(value) >= parseInt(this.state.requiredSymbols) : false
        }
        var allValid = (validData.minChars && validData.mixLetters && validData.numbers  && validData.symbols);

        this.setState({
          specificRequirements: validData,
          valid: allValid,
          errorMessage: (value !== '') ? this.props.errorMessage : this.props.emptyMessage
        });

        if(!allValid && !this.state.checkerVisible){
            this.setState({
                errorVisible: true
            });
        }
    }

    countCapitals(value) {
        var str = value;
        return str.replace(/[^A-Z]/g, "").length;
    }

    countLower(value) {
        var str = value;
        return str.replace(/[^a-z]/g, "").length;
    }
    
    countNumbers(value) {
        var str = value;
        return str.replace(/\D/g,'').length;
    }

    countSymbols(value) {
        var count = value.match(/(?=.*[!@#$%^&*])/g);
        if(count!==null){
            return count.length;
        }
        return 0;
    }
    
    isValid() {
        if(this.props.validate) {
          if((this.state.value === '') || !this.props.validate(this.state.value)) {
            this.setState({
              valid: false,
              errorVisible: true
            });
          }
        }else if(this.props.requirements){
            this.checkRequirements(this.state.value);
        }
       
        return this.state.valid;
    }
    
    handleFocus() {
        this.setState({
          focus: true,
          checkerVisible: true
        });
    
        // hide error when validator is active
        if(this.props.validator || this.props.requirements) {
          this.setState({
            errorVisible: false
          });
        }
    }
    
    handleBlur() {
        this.setState({
          focus: false,
          errorVisible: !this.state.valid,
          checkerVisible: false
        });
    }
    
    mouseEnterError() {
        if(!this.state.checkerVisible){
            this.setState({
            errorVisible: true
            });
        }
    }

    passwordChecker(){
        if(this.props.requirements) {
            return(
                <PasswordCheck
                ref="passwordCheck"
                visible={this.state.checkerVisible}
                name={this.props.placeholder}
                value={this.state.value}
                validData={this.state.specificRequirements}
                valid={this.state.valid}
                requiredSymbols={this.props.requiredSymbols}
                requiredLength={this.props.requiredLength}
                requiredCapitals={this.props.requiredCapitals}
                requiredLower={this.props.requiredLower}
                requiredNumbers={this.props.requiredNumbers}
                />
            );
        }else{
            return '';
        }
    }

    render() {

        var inputClasses = ClassName({
            'input_holder':     true,
            'input_valid':     this.state.valid,
            'input_error':     !this.state.valid,
            'input_empty':     this.state.empty,
            'input_hasValue':  !this.state.empty,
            'input_focused':   this.state.focus,
            'input_unfocused': !this.state.focus
        });

        return(
            <div className={inputClasses}>
                <input 
                    placeholder={this.props.placeholder} 
                    className='input-field'
                    value={this.state.value} 
                    onChange={this.onInputChange} 
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    autoComplete="off"
                    type={this.props.type}
                />
                <ErrorHandler 
                    visible={this.state.errorVisible} 
                    errorMessage={this.state.errorMessage} 
                />

                <div className="validationIcons">
                    <i className="input_error_icon" onMouseEnter={this.mouseEnterError}> <IconSwitch type="circle_error"/> </i>
                    <i className="input_valid_icon"> <IconSwitch type="circle_tick"/> </i>
                </div>

                {this.passwordChecker()}
            </div>
        );
    }
}

export default InputTemplate;