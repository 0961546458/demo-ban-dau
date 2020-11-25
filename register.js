

var fields = {
    email: {
        message: "Phai nhap dung dinh dang email",
        required: "Email phai duoc nhap",
        isEmail: "Email chua dung dinh dang"
    },
    password: {
        required: "Password ko duoc de trong"
    },
    verify: {
        required: "Password verify ko duoc de trong",
        noMatch: ["Password do not match", "password"]
    },
    //*   *//
    first_name: {
        required: "first name ko duoc de trong"
    },
    last_name: {
        required: "last name ko duoc de trong"
    },
    zip: {
        message: "Phai nhap dung dinh dang zip",
        required: "zip phai duoc nhap",
        isZip: "zip chua dung dinh dang"
    },
    card_number: {
        message: "Phai nhap dung dinh dang card number",
        required: "card number phai duoc nhap",
        isCard_number: "card number chua dung dinh dang"
    },
    exp_date: {
        message: "Phai nhap dung dinh dang exp date",
        required: "exp date phai duoc nhap",
        isExp_date: "exp date chua dung dinh dang"
    }
    
}

function $(idname) {
    return document.getElementById(idname);
}

var navigate = {
    showResults: function(){
        $("registration_form").className = "hide";
        $("registration_result").className = "show";
    },
    showForm: function(){
        $("registration_form").className = "show";
        $("registration_result").className = "hide";
    },
    //*  *//
    reset: function(){
        $("email").value = "";
        
        $("password").value = "";
        
        $("verify").value = "";
        
        $("first_name").value = "";
        
        $("last_name").value = "";
        
        $("zip").value = "";
        
        $("card_number").value = "";
        
        $("exp_date").value = "";
        
        $("card_type").value = "v";
    }
}

var Validate = function(){};

Validate.prototype.isBlank = function(text){
    return (text == "");
}

Validate.prototype.isMatch = function(text1, text2){
    return (text1 == text2);
}

Validate.prototype.isEmail = function(text){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (re.test(text));
}
//*     *//
Validate.prototype.isZip = function(text){
    var re = /^\d{5}(?:[-\s]\d{4})?$/;
    return (re.test(text));
}

Validate.prototype.isCard_number = function(text){
    var re = /\d{4}-?\d{4}-?\d{4}-?\d{4}/;
    return (re.test(text));
}

Validate.prototype.isExp_date = function(text){
    var re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return (re.test(text));
}




var RegiterForm = function(){};

RegiterForm.prototype = new Validate();

RegiterForm.prototype.validateField = function(fieldName, text){
    var field = fields[fieldName];

    if(field.required){
        if(this.isBlank(text)) {
            throw new Error(field.required)
        }
    }

    if(field.noMatch){
        if(!this.isMatch(text, $(field.noMatch[1]).value)){
            throw new Error(field.noMatch[0])
        }
    }

    if(field.isEmail){
        if(!this.isEmail(text)) {
            throw new Error(field.isEmail)
        }  
    }
    //*  *//
    if(field.isZip){
        if(!this.isZip(text)) {
            throw new Error(field.isZip)
        }
    }
    if(field.isCard_number){
        if(!this.isCard_number(text)) {
            throw new Error(field.isCard_number)
        }
    }
    if(field.isExp_date){
        if(!this.isExp_date(text)) {
            throw new Error(field.isExp_date)
        }
    }
}


RegiterForm.prototype.setError = function(fieldName, message){
    $(fieldName + "_error").innerText = message;
    $(fieldName + "_error").className = "error";
}


RegiterForm.prototype.clearError = function(fieldName, message){
    $(fieldName + "_error").innerText = message || "";
    $(fieldName + "_error").className = "";
}

RegiterForm.prototype.validateForm = function(){
    var isok = true;
    for(var fieldName in fields ){
        try{
            this.validateField(fieldName, $(fieldName).value);
            this.clearError(fieldName, '');
        } catch(error){
            isok = false;
            this.setError(fieldName, error.message)
        }
    }
    return isok;
}


window.onload = function(){
    regiterForm = new RegiterForm();
    $("register").onclick = function(){
        if(regiterForm.validateForm()){
            navigate.showResults();
        } else {
            navigate.showForm();
        }
    }
    //*  *//
    $("reset").onclick = function(){
        navigate.reset();
    }
    
    $("back").onclick = function(){
        navigate.showForm();
    }
}
