window.onload = function () {
    document.querySelector("form#passagerForm").addEventListener("submit", (e) => {
        e.preventDefault();
        let nameValue = document.getElementById("name").value;
        let gender_menValue = document.getElementById("gender_men").checked;
        let gender_womenValue = document.getElementById("gender_women").checked;
        let gender;
        if (gender_menValue) {
            gender = "male";
        }else{
            gender = "female";
        }

        let tclass_1Value = document.getElementById("tclass_1").checked;
        let tclass_2Value = document.getElementById("tclass_2").checked;
        let tclass_3Value = document.getElementById("tclass_3").checked;



        let passenger = {
            "name": nameValue,
            "gender": gender,
        };
        
        console.log(passenger);
    });
};