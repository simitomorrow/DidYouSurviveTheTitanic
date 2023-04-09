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
    let gender_menValue = document.getElementById("gender_men").checked;
    let gender_womenValue = document.getElementById("gender_women").checked;
    let gender;
    if (gender_menValue && !gender_womenValue) {
        gender = "male";
    } else {
        gender = "female";
    }
    let tclass_1Value = document.getElementById("tclass_1").checked;
    let tclass_2Value = document.getElementById("tclass_2").checked;
    let tclass_3Value = document.getElementById("tclass_3").checked;
    let tclass;
    if(tclass_1Value && !tclass_2Value && !tclass_3Value){
        tclass = "vip";
    }else if(!tclass_1Value && tclass_2Value && !tclass_3Value){
        tclass = "firstClass";
    }else{
        tclass = "economic";
    }
    let priceValue = document.getElementById("price").value;
    

    let passenger = {
        "name": nameValue,
        "gender": gender,
        "tclass": tclass,
        "price": priceValue,
    };

    console.log(passenger);
}