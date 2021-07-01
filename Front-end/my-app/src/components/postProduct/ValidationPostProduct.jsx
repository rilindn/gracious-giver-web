import React from 'react'

const ValidationPostProduct = (values) => {

    let errors ={};

    if(!/[A-Za-z]{3,20}$/.test(values.ProductName)){
        errors.ProductName = "* Product Name is not valid"
        errors.ProductNameNote1 = "Product name should be between 3 and 20 chars"
        errors.ProductNameNote2 = "Only letters allowed"
        return errors;
    }
    if(!/[A-Za-z0-9]{20,250}$/.test(values.ProductDescription)){
        errors.ProductDescription = "*Minimum 20 characters!"
        return errors;
    }

    return errors;
}

export default ValidationPostProduct
