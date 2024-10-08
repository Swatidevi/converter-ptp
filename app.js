const currencies = [
    { id: 'USD', name: 'US Dollars' },
    { id: 'GBP', name: 'Great Britain Pound' },
    { id: 'BRL', name: 'Brazilian Real' },
    { id: 'UGX', name: 'Ugandan Shillings' },
    { id: 'AUD', name: 'Australian Dollar' },
    { id: 'CAD', name: 'Canadian Dollar' },
    { id: 'EUR', name: 'Euro' },
    { id: 'KRW', name: 'South Korean Won' },
    { id: 'KES', name: 'Kenyan Shillings' },
    { id: 'CHF', name: 'Swiss Franc' },
    { id: 'GHS', name: 'Ghanian Cedi' },
    { id: 'INR', name: 'Indian Rupee' },
    { id: 'ZAR', name: 'South African Rand' },
    { id: 'ILS', name: 'Israeli Shekel' },
    { id: 'JPY', name: 'Japanese Yen' },
    { id: 'NGN', name: 'Nigerian Naira' },
    { id: 'CNY', name: 'Chinese Yuan' },
    { id: 'RUB', name: 'Russian Ruble' }
  ];
  
  const apiBase = 'https://free.currencyconverterapi.com/api/v6/';
  const api = (currency, currency2) => 
    `${apiBase}convert?q=${currency}_${currency2}&compact=ultra&apiKey=bc3c1ae7e4fe84c4cce0`;
  
  const toast = (msg) => {
    const toastr = document.querySelector('.messages');
    if (!toastr) return;
    
    toastr.textContent = msg;
    if (!toastr.classList.contains('on')) {
      toastr.classList.add('on');
    }
  };
  
  const doneToasting = () => {
    const toastr = document.querySelector('.messages');
    if (!toastr) return;
    
    toastr.textContent = '';
    toastr.classList.remove('on');
  };
  
  const conversionSucceeded = (apiResponse) => {
    if (!apiResponse) {
      toast('Nothing to display ...');
      return;
    }
    
    const [value] = Object.values(apiResponse);
  
    const btn = document.querySelector('button');
    btn.removeAttribute('disabled');
  
    const display = document.querySelector('.conversion');
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: getSelectedCurrency2()
    });
  
    let amount = document.getElementById("Amount").value;
    amount = amount == 0 ? 1 : amount;
    display.textContent = formatter.format(value * amount);
    doneToasting();
  };
  
  const createNode = (element) => document.createElement(element);
  
  const append = (parent, el) => parent.appendChild(el);
  
  const populateCurrencies = () => {
    currencies.forEach(c => {
      let opt = createNode("option");
      opt.setAttribute("value", c.id);
      let text = document.createTextNode(c.name);
      append(opt, text);
      let sel = document.getElementsByClassName("select-text")[0];
      append(sel, opt);
    });
  };
  
  const populateCurrencies2 = () => {
    currencies.forEach(c => {
      let opt = createNode("option");
      opt.setAttribute("value", c.id);
      let text = document.createTextNode(c.name);
      append(opt, text);
      let sel = document.getElementsByClassName("select-text")[1];
      append(sel, opt);
    });
  };
  
  const getSelectedCurrency = () => document.getElementsByClassName("select-text")[0].value;
  
  const getSelectedCurrency2 = () => document.getElementsByClassName("select-text")[1].value;
  
  const convert = (event) => {
    toast('Preparing to convert ....');
  
    const btn = event ? event.target : document.querySelector('button');
  
    const selected = getSelectedCurrency();
    if (!selected || selected.trim() === '' || !currencies.map(c => c.id).includes(selected)) return;
  
    const selected2 = getSelectedCurrency2();
    if (!selected2 || selected2.trim() === '' || !currencies.map(c => c.id).includes(selected2)) return;
  
    btn.setAttribute('disabled', 'disabled');
    toast('Converting ...');
  
    const endpoint = api(selected, selected2);
  
    fetch(endpoint)
      .then((resp) => resp.json())
      .then((data) => {
        conversionSucceeded(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const startApp = () => {
    populateCurrencies();
    populateCurrencies2();
  
    let draw = document.getElementsByClassName("btn")[0];
    draw.addEventListener("click", (event) => {
      document.getElementsByClassName("conversion")[0].style.display = "block";
      convert(event);
    });
  };
  
  startApp();
  