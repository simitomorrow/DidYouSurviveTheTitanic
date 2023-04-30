import {didThePassengerSurvive } from "./train.js";

window.onload = function () {
    document.querySelector("form#boardingPass-wrapper").addEventListener("submit", (e) => {
        e.preventDefault();
        handleFormData();
        handleAIResult();
    });

    const cabinInputs = document.querySelectorAll("input[name=cabinSector]");
    for (let i = 0; i < cabinInputs.length; i++) {
        cabinInputs[i].addEventListener("change", function () {
            document.querySelector(".cabin_value span").innerHTML = getCabinSector();
        });
    }

    document.querySelector("#name").addEventListener("change", function () {
        document.querySelector(".name_value span").innerHTML = document.querySelector("#name").value;
    });

    document.querySelector("#price").addEventListener("change", function () {
        document.querySelector(".price_value span").innerHTML = document.querySelector("#price").value + "£";
    });
};

let survived;

function handleFormData() {
    let nameValue = document.getElementById("name").value;

    let age = parseInt(document.getElementById("age").value);

    let gender_manValue = document.getElementById("gender_man").checked;
    let gender_womanValue = document.getElementById("gender_woman").checked;
    let gender;
    if (gender_manValue && !gender_womanValue) {
        gender = "male";
    } else {
        gender = "female";
    }

    let tclass_1Value = document.getElementById("tclass_1");
    let tclass_2Value = document.getElementById("tclass_2");
    let tclass_3Value = document.getElementById("tclass_3");
    let tclass;
    if(tclass_1Value.checked && !tclass_2Value.checked && !tclass_3Value.checked){
        tclass = parseInt(tclass_1Value.value);
    }else if(!tclass_1Value.checked && tclass_2Value.checked && !tclass_3Value.checked){
        tclass = parseInt(tclass_2Value.value);
    }else{
        tclass = parseInt(tclass_3Value.value);
    }

    let priceValue = parseFloat(document.getElementById("price").value);

    let cabinSector = getCabinSector();

    let sib_sp = parseInt(document.getElementById("sib_sp").value);

    let child_par = parseInt(document.getElementById("child_par").value);

    let port_1Value = document.getElementById("port_cherbourg");
    let port_2Value = document.getElementById("port_queenstown");
    let port_3Value = document.getElementById("port_southampton");
    let port;
    if(port_1Value.checked && !port_2Value.checked && !port_3Value.checked){
        port = port_1Value.value;
    }else if(!port_1Value.checked && port_2Value.checked && !port_3Value.checked){
        port = port_2Value.value;
    }else{
        port = port_3Value.value;
    }


    let passenger = {
        "Name": nameValue,
        "Age": age,
        "Sex": gender,
        "Pclass": tclass,
        "Fare": priceValue,
        "Cabin": cabinSector,
        "SibSp": sib_sp,
        "Parch": child_par,
        "Embarked": port,
    };

    survived = didThePassengerSurvive(passenger);
    console.log(passenger);
}

function getCabinSector(){
    let cabinSector;
    let cabinSector_1 = document.getElementById("cabinSector_1");
    let cabinSector_2 = document.getElementById("cabinSector_2");
    let cabinSector_3 = document.getElementById("cabinSector_3");
    let cabinSector_4 = document.getElementById("cabinSector_4");
    let cabinSector_5 = document.getElementById("cabinSector_5");
    let cabinSector_6 = document.getElementById("cabinSector_6");
    
    if(cabinSector_1.checked && !cabinSector_2.checked && !cabinSector_3.checked && !cabinSector_4.checked && !cabinSector_5.checked && !cabinSector_6.checked){
        cabinSector = cabinSector_1.value;
    }else if(!cabinSector_1.checked && cabinSector_2.checked && !cabinSector_3.checked && !cabinSector_4.checked && !cabinSector_5.checked && !cabinSector_6.checked){
        cabinSector = cabinSector_2.value;
    }else if(!cabinSector_1.checked && !cabinSector_2.checked && cabinSector_3.checked && !cabinSector_4.checked && !cabinSector_5.checked && !cabinSector_6.checked){
        cabinSector = cabinSector_3.value;
    }else if(!cabinSector_1.checked && !cabinSector_2.checked && !cabinSector_3.checked && cabinSector_4.checked && !cabinSector_5.checked && !cabinSector_6.checked){
        cabinSector = cabinSector_4.value;
    }else if(!cabinSector_1.checked && !cabinSector_2.checked && !cabinSector_3.checked && !cabinSector_4.checked && cabinSector_5.checked && !cabinSector_6.checked){
        cabinSector = cabinSector_5.value;
    }else{
        cabinSector = cabinSector_6.value;
    }
    return cabinSector;
}

function handleAIResult(){
    fadeOutFormAndSubmitButton();
    playTitanicAnimation();
    setTimeout(() => {
        if(survived){
            console.log("survived");
            survivedAnimation();
        }else{
            console.log("not survived");
            notSurvivedAnimation();
        }
    }, 10000);
    /* setTimeout(() => {
        location.reload(); 
    }, 60000); */
}

function playTitanicAnimation(){
    document.querySelector("#titanicWrapper").style.animation = "shipping 10s ease-in forwards";
    showSmoke();
    setTimeout(() => {
        document.querySelector("#iceberg").style.animation = "icebergMovement 9s ease-in forwards";
        setTimeout(() => {
            hideSmoke();
            breakTitanic();
        }, 9000);
    }, 1000);
}

function survivedAnimation(){
    moveLifeBoat();
    let text = document.querySelector("#survivedText");
    setTimeout(() => {
        text.style.pointerEvents = "auto";
        text.animate(
            { opacity: ["0", "1"] },
            { duration: 1000, iterations: 1, easing: "ease-out" }
        ).onfinish = (e) => {
            e.target.effect.target.style.opacity = "1";
        };
    }, 1000);    
}

function notSurvivedAnimation(){
    playSharkAnimations();
    let text = document.querySelector("#notSurvivedText");
    setTimeout(() => {
        text.style.pointerEvents = "auto";
        text.animate(
            { opacity: ["0", "1"] },
            { duration: 1000, iterations: 1, easing: "ease-out" }
        ).onfinish = (e) => {
            e.target.effect.target.style.opacity = "1";
        };
    }, 1000);    
}

function playSharkAnimations(){
    document.querySelectorAll(".shark").forEach((ele)=>{
        ele.style.opacity = "1";
        ele.style.pointerEvents = "auto";
        ele.style.animation = "moveShark "+ 25 * (Math.random() * 2 + 1) +"s ease-in "+(Math.random() * 20 + 3)+"s forwards";
    });
}

function moveLifeBoat(){
    document.querySelectorAll(".lifeboat").forEach((ele)=>{
        ele.style.visibility = "visible";
        ele.style.animation = "moveLifeBoat 25s ease-in forwards";
    });
}

function showSmoke(){
    document.querySelector(".chimney-smoke").style.animation = "smoke 3.5s infinite ease-out";
    document.querySelectorAll(".chimney-smoke-box ").forEach((ele)=>{
        ele.style.visibility = "visible";
    });
}

function hideSmoke(){
    document.querySelectorAll(".chimney-smoke-box ").forEach((ele)=>{
        ele.style.visibility = "hidden";
    });
    document.querySelector(".chimney-smoke").style.animation = "none";
}

function breakTitanic(){
    document.querySelector("#titanic").style.visibility = "hidden";
    document.querySelector("#titanicPartLeft").style.animation = "sinkLeftPart 8s ease-in forwards";
    document.querySelector("#titanicPartRight").style.animation = "sinkRightPart 8s ease-in forwards";
}

function fadeOutFormAndSubmitButton() {
    document.querySelector("#boardingPass").animate(
        { left: ["50%", "-100%"] },
        { duration: 5000, iterations: 1, easing: "ease-out" }
    ).onfinish = (e) => {
        e.target.effect.target.style.left = "-100%";
        e.target.effect.target.style.display = "none";
    };
}