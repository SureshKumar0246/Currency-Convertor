const dropdowns = document.querySelectorAll(".dropdown select");
let button = document.querySelector("#btn");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
for (let select of dropdowns){
    for(let currencyCodee in countryList){
        // console.log(currencyCodee, countryList[currencyCodee]);
        let options = document.createElement("option");
        options.value = currencyCodee;
        options.innerText = currencyCodee
        if(select.name === "from" && currencyCodee === "USD"){
            options.selected = "selected";
        }
        else if(select.name === "to" && currencyCodee === "INR"){
            options.selected = "selected";
        }
        select.append(options);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newimg =  `https://flagsapi.com/${countryCode}/flat/64.png`;
     let imgs = element.parentElement.querySelector("img");
     imgs.src = newimg;
}

let updateRate = async() => {
  
    let amount = document.querySelector(".amount input");
     let amtVal = amount.value
   if(amount === "" || amount < 1){
        amount.value = 1;
        amtVal = 1;
     }
     let Url = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Bs5hHsEGBMJTRy0XIBuSea0soFjBRDVOf4QTWgVY&base_currency=${fromCurr.value}&currencies=${toCurr.value}`
      let response = await fetch(Url);
      let finalResult = await response.json();
       let rate = finalResult.data[toCurr.value]

       let finalRate  = amtVal * rate;
       let msg = document.querySelector(".msg")
       msg.innerText = `${amtVal} ${fromCurr.value}  to  ${finalRate} ${toCurr.value}`
       console.log(finalRate)
    }

button.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateRate();
})
window.addEventListener("load", () => {
    updateRate();
  });