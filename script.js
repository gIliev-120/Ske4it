
document.addEventListener("DOMContentLoaded", init, false);
var canvas;
var context;
var lastClick=[0,0];
var numOfClicks=0;

function init()
{
  canvas = document.getElementById("canvas");
  canvas.width = (window.innerWidth-13);
  canvas.height = (window.innerHeight-27);
  context = canvas.getContext('2d');
  var rectButton = document.getElementById('rectButton');
  var circleButton = document.getElementById('circleButton');
  var lineButton = document.getElementById('lineButton');
  var colorButton = document.getElementById('colorButton');
  var clearButton = document.getElementById('clearButton');

  var imported = document.createElement('script');
  imported.src = 'jscolor\\jscolor.js';
  document.body.appendChild(imported);

  colorButton.onclick = function(){
    switchColor(context);
  }
  clearButton.onclick=function(){
    canvas.width = canvas.width;
  }

  rectButton.onclick = function(){
  canvas.removeEventListener("click",drawCircle);
  canvas.removeEventListener("click",drawLine);
   canvas.addEventListener("click",drawRect);
  }

  circleButton.onclick=function(){
   canvas.removeEventListener("click",drawLine);
   canvas.removeEventListener("click",drawRect);
   canvas.addEventListener("click",drawCircle); 
  }

 lineButton.onclick=function(){
  canvas.removeEventListener("click",drawRect);
  canvas.removeEventListener("click",drawCircle);
  canvas.addEventListener("click",drawLine);
 }

function getPosition(event){
  var x = new Number();
  var y = new Number();

  x = event.clientX; 
  y = event.clientY; 
 
  return [x,y];
}

function drawRect(event){

  x=getPosition(event)[0] - canvas.offsetLeft;
  y=getPosition(event)[1] - canvas.offsetTop;

  context.beginPath();
  context.strokeRect(x,y,30,30);  
  context.stroke();
}

function drawCircle(event) {

  x=getPosition(event)[0] - canvas.offsetLeft;
  y=getPosition(event)[1] - canvas.offsetTop;

  context.beginPath();
  context.arc(x,y,5,1,80);
  context.stroke();
}


function drawLine(event){

 x=getPosition(event)[0] - canvas.offsetLeft;
  y=getPosition(event)[1] - canvas.offsetTop;
  
  
    //console.log(x);
    //console.log(y);

    if (numOfClicks != 1) {
      numOfClicks++;
    } else {
      context.beginPath();
      context.moveTo(lastClick[0], lastClick[1]);
      context.lineTo(x, y, 6);

      context.stroke();

      numOfClicks = 0;
    }
    
    lastClick = [x, y];

    //console.log(lastClick[0]);
    //console.log(lastClick[1]);
  }

  function switchColor(context){
    var myPicker = new jscolor.color(document.getElementById('colorButton'));
    var choosedColor=myPicker.toString();
    var convertedColor="#"+choosedColor+"";

    context.strokeStyle=convertedColor;
    }

}

