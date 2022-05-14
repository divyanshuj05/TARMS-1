document.getElementById("myDate").innerHTML=getDate();
function getDate()
{
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    let tom=tomorrow.toISOString().slice(0, 10);
    return tom;
}
function validate()
{
    let x=document.getElementById("myDate").value;
    let today = new Date().toISOString().slice(0, 10);
    if(today>x)
    {
        alert('Wrong date entered');
        return false;
    }
}

