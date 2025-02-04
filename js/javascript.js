document.addEventListener("DOMContentLoaded", function(){
    let menu = document.getElementById("burger_menu");
    let nav = document.getElementsByTagName("nav")[0];
    let collapsed = true;
    let returnTop = document.getElementById("returnTop");
    returnTop.disabled = true;
    menu.addEventListener("click", function(){
        if(collapsed){
            nav.classList.add("nav__expanded");
            menu.style.top = "36.78px";
            menu.children[0].classList.add("burger_menu--first--crossed");
            menu.children[1].classList.add("burger_menu--middle--crossed");
            menu.children[2].classList.add("burger_menu--last--crossed");
        }
        else{
            nav.classList.remove("nav__expanded");
            menu.style.top = "29px";
            menu.children[0].classList.remove("burger_menu--first--crossed");
            menu.children[1].classList.remove("burger_menu--middle--crossed");
            menu.children[2].classList.remove("burger_menu--last--crossed");
        }
        collapsed = !collapsed;
    });

    document.addEventListener("scroll", function(){
        let percentajeScroller = document.getElementById("percentajeScroller");
        let totalHeight = document.documentElement.scrollHeight;
        let windowSize = window.innerHeight;
        let heightPosition = window.scrollY;
        let percentage = heightPosition/(totalHeight-windowSize)*100;
        const footerHeight = document.querySelector('footer').getBoundingClientRect().height; //Get the size of the footer tag
        if(!percentage == 0){
            percentajeScroller.style.width = percentage + "%";
            percentajeScroller.style.display = "block";
        }
        else{
            percentajeScroller.style.display = "none";
        }

        if(percentage >= 15){
            returnTop.disabled = false;
        }
        else{
            returnTop.disabled = true;
        }

        //Get the percentage position of footer away from the top of the document
        let footerPercentage = (totalHeight-windowSize-footerHeight-20)/(totalHeight-windowSize)*100; //The extra 20 are the bottom: 20px; property
        // Evitar que el botón se superponga al footer
        if (footerPercentage <= percentage) {
            returnTop.style.position = 'absolute';
            returnTop.style.bottom = '20px'; // Ajustar al final del main
        } else {
            returnTop.style.position = 'fixed';
            returnTop.style.bottom = '20px'; // En la parte inferior de la pantalla
        }
    });

    returnTop.addEventListener("click", function(){
        setTimeout(() => {
            document.documentElement.scrollTop = 0;
        }, 200);
    });

    document.getElementById("submit").addEventListener("click", function(){
        let nameField = document.getElementById("name");
        validName = (nameField.value.length >= 2 && nameField.value.length <= 100);

        let emailField = document.getElementById("email");
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail = regex.exec(emailField.value);

        let confirmUsageOfData = document.getElementById("confirmUsageOfData");
        isChecked(validName, nameField, validEmail, confirmUsageOfData);

        function isChecked(validName, nameField, validEmail, confirmUsageOfData){
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
        }
    });
});