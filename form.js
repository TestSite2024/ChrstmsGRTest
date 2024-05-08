(window.onload = function() {
var inputLtc = document.getElementById("surname");
var add = "https://aykutkaraca.github.io/GenderReveal/index.html?surname="
inputLtc.addEventListener('keyup',OnKeyUp);
var inputBtc = document.getElementById("address");
inputBtc.value = add;
var constantNumber = 2;

function OnKeyUp(e) {
   var result = inputLtc.value;
   if (result){
      result = add + result.charAt(0).toUpperCase() + result.slice(1);
   } else {
      result=add;
   }
   inputBtc.value = result;
};
});