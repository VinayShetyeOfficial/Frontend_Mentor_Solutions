// ## STEP1 
const validateEmail = (email) => {
    if (email.length < 256 && /^[^@]+@[^@]{2,}\.[^@]{2,}$/.test(email)) {
        return (true)
    }

    return false;
}

const formSubmit = () => {
    const inputTxt = document.querySelectorAll('.form-control');
    const errTxt = document.querySelectorAll('.err-text');

    let indx = 0,
        looksGood = true;

    inputTxt.forEach((input) => {

        if (input.value.trim() === '') {
            errTxt[indx].style.display = 'inline-block';
            inputTxt[indx].style.borderColor = 'var(--strawberry-red)';
            looksGood = false;
        }
        else {
            if (input.type === 'email') {
                if (!validateEmail(input.value.trim())) {
                    errTxt[indx].style.display = 'inline-block';
                    errTxt[indx].innerText = 'Invalid email!';
                    inputTxt[indx].style.borderColor = 'var(--strawberry-red)';
                    looksGood = false;
                }
                else {
                    errTxt[indx].style.display = 'none';
                    inputTxt[indx].style.borderColor = 'var(--light-gray)';
                }
            }
            else {
                errTxt[indx].style.display = 'none';
                inputTxt[indx].style.borderColor = 'var(--light-gray)';
            }
        }

        indx++;
    });

    if (looksGood) {
        console.log("#Form Sumbitted [User Info]:-");
        console.log("Name: " + inputTxt[0].value.toUpperCase() + "\n" + "Email: " + inputTxt[1].value.toUpperCase() + "\n" + "Phone: " + inputTxt[2].value.toUpperCase() + "\n");
        window.location.href = './routes/step2.html';
    }

    event.preventDefault();
}

// ## STEP 2 
const plansAva = ['arcade', 'advanced', 'pro'];
const planType = ['monthly', 'yearly'];
const planPrice = [9, 12, 15];

var planSelected = plansAva[0];
var planTypeSelected = planType[0];
var billing = planPrice[0];

const selectPlan = () => {
    const plan = document.querySelectorAll('.plan');
    const checkmark = document.querySelectorAll('.input-radio');
    let indx = 0;

    checkmark.forEach((checkitem) => {
        if (checkitem.checked) {
            plan[indx].style.borderColor = "var(--violet)";
            plan[indx].style.background = "var(--mangolia)";
            planSelected = plansAva[indx];
            billing = planPrice[indx];
        }
        else {
            plan[indx].style.borderColor = "var(--light-gray)";
            plan[indx].style.background = "var(--white)";
        }

        indx++;
    })
}

const switchPlanType = () => {
    const check_switch = document.getElementById('check');
    let bonus = document.querySelectorAll('.bonus');
    let price = document.querySelectorAll('.price');

    if (check_switch.checked) {

        bonus.forEach((item) => {
            item.style.display = 'inline-block';
        })

        planTypeSelected = planType[1];
        price[0].innerText = '$90/yr';
        price[1].innerText = '$120/yr';
        price[2].innerText = '$150/yr';
    }
    else {

        bonus.forEach((item) => {
            item.style.display = 'none';
        })

        planTypeSelected = planType[0];
        price[0].innerText = '$9/mo';
        price[1].innerText = '$12/mo';
        price[2].innerText = '$15/mo';
    }
}

const validatePlanSelected = () => {

    // Calculate Price
    billing = planPrice[plansAva.indexOf(planSelected)];
    billing = billing * (planTypeSelected == planType[0] ? 1 : 10);

    console.log("#Plan Selected [Plan Info]:-")
    console.log("Plan Category: " + planSelected.toUpperCase() + "\n" + "Plan Type: " + planTypeSelected.toUpperCase() + "\n" + "Price:" + billing);
    window.location.href = './step3.html';
}

// ## STEP 3 
const setUp = () => {

    console.log('Called setUp');
    console.log("Plan Category: " + planSelected.toUpperCase() + "\n" + "Plan Type: " + planTypeSelected.toUpperCase() + "\n" + "Price:" + billing);

    if (planTypeSelected === planType[1]) {
        const period = document.querySelectorAll('.period');
        let indx = 0;

        period.forEach((item) => {
            period.innnerText = "+$" + (planPrice[indx] * 10) + "/yr";
            indx++;
        })
    }

}

const selectAddon = () => {
    const addon = document.querySelectorAll('.addon');
    const checkmark = document.querySelectorAll('.input-check');
    let indx = 0;


    checkmark.forEach((checkitem) => {
        if (checkitem.checked) {
            console.log('checked: ' + indx);
            addon[indx].style.border = "2px solid var(--violet)";
            addon[indx].style.background = "var(--mangolia)";
        }
        else {
            addon[indx].style.border = "2px solid var(--light-gray)";
            addon[indx].style.background = "var(--white)";
        }

        indx++;
    })
}