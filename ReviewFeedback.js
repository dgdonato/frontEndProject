
//created a submit button where a pop up will display a message and data will clear upon clicking "Ok"

document.getElementById("button").addEventListener("click", myFunction)

function myFunction() {
  let text = "Thank You For Your Honest Feedback!!!";
  if (confirm(text) == true) {
    text = "&#128522; Hooray Your Review/Feedback Has Been Successfully Submitted!!! &#128522;";
    document.getElementById("data1").value = "";
    document.getElementById("data2").value = "";   
} else {
    text = "";
  } 
  document.getElementById("pop up message").innerHTML = text;
} 