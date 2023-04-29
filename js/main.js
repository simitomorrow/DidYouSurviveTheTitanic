window.onload = function () {
    document.querySelector("form#passagerForm").addEventListener("submit", (e) => {
        e.preventDefault();
        handleFormData();
    });

    document.querySelector("#submitButton").addEventListener("click", () => {
        handleFormData();
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