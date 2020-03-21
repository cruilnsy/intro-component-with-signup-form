var formData = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: ""
};

function submitForm(event) {
    event.preventDefault();
    clearForm();
    if (validateForm()) {
        // API call
        console.log('API calling...');
    }
}

function validateForm() {
    var selector ="";
    var isValidate = true;
    var value = "";
    for (var prop in formData) {
        selector = '.' + camelCaseToDash(prop);
        value = formData[prop].trim();
        var hasEmail = selector.includes('email');
        if ( !value
            || (hasEmail && value && !validateEmail(formData[prop]))) {
            document.querySelector(selector).classList.add("error");
            document.querySelector(selector).innerText = hasEmail && value ? "Looks like this is not an email": camelCaseToWord(prop) + " cannot be empty";
            document.querySelector(selector + "-input").classList.add("error-input");
            isValidate = false;
        }
    }
    return isValidate;
}
function clearForm() {
    var selector = "";
    for (var prop in formData) {
        selector = '.' + camelCaseToDash(prop);
        document.querySelector(selector).classList.remove("error");
        document.querySelector(selector).innerText = "";
        document.querySelector(selector + '-input').classList.remove("error-input");
    }
}
function checkField(element) {
    var elementName = element.name;
    var elementValue = element.value;
    formData[elementName] = elementValue;
}

function camelCaseToDash(str) {
    return str.replace(/[A-Z]/g, (g) => `-${g[0].toLowerCase()}`);
}
function camelCaseToWord(str) {
    return str.replace(/([A-Z])/g, " $1").trim().replace(/^\w/, c => c.toUpperCase());
}
function validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}