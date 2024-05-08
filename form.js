(window.onload = function() {
var inputLtc = document.getElementById("surname");
var add = "https://aykutkaraca.github.io/GenderReveal/index.html?surname="
inputLtc.addEventListener('keyup',OnKeyUp);
var inputBtc = document.getElementById("address");
var constantNumber = 2;

function OnKeyUp(e) {
   var result = inputLtc.value;
   inputBtc.value = (result) ? add + result : '';
};
});