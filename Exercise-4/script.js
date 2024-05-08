function validateForm() {

    var name = document.getElementById("name").value;
    if (name === '') {
        nameError.textContent = "Enter A Name";
        return false;
    } else {
        nameError.textContent = "";
    }
    var nameptrn = /^[A-Za-z ]+$/;
    if (!nameptrn.test(name)) {
        nameError.textContent = "Enter A Valid Name";
        return false;
    } else {
        nameError.textContent = "";
    }

    var aadhar = document.getElementById("aadhar").value;
    if (aadhar === '') {
        aadharError.textContent = "Enter an Aadhar Number";
        return false;
    } else {
        aadharError.textContent = "";
    }
    var aadharptrn = /^\d{12}$/;
    if (!aadharptrn.test(aadhar)) {
        aadharError.textContent = "Enter A Valid Aadhar Number";
        return false;
    } else {
        aadharError.textContent = "";
    }

    var genderlist = document.getElementsByName("gender");
    let gender;
    for (let radio of genderlist) {
        if (radio.checked) {
            gender = radio.id;
        }
    }
    if (gender == undefined) {
        genderError.textContent = "Select a Gender";
        return false;
    } else {
        genderError.textContent = "";
    }

    var languageList = document.getElementsByName("language");
    let language = [];
    for (let cb of languageList) {
        if (cb.checked) {
            language.push(cb.id);
        }
    }
    if (language.length == 0) {
        langError.textContent = "Select atleast 1 Language";
        return false;
    } else {
        langError.textContent = "";
    }

    var district = document.getElementById("district").value;
    if (district === '') {
        distError.textContent = "Please select a district";
        return false;
    } else {
        distError.textContent = "";
    }

    var pincode = document.getElementById("pincode").value;
    if (pincode === '') {
        pinError.textContent = "Enter A Pincode";
        return false;
    } else {
        var pinptrn = /^\d{6}$/;
        if (!pinptrn.test(pincode)) {
            pinError.textContent = "Enter A Valid Pincode";
            return false;
        } else {
            pinError.textContent = "";
        }
    }

    var address = document.getElementById("address").value;
    if (address === '') {
        addressError.textContent = "Enter an Address";
        return false;
    } else {
        addressError.textContent = "";
    }

    var email = document.getElementById("email").value;
    if (email === '') {
        emailError.textContent = "Enter an Email";
        return false;
    } else {
        emailError.textContent = "";
    }
    var emailptrn = /^([A-z]+[0-9]*)+([\.]?[A-z0-9]+)*@\w+(\.\w{2,3})+$/;
    if (!emailptrn.test(email)) {
        emailError.textContent = "Enter A Valid Email";
        return false;
    } else {
        emailError.textContent = "";
    }

    var mobile = document.getElementById("mobile").value;
    if (mobile === '') {
        mobileError.textContent = "Enter A Mobile Number";
        return false;
    } else {
        mobileError.textContent = "";
    }
    var mobptrn = /^\d{10}$/;
    if (!mobptrn.test(mobile)) {
        mobileError.textContent = "Enter A Valid Mobile Number";
        return false;
    } else {
        mobileError.textContent = "";
    }

    var username = document.getElementById("username").value;
    if (username === '') {
        unError.textContent = "Enter an Username";
        return false;
    } else {
        unError.textContent = "";
    }
    var unptrn = /^([A-z0-9]+[A-z0-9_]*){8,16}$/;
    if (!unptrn.test(username)) {
        unError.textContent = "Enter A Valid Username";
        return false;
    } else {
        unError.textContent = "";
    }

    var password = document.getElementById("password").value;
    if (password === '') {
        passwdError.textContent = "Enter A Password";
        return false;
    } else {
        passwdError.textContent = "";
    }
    var pswdptrn = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#*])[A-Za-z\d@#*]+$/;
    if (!pswdptrn.test(password)) {
        passwdError.textContent = "Enter A Valid Password";
        return false;
    } else {
        passwdError.textContent = "";
    }

    return true;
}
