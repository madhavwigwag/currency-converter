class CurrencyConverter {
  convertedValue;
  fromCurrency;
  toCurrency;
  selectedNumber;
  constructor(selectedNumber, fromCurrency, toCurrency) {
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.selectedNumber = selectedNumber;
  }

  innerTextSentenceFormation() {
    return ` ${this.fromCurrency} ${this.selectedNumber.toLocaleString()} = ${
      this.toCurrency
    } ${this.convertedValue.toLocaleString()}`;
  }

  convertCurrency() {
    const url = `https://free.currconv.com/api/v7/convert?q=${this.fromCurrency}_${this.toCurrency}&compact=ultra&apiKey=74ee28ef473489650d8f`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let rate = data[`${this.fromCurrency}_${this.toCurrency}`].toFixed(2);
        this.convertedValue = rate * this.selectedNumber;
        this.insertPopUp();
      });
  }

  insertPopUp() {
    //closingPopup After 3 seconds
    setTimeout(() => popup.remove(), 5000);

    //creating elements
    const popup = document.createElement("div");
    const close = document.createElement("span");

    //creating PopUp
    document.body.appendChild(popup);
    popup.innerText = this.innerTextSentenceFormation();
    popup.style =
      "background-color: #43ffcd; padding: 10px 50px; border-radius: 5px; position: fixed;top: 10px; right: 10px; -webkit-box-shadow: 0px 7px 31px 0px rgba(0,0,0,0.75); -moz-box-shadow: 0px 7px 31px 0px rgba(0,0,0,0.75); box-shadow: 0px 7px 31px 0px rgba(0,0,0,0.75);";

    //creating Close button
    popup.appendChild(close);
    close.innerText = "x";
    close.style =
      "position: absolute; top: 5px; right: 10px; cursor: pointer; ";

    close.onclick = () => popup.remove();
  }
}

document.addEventListener("mouseup", function(event) {
  var selection = parseInt(window.getSelection());
  if (!isNaN(selection)) {
    const currencyConverter = new CurrencyConverter(selection, "USD", "INR");
    currencyConverter.convertCurrency();
  }
});
