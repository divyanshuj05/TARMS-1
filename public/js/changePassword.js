function validate()
{
    let x=document.getElementById("oldPass").value;
    if(x=="")
    {
        alert("Current password not entered!!")
        return false;
    }

    let y=document.getElementById("newPass").value;
    if(y=="")
    {
        alert("New password not entered!!")
        return false;
    }
    if(y.match(/[a-z]/g) && y.match(/[A-Z]/g) && y.match(/[0-9]/g)  && y.length >= 8 && y.length<=16 && y.match(/[@#$&^*!]/g))
    {}
    else{
        alert("Wrong password entered!!\nUpperCase, LowerCase, Number, Special Character and length 8-16");
        return false;
    }

    let z=document.getElementById("SancNewPass").value;
    if(z=="")
    {
        alert("Retype new password!!")
        return false;
    }

    if(x==y)
    {
        alert("Current and new passwords are just the same");
        return false;
    }
    if(y!=z)
    {
        alert("New passwords do not match!!");
        return false;
    }
}