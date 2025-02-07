function isChecked(validName, nameField, validEmail, emailField, confirmUsageOfData){
    validName ? nameField.classList.remove("submit__error") : nameField.classList.add("submit__error");
    validEmail === null ? emailField.classList.add("submit__error") : emailField.classList.remove("submit__error");
    confirmUsageOfData.checked ? confirmUsageOfData.classList.remove("submit__error") : confirmUsageOfData.classList.add("submit__error");
    if(validName && validEmail !== null && confirmUsageOfData.checked){
        let sendData = fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'POST',
            body: JSON.stringify({
                title: nameField.value,
                body: emailField.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        sendData.then((resolve) => resolve.json()).then((json) => alert(`Thank you, ${json.title}, for contacting with us.`)).catch(() => {alert("An error occurred.\nPlease, try again.")});

        nameField.value = "";
        emailField.value = "";
        confirmUsageOfData.checked = false;
    }
    else{
        addError(nameField, validName);
        addError(emailField, validEmail !== null);
    }
}

function addError(field, isValid){
    if(isValid){
        field.classList.remove("submit__error");
        field.parentNode.children[1].classList.add("input__error__none");
    }
    else{
        field.classList.add("submit__error");
        field.parentNode.children[1].classList.remove("input__error__none");
    }
}

export {isChecked};