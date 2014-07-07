document.addEventListener("DOMContentLoaded", init, false);

var lastClick=[0,0];
var numOfClicks=0;
var colors = ["#e2c9b9","#4b9484","#434f7b","#b5e622","#ffbf00"];
var colorsLength=colors.length;
function init()
{
  var check=0
  var canvas = document.getElementById("canvas");
  var rectButton = document.getElementById('rectButton');
  var circleButton = document.getElementById('circleButton');
  var lineButton = document.getElementById('lineButton');
  var colorButton = document.getElementById('colorButton');

  colorButton.onclick = function(){
    switchColor();
  }

  rectButton.onclick = function(){
    canvas.removeEventListener("click",drawCircle,false);
    canvas.removeEventListener("click",drawLine,false);
    canvas.addEventListener("click",drawRect,false);
  }
  circleButton.onclick=function(){
   canvas.removeEventListener("click",drawLine,false);
   canvas.removeEventListener("click",drawRect,false);
   canvas.addEventListener("click",drawCircle,false); 
 }
 lineButton.onclick=function(){
  canvas.removeEventListener("click",drawRect,false);
  canvas.removeEventListener("click",drawCircle,false);
   canvas.addEventListener("click",drawLine,false);
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


function drawLine(event){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
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

 function switchColor(){
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext('2d');
        //var colorDiv =document.getElementById("showColor");
        
        randomColor=Math.floor((Math.random() * colorsLength)); 
        var color = 'background:'+colors[randomColor]+';';
        console.log(color);
        //colorDiv.style='background:'+randomColor+';';
        document.getElementById("showColor").style=color;
        console.log(colors[randomColor]);
        context.strokeStyle=colors[randomColor];
    }


