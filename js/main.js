window.onload = function () {
    document.querySelector("form#passagerForm").addEventListener("submit", (e) => {
        e.preventDefault();
        handleFormData();
    });
    document.querySelector("#submitButton").addEventListener("click", () => {
        handleFormData();
    });
};

function handleFormData() {
    let nameValue = document.getElementById("name").value;

    let age = document.getElementById("age").value;

    let gender_menValue = document.getElementById("gender_men").checked;
    let gender_womenValue = document.getElementById("gender_women").checked;
    let gender;
    if (gender_menValue && !gender_womenValue) {
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
    
    var cabinSector = document.getElementById("cabinSector");
    var cabinSectorValue = cabinSector.options[cabinSector.selectedIndex].text;

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
        "cabinSector": cabinSectorValue,
        "sib_sp": sib_sp,
        "child_par": child_par,
        "port": port,
    };

    console.log(passenger);
}