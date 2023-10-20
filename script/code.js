const toggler = document.querySelector('#toggler');
const btn = document.querySelector('.btn');
const result = document.querySelector('.result');
const result_par = document.querySelector('.result_par');
let amount = document.querySelector('#amount');

// Currency exchange rates API
const apiKey = 'a5f2a613a9a0579307800365';

// Color change
toggler.onclick = () => {
    document.body.classList.toggle('light_mode');
};

// Fetch currency exchange rates and perform conversion
let btnFunc = () => {
    let base = document.querySelector('#select_from').value;
    let selectTo = document.querySelector('#select_to').value;
    let realAmount = amount.value;

    if (realAmount === '') {
        console.log('Please enter amount');
        result_par.innerText = 'Please Enter Amount';
    } else {
        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const rate = data.conversion_rates[selectTo];
                const convert = realAmount * rate;
                result_par.innerHTML = `${realAmount} ${base} is equal to ${convert.toFixed(2)} ${selectTo}`;
            });
    }
};

let func = (e) => {
    if (e.keyCode == 13) {
        btnFunc();
    }
};

btn.addEventListener('click', btnFunc);
amount.addEventListener('keypress', func);

amount.addEventListener('keyup', () => {
    if (!amount.value) {
        result_par.innerHTML = '';
    }
});

let changer = (e) => {
    btnFunc();
};

amount.addEventListener('input', changer);

amount.oninput = function () {
    if (this.value.length > 9) {
        this.value = this.value.slice(0, 9);
    }
};
