function validate()
{
    let name=document.forms["form"]["name"].value;
    if(name=="")
    {
        alert("Fill name first");
        return false;
    }
    let x=document.forms["form"]["rate"].value;
    if(x=="")
    {
        alert("Fill the rating first");
        return false;
    }
}