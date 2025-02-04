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
        console.log(footerPercentage);
        console.log("----------------");
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
});