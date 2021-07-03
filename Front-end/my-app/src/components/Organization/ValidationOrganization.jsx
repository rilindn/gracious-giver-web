import React from 'react'

const ValidationOrganization = (values) => {

    let errors ={};

    // if(!/[a-zA-Z0-9]{5,50}$/.test(values.username)){
    //     errors.username = "*Username is not valid"
    //     errors.usernameNote1 = "Username should be between 5 and 50 chars"
    //     errors.usernameNote2 = "Only letters and numbers allowed"
    //     return errors;
    // }
    // if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(values.password)){
    //     errors.password = "* Invalid password!"
    //     errors.passwordNote1 = "Minimum 8 characters"
    //     errors.passwordNote2 = "At least one uppercase letter"
    //     errors.passwordNote3 = "At least one lowercase letter"
    //     errors.passwordNote4 = "At least one number"
    //     return errors;
    // }
    // if(!/[a-zA-Z]{5,50}$/.test(values.name)){
    //     errors.name = "*Name is not valid"
    //     errors.nameNote1 = "Name should be between 5 and 50 chars"
    //     errors.nameNote2 = "Only letters allowed"
    //     return errors;
    // }
    // if(!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(values.email)){
    //     errors.email = "* Invalid email!"
    //     return errors;
    // }
    // if(!/[A-Za-z0-9]{20,250}$/.test(values.description)){
    //     errors.description = "*Minimum 20 characters!"
    //     return errors;
    // }

    return errors;
}

export default ValidationOrganization
