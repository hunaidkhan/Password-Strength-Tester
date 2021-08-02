import Checks from './checks.js'

const passwordDiv = document.querySelector(".password-input");
const slider = document.querySelector(".strength-slider");
const reasons = document.querySelector(".reason-container");
const passwordArr = [];


function starter(e){
    const password = extractPassword(e);
    const weaknesses = runChecks(password);
    updateHTML(weaknesses);
}

function extractPassword(e){
    console.log(e.data);
    if (e.data != null) passwordArr.push(e.data);
    if(e.inputType == "deleteContentBackward") passwordArr.pop();
    console.log(e);
    return passwordArr.join("");
}

function runChecks(password){
    const weaknesses = [];
    const checks = new Checks(password);
    weaknesses.push(checks.lengthCheck());
    weaknesses.push(checks.lowerCaseCheck());
    weaknesses.push(checks.upperCaseCheck());
    weaknesses.push(checks.numberCharacterCheck());
    weaknesses.push(checks.specialCharactersCheck());
    weaknesses.forEach(weakness => console.log(weakness.message, weakness.deduction));
    return weaknesses;
}

function updateHTML(weaknesses){
    let perc = 100;
    reasons.innerHTML = "";
    weaknesses.forEach((weakness) => {
        perc -= weakness.deduction;
        const reason = document.createElement('div');
        reason.innerText = weakness.message;
        reasons.appendChild(reason);
        reason.classList.add("reason");
        console.log(reason);
    })
    perc = perc / weaknesses.length;
    slider.style.width = `${perc}%`;
}


passwordDiv.addEventListener("input", starter);