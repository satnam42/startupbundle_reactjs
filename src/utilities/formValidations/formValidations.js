import { type } from "jquery";


export const getPageLimit = () => {
    return 10;
};

export const nameValid = name => {
    const reg = /^[A-Za-z\\s]+$/;
    if (reg.test(name) === true) {
        return true;
    }
    return false;
};

export const pinValid = pin => {
    const reg = /^[1-9][0-9]{5}$/;
    if (reg.test(pin) === true) {
        return true
    }
    return false;
}


export const isFieldEmpty = text => {
    if (text == '') {
        return true;
    }
    return false;
};
export const passwordPattern = password => {
    const reg = /[0-9a-zA-Z]{6,}/;
    if (reg.test(password) === true) {
        return true;
    }
    return false;
};


export const isValidEmail = email => {
    var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (reg.test(email) === true) {
        return true;
    }
    return false;
};

export const isValidPhone = phoneNo => {
    if (phoneNo.length < 8) {
        return false;
    }
    return true;
};

export const otpValid = otp => {
    otp.trim();
    if (otp.length == 4) {
        return true;
    }
    return false;
};

export const isValidComparedPassword = (newpassword, confirmPassword) => {
    if (newpassword != confirmPassword) {
        return false;
    }
    return true;
};





