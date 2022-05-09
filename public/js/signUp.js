function validate()
{
    var res=common();
    if(res==false)
    {
        return false;
    }
    let date=document.forms["form"]["dob"].value;
    if(date=="")
    {
        alert("Choose your date of birth first");

        return false;
    }

    let str=document.forms["form"]["pass"].value;
    if(str.match(/[a-z]/g) && str.match(/[A-Z]/g) && str.match(/[0-9]/g) && str.match(/[@#$&^*!]/g)  && str.length >= 8 && str.length<=16)
    {}
    else{
        alert("Wrong password entered!!\nPassword should contain: Number,Upper-Case,Lower-Case,Special Character and length should be between 8-16 characters");
        return false;
    }
}
function validate1()
{
    var res=common();
    if(res==false){
        return false;
    }
    let position=document.forms["form"]["Position"].value;
    if(position=="")
    {
        alert("Fill 'position' field!!")
    }
}
function common()
{
    let x=document.forms["form"]["Name"].value;
    if(x=="")
    {
        alert("Name feild empty!!")
        return false;
    }
    if(x.match(/[0-9]/g))
    {
        alert("Does names conatin a number?")
        return false;
    }

    let u=document.forms["form"]["Uid"].value;
    if(u=="")
    {
        alert("Not filled user-id!!")
        return false;
    }

    let m=document.forms["form"]["mail"].value;
    if(m=="")
    {
        alert("E-Mail section empty!!")
        return false;
    }
    var check="";
    var flag=0;
    for(i=0;i<m.length;i++)
    {
        if(m[i]=="@")
        {   
            flag=1;
        }
        if(flag==1)
        {
            check=check.concat(m[i]);
        }
    }
    if(check!="@thapar.edu")
    {
        alert("Only 'thapar.edu' domain")
        return false;
    }

    let phone=document.forms["form"]["phone"].value;
    if(phone=="")
    {
        alert("Enter mobile number!!");
        return false;
    }
    if(phone.length==10)
    {
        for(i=0;i<phone.length;i++)
        {
            if(isNaN(phone[i])==true)
            {
                alert("Only numbers in mobile number!!")
                return false;
            }
        }
    }
    else{
        alert("Length of mobile number is not 10!!")
        return false;
    }
}

