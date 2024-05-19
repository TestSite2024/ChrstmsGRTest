(window.onload = function() {
var inputLtc = document.getElementById("Surname");
var add = "https://artisartstudio.github.io/BoyOrGirl/index.html?Surname="
inputLtc.addEventListener('keyup',OnKeyUp);
var inputBtc = document.getElementById("address");
inputBtc.textContent = add;
document.addEventListener("mousedown",function(e){
   var target = e.target;
 
   if(target.contains(inputBtc) && !inputLtc.value){
      //console.log("click");
      window.confirm("Please enter a surname!");
   }
});
var constantNumber = 2;

function OnKeyUp(e) {
   var result = inputLtc.value;
   if (result){
      result = add + result.charAt(0).toUpperCase() + result.slice(1);
   } else {
      result=add;
   }
   inputBtc.textContent = result;
   inputBtc.href= result;
   inputBtc.style.pointerEvents = "auto";
};


$("#emailLinkbtn").on("click", function(){
   txt_email = $("#emailSendLink").val()
   txt_link = $("#address").text()
   txt_surname = $("#Surname").val()
   $("#modalClose").trigger("click")
   var mail = document.createElement("a");
   mail.href = `mailto:${txt_email}?subject=Your link for ${txt_surname}-baby scratcher&body=${txt_link}`;
   mail.click();
   alert(`The link ${txt_link} is sent to ${txt_email}`)
 })
 $("#btnboy").on("change",function(event){
   let txt_link = $("#address").text()
   txt_link = txt_link.replace("?gnd=1","").replace("?gnd=2","")
   if ($(this).attr("checked")){      
      let gnd = "1"
      $("#address").text(`${txt_link}?gnd=${gnd}`)
   }
})
$("#btngirl").on("change",function(event){
   let txt_link = $("#address").text()
   txt_link = txt_link.replace("?gnd=1","").replace("?gnd=2","")
   if ($('#btngirl')[0].checked){
      let gnd = "2"
      $("#address").text(`${txt_link}?gnd=${gnd}`)
   }
 })
});