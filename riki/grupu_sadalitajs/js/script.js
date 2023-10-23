import {getData} from "./readForm.js";

let submit = document.form.submit;
submit.addEventListener("click", function (){
    let formId = document.form.formId.value;
    let groupAmount = document.form.groupAmount.value;

    if (formId === ""){
        alert("Formas ID ir obligāts lauks")
    }else if(groupAmount<2 && groupAmount>10){
        alert('Jābūt vismaz 2 grupām')
    }else{
        getData(formId, groupAmount);
    }
})