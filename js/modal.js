let hasAlreadyFaded = null;
try{
    hasAlreadyFaded = JSON.parse(localStorage.getItem("hasAlreadyFaded"));
} catch(error){
    hasAlreadyFaded = false;
}

export function modalOnLoad(regex){
    setTimeout(fadeIn, 5000);

    $("#newsletter").on("click", function(parentNode){
        if(parentNode.target === this){
            closeModal();
        }
    });
    document.getElementById("close").addEventListener("click", closeModal);

    document.getElementById("subscribe").addEventListener("click", function(){
        let emailNews = document.getElementById("newsletterEmail");
        let validEmailNews = regex.exec(emailNews.value);
        if(validEmailNews){
            let sendData = fetch("https://jsonplaceholder.typicode.com/posts", {
                method: 'POST',
                body: emailNews.value,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });

            sendData.then(() => {
                alert(`Thank you for subscribing!`);            
                closeModal();
            }).catch(() => {alert("An error occurred.\nPlease, try again.")});
            hasAlreadyFaded = true;
            localStorage.setItem("hasAlreadyFaded", hasAlreadyFaded);
        }
        else{
            emailNews.classList.add("subscribe__error");
        }
    });
}

export function fadeIn(){
    if(!hasAlreadyFaded){
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        document.getElementById("newsletter").classList.add("modal--fadeIn");
        let escape = (e) => {
            if(e["key"] == "Escape"){
                closeModal();
            }
        }
        document.addEventListener("keydown", escape);
    }
};

function closeModal(){
    document.getElementsByTagName("html")[0].style.overflow = "visible";
    document.getElementsByTagName("body")[0].style.overflow = "visible";
    document.getElementById("newsletter").classList.remove("modal--fadeIn");
    hasAlreadyFaded = true;
}