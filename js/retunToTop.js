
// let returnTop = document.getElementById("returnTop");
// returnTop.disabled = true;

// returnTop.addEventListener("click", function(){
//     setTimeout(() => {
//         document.documentElement.scrollTop = 0;
//     }, 200);
// });

// let heightPosition = window.scrollY;
// let totalHeight = document.documentElement.scrollHeight;
// let windowSize = window.innerHeight;
// let percentage = heightPosition/(totalHeight-windowSize)*100;
// function visibility(){
//     let percentajeScroller = document.getElementById("percentajeScroller");
//     const footerHeight = document.querySelector('footer').getBoundingClientRect().height; //Get the size of the footer tag
//     //Do not display progress bar when on top of the page
//     if(!percentage == 0){
//         percentajeScroller.style.width = percentage + "%";
//         percentajeScroller.style.display = "block";
//     }
//     else{
//         percentajeScroller.style.display = "none";
//     }

//     //When the user gets to >=15% of the page, it will display the "return to top" button
//     if(percentage >= 15){
//         returnTop.disabled = false;
//     }
//     else{
//         returnTop.disabled = true;
//     }

//     //Get the percentage position of footer away from the top of the document
//     let footerPercentage = (totalHeight-windowSize-footerHeight-20)/(totalHeight-windowSize)*100; //The extra 20 are the bottom: 20px; property
//     // Avoid the button overlap the footer
//     if (footerPercentage <= percentage) {
//         returnTop.style.position = 'absolute';
//         returnTop.style.bottom = '20px';
//     } else {
//         returnTop.style.position = 'fixed';
//         returnTop.style.bottom = '20px';
//     }
// }

// export {returnTop, visibility, percentage};
function scrolled(returnTop){
    let percentajeScroller = document.getElementById("percentajeScroller");
    let totalHeight = document.documentElement.scrollHeight;
    let windowSize = window.innerHeight;
    let heightPosition = window.scrollY;
    let percentage = heightPosition/(totalHeight-windowSize)*100;
    const footerHeight = document.querySelector('footer').getBoundingClientRect().height; //Get the size of the footer tag
    //Do not display progress bar when on top of the page
    if(!percentage == 0){
        percentajeScroller.style.width = percentage + "%";
        percentajeScroller.style.display = "block";
    }
    else{
        percentajeScroller.style.display = "none";
    }

    //When the user gets to >=15% of the page, it will display the "return to top" button
    if(percentage >= 15){
        returnTop.disabled = false;
    }
    else{
        returnTop.disabled = true;
    }

    //Get the percentage position of footer away from the top of the document
    let footerPercentage = (totalHeight-windowSize-footerHeight-20)/(totalHeight-windowSize)*100; //The extra 20 are the bottom: 20px; property
    // Avoid the button overlap the footer
    if (footerPercentage <= percentage) {
        returnTop.style.position = 'absolute';
        returnTop.style.bottom = '20px';
    } else {
        returnTop.style.position = 'fixed';
        returnTop.style.bottom = '20px';
    }
}

export {scrolled};