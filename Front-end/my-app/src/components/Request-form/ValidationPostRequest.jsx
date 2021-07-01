import React from 'react'

const ValidationPostRequest = (values) => {

    let errors ={};

    if(!/[a-zA-Z]{5,50}$/.test(values.RequestName)){
        errors.RequestName = "* Request Name is not valid"
        errors.RequestNameNote1 = "Request name should be between 5 and 50 chars"
        errors.RequestNameNote2 = "Only letters allowed"
        return errors;
    }
    if(!/[a-zA-Z0-9]{20,250}$/.test(values.RequestDescription)){
        errors.RequestDescription = "*Minimum 20 characters!"
        return errors;
    }

    return errors;
}

export default ValidationPostRequest
