document.addEventListener("DOMContentLoaded", init, false);
function init(){
  var canvas = document.getElementById("canvas");
  canvas.addEventListener("mousedown", getPosition, false);
}

function getPosition(event)
{

  var x = new Number();
  var y = new Number();
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');

  x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
  y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  function drawRect(){
    context.beginPath();
    context.strokeRect(x,y,30,30);			
    context.stroke();
  }

  function drawCircle() {
    context.beginPath();
    context.arc(x,y,5,1,80);
    context.stroke();
  }

  //drawRect();
  drawCircle();


}
