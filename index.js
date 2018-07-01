const selectLeft = document.getElementById('select-left');
const selectRight = document.getElementById('select-right');
const inputLeft = document.getElementById('input-left');
const inputRight = document.getElementById('input-right');
const convertButton = document.getElementById('convert');
const userInput = document.getElementById('input');




if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js').then(function(){
         console.log("SW sucessfully registered");
        }).catch(function(err){
            console.log("Error in SW Registration!", err);
            });
    }); 
}  




let from, to ;
let currencyPack = {};



const urlCurrencies = 'https://free.currencyconverterapi.com/api/v5/currencies';

fetch(urlCurrencies)
    .then(response => response.json())
        .then(({results}) => {
                        
        let currency = '';         
        
        for(o in results) {
            currency += `<option>${results[o].currencyName}</option>`;
            currencyPack[results[o].currencyName] = o;            
        }
        selectLeft.innerHTML = currency;
        selectRight.innerHTML = currency;                        
    });
userInput.addEventListener('click', () =>{
    userInput.value = "";
    inputLeft.value = 0;
    inputRight.value = 0;    
});

convertButton.addEventListener('click', () => {
    inputLeft.value = "loading..";
    inputRight.value = "loading..";

    from = currencyPack[selectLeft.options[selectLeft.selectedIndex].text];
    to = currencyPack[selectRight.options[selectRight.selectedIndex].text];
    const fromTo = from+"_"+to;

    let urlConvert = "https://free.currencyconverterapi.com/api/v5/convert?q="+fromTo;
    fetch(urlConvert)
        .then(res => res.json())
            .then(({results}) => {
                const ratio = results[fromTo].val;
                inputLeft.value = userInput.value;
                inputRight.value = Math.round(inputLeft.value * ratio * 1000)/1000;
        });

});