
const ValidationPostProduct = (values) => {

    let errors ={};

    if(values.ProductName.length<5){
        errors.ProductName = "* Minimum 5 characters!"
        return errors;
    }
    if(values.ProductName.length>50){
        errors.ProductName = "* Maximium 50 characters!"
        return errors;
    }
    if(values.ProductDescription.length<10){
        errors.ProductDescription = "* Minimum 10 characters!"
        return errors;
    }
    if(values.ProductDescription.length>400){
        errors.ProductDescription = "* Maximium 400 characters!"
        return errors;
    }

    return errors;
}

export default ValidationPostProduct
