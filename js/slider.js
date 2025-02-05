class Slider{
    constructor(id){
        this.slider = Array.from(document.getElementById(id).children[2].children);
        this.shown = document.getElementsByClassName("shown")[0];
        this.dots = Array.from(document.getElementById(id).children[3].children);
        this.selected = document.getElementsByClassName("selected")[0];
        this.slideTimeout = 0; //Variable to reset timeout when user interacts with anything
    }

    previous(){
        let index = this.slider.indexOf(this.shown);
        index--;
        if(index <= -1){
            index = this.slider.length-1;
        }
        this.shown.classList.remove("shown");
        this.selected.classList.remove("selected");
        this.shown = this.slider[index];
        this.selected = this.dots[index];
        this.shown.classList.add("shown");
        this.selected.classList.add("selected");
    }

    next(){
        let index = this.slider.indexOf(this.shown);
        index++;
        if(index >= this.slider.length){
            index = 0;
        }
        this.shown.classList.remove("shown");
        this.selected.classList.remove("selected");
        this.shown = this.slider[index];
        this.selected = this.dots[index];
        this.shown.classList.add("shown");
        this.selected.classList.add("selected");
    }

    select(dot){
        let index = parseInt(dot.currentTarget.id.split("_")[1])-1;
        this.shown.classList.remove("shown");
        this.selected.classList.remove("selected");
        this.shown = this.slider[index];
        this.selected = this.dots[index];
        this.shown.classList.add("shown");
        this.selected.classList.add("selected");
    }

    automaticSlide() {
        this.next();
        clearTimeout(this.slideTimeout); //This is the part where it is reseted
        this.slideTimeout = setTimeout(() => {this.automaticSlide()}, 5000);
    }    
}

export {Slider};