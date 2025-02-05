async function getCurrencies(previous, chosen){
    let conversions = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json")
        .then(response => response.json())
        .catch(() => {
            alert("An error ocurred.\nPlease, try again");
            return null;
        });
    if(conversions === null){
        return conversions;
    }
    conversions = conversions["eur"];
    switch (previous) {
        case "$":
            previous = "usd";
            break;
        case "€":
            previous = "eur";
            break;
        case "£":
            previous = "gbp";
            break;
        default:
            previous = "eur";
            break;
    }
    return [conversions[previous], conversions[chosen]];
}

export {getCurrencies};