document.addEventListener("DOMContentLoaded", init, false);

function init()
{
  var canvas = document.getElementById("canvas");
  var rectButton = document.getElementById('rectButton');
  var circleButton = document.getElementById('circleButton');

  rectButton.onclick = function(){
    canvas.addEventListener("click",drawRect,false);
  }
  circleButton.onclick=function(){
   canvas.addEventListener("click",drawCircle,false); 
 }
}

function getPosition(event)
{
 var x = new Number();
 var y = new Number();
 var canvas = document.getElementById("canvas");
 var context = canvas.getContext('2d');

 x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
 y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
 return [x,y];
}

function drawRect(event){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  x=getPosition(event)[0] - canvas.offsetLeft;
  y=getPosition(event)[1] - canvas.offsetTop;
  context.beginPath();
  context.strokeRect(x,y,30,30);  
  context.stroke();
}

function drawCircle(event) {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  x=getPosition(event)[0] - canvas.offsetLeft;
  y=getPosition(event)[1] - canvas.offsetTop;
  context.beginPath();
  context.arc(x,y,5,1,80);
  context.stroke();
}


