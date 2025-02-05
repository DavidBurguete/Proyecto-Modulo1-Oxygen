let menu = document.getElementById("burger_menu");
let nav = document.getElementsByTagName("nav")[0];
let collapsed = true;

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

export {menu};