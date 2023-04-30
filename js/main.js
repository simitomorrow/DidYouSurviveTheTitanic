window.onload = function () {
    document.querySelector("form#passagerForm").addEventListener("submit", (e) => {
        e.preventDefault();
        handleFormData();
        handleAIResult();
    });

    document.querySelector("#submitButton").addEventListener("click", () => {
        handleFormData();
        handleAIResult();
    });

    const formInputs = document.querySelectorAll("form#passagerForm input[type=text], form#passagerForm input[type=number]");
    for (let i = 0; i < formInputs.length; i++) {
        updateBoardingPass(formInputs[i].id, formInputs[i].value);
        formInputs[i].addEventListener("change", function () {
            updateBoardingPass(formInputs[i].id, formInputs[i].value);
        });
        formInputs[i].addEventListener("focusout", function () {
            updateBoardingPass(formInputs[i].id, formInputs[i].value);
        });
    }

    const formSelects = document.querySelectorAll("form#passagerForm select");
    for (let i = 0; i < formSelects.length; i++) {
        updateBoardingPass(formSelects[i].id, formSelects[i].options[formSelects[i].selectedIndex].text);
        formSelects[i].addEventListener("change", function () {
            updateBoardingPass(formSelects[i].id, formSelects[i].options[formSelects[i].selectedIndex].text);
        });
        formSelects[i].addEventListener("focusout", function () {
            updateBoardingPass(formSelects[i].id, formSelects[i].options[formSelects[i].selectedIndex].text);
        });
    }

    const formRadios = document.querySelectorAll("form#passagerForm .input-wrapper.radio");
    for (let i = 0; i < formRadios.length; i++) {
        formRadios[i].querySelectorAll("input[type=radio]").forEach(function (item) {
            if(item.checked){
                updateBoardingPass(item.name, document.querySelector("label[for="+item.id+"]").innerHTML);
            }
        });
        formRadios[i].addEventListener("change", function () {
            formRadios[i].querySelectorAll("input[type=radio]").forEach(function (item) {
                if(item.checked){
                    updateBoardingPass(item.name, document.querySelector("label[for="+item.id+"]").innerHTML);
                }
            });
        });
        formRadios[i].addEventListener("focusout", function () {
            formRadios[i].querySelectorAll("input[type=radio]").forEach(function (item) {
                if(item.checked){
                    updateBoardingPass(item.name, document.querySelector("label[for="+item.id+"]").innerHTML);
                }
            });
        });
    }
};

function updateBoardingPass(selector, value){
    document.querySelector(".boradingPass-right-content ." + selector + "_value span").innerHTML = value;
}

function handleFormData() {
    let nameValue = document.getElementById("name").value;

    let age = document.getElementById("age").value;

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
        tclass = tclass_1Value.value;
    }else if(!tclass_1Value.checked && tclass_2Value.checked && !tclass_3Value.checked){
        tclass = tclass_2Value.value;
    }else{
        tclass = tclass_3Value.value;
    }

    let priceValue = document.getElementById("price").value;
    
    var cabinSector = document.getElementById("cabinSector").value;

    let sib_sp = document.getElementById("sib_sp").value;

    let child_par = document.getElementById("child_par").value;

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
        "name": nameValue,
        "age": age,
        "gender": gender,
        "tclass": tclass,
        "price": priceValue,
        "cabinSector": cabinSector,
        "sib_sp": sib_sp,
        "child_par": child_par,
        "port": port,
    };

    console.log(passenger);
}

let survived = false;

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

function fadeOutFormAndSubmitButton(){
    let elems = [document.querySelector("#submitButton"), document.querySelector("#boardingPass-wrapper")];
    elems.forEach((ele)=>{
        ele.animate(
            { opacity: ["1", "0"] },
            { duration: 1000, iterations: 1, easing: "ease-out" }
        ).onfinish = (e) => {
            e.target.effect.target.style.opacity = "0";
            e.target.effect.target.style.display = "none";
        };
    });
}