import React from 'react';

const ErrorHandler = (props) => {
    const isVisible = () => {
        if(props.visible){
           return 'error_container visible'; 
        }else{
            return 'error_container invisible'; 
        }
    }

    return (
        <div className={isVisible()}>
            <span>{props.errorMessage}</span>
        </div>
    );
}

export default ErrorHandler;