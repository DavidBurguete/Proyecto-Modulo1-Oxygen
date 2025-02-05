import {modalOnLoad, fadeIn} from "./modal.js";
import {menu} from "./nav.js";
import {scrolled} from "./retunToTop.js";
import {isChecked} from "./form.js";
import {getCurrencies} from "./currencies.js";

document.addEventListener("DOMContentLoaded", function(){
    let returnTop = document.getElementById("returnTop");
    returnTop.disabled = true;

    document.addEventListener("scroll", function(){
        let percentage = scrolled(returnTop);

        //Show subscribe to newsletter when scrolled >=25%
        if(percentage >= 25){
            fadeIn();
        }
    });

    returnTop.addEventListener("click", function(){
        setTimeout(() => {
            document.documentElement.scrollTop = 0;
        }, 200);
    });

    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    document.getElementById("submit").addEventListener("click", function(){
        let nameField = document.getElementById("name");
        validName = (nameField.value.length >= 2 && nameField.value.length <= 100);

        let emailField = document.getElementById("email");
        let validEmail = regex.exec(emailField.value);

        let confirmUsageOfData = document.getElementById("confirmUsageOfData");
        isChecked(validName, nameField, validEmail, confirmUsageOfData);
    });

    $('#currency').select2();

    $('#currency').on('change', async function(){
        let choosedCurrency = document.getElementById("currency").value;
        let plans = Array.from(document.getElementById("prices").children).splice(3);
        let prices = [];
        let previousCurrency = null;
        for(let i = 0; i < plans.length; i++){
            prices.push(parseFloat(plans[i].children[0].children[1].innerHTML.substring(1)));
            previousCurrency = plans[i].children[0].children[1].innerHTML.substring(0,1);
        }
        let response = await getCurrencies(previousCurrency,choosedCurrency);
        if(response !== null){
            let previous = response[0];
            let chosen = response[1];
            let chosenCurrency = null;
            switch (choosedCurrency) {
                case "usd":
                    chosenCurrency = "$";
                    break;
                case "eur":
                    chosenCurrency = "€";
                    break;
                case "gbp":
                    chosenCurrency = "£";
                    break;
                default:
                    chosenCurrency = "€";
                    break;
            }
            for(let i = 0; i < prices.length; i++){
                prices[i] = chosenCurrency + Math.round(prices[i]/previous*chosen);
                plans[i].children[0].children[1].innerHTML = prices[i];
            }
        }
    });

    modalOnLoad(regex);
});