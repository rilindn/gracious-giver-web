import React from 'react'

const ValidationPostRequest = (values) => {

    let errors ={};

    if(values.RequestName.length<5){
        errors.RequestName = "* Minimum 5 characters!"
        return errors;
    }
    if(values.RequestName.length>50){
        errors.RequestName = "* Maximium 50 characters!"
        return errors;
    }
    if(values.RequestDescription.length<10){
        errors.RequestDescription = "* Minimum 10 characters!"
        return errors;
    }
    if(values.RequestDescription.length>400){
        errors.RequestDescription = "* Maximium 400 characters!"
        return errors;
    }
    
    return errors;
}

export default ValidationPostRequest
