

const Validation = (values) => {

    let errors ={};

    if(!/^[A-Z][A-Za-z]{2,20}$/.test(values.firstname)){
        errors.firstname = "* Firstname is not valid"
        errors.firstnameNote1 = "Username should be between 2 and 20 chars"
        errors.firstnameNote2 = "Start with an uppercase"
        errors.firstnameNote3 = "Only letters allowed"
        return errors;
    }
    if(!/^[A-Z][A-Za-z]{2,20}$/.test(values.lastname)){
        errors.lastname = "* Lastname is not valid"
        errors.lastnameNote1 = "Lastname should be between 2 and 20 chars"
        errors.lastnameNote2 = "Start with an uppercase"
        errors.lastnameNote3 = "Only letters allowed"
        return errors;
    }
    if(!/^[A-Za-z][A-Za-z0-9_]{7,30}$/.test(values.username)){
        errors.username = "* Invalid username!"
        errors.usernameNote1 = "Username should be between 7 and 30 chars"
        errors.usernameNote2 = "Can contain both letters and numbers"
        errors.usernameNote3 = "Must start with a letter"
        errors.usernameNote4 = "Cannot end with an underscore"
        return errors;
    }
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(values.password)){
        errors.password = "* Invalid password!"
        errors.passwordNote1 = "Minimum 8 characters"
        errors.passwordNote2 = "At least one uppercase letter"
        errors.passwordNote3 = "At least one lowercase letter"
        errors.passwordNote4 = "At least one number"
        return errors;
    }
    if(values.password!==values.confirmPassword){
        errors.confirmPassword = "* Passwords don't match!"
        return errors;
    }
    if(!/^[0-9]{3,}/.test(values.postcode)){
        errors.postcode = "* Invalid postcode!"
        return errors;
    }
    if(!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(values.email)){
        errors.email = "* Invalid email!"
        return errors;
    }
    if(values.email!==values.confirmEmail){
        errors.confirmEmail = "* Emails don't match!"
        return errors;
    }
    if(getAge(values.birth)<18){
        errors.birth = "* You should be at least 18 years old!"
        return errors;
    }

    function getAge(DOB) {
        var today = new Date();
        var birthDate = new Date(DOB);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }    
        return age;
    }

    return errors;
}

export default Validation
