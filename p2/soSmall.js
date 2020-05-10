var hole = document.getElementById('hole'),
    tapcounter = document.getElementById('tapcounter'),
    originalHeight = hole.offsetHeight,
    small = document.getElementById('small'),
    holeHeight = hole.offsetHeight,
    holeWidth = hole.offsetWidth,
    started = false,
    i = 0,
    y = 0;

hole.addEventListener("click", handler);
hole.onclick = function(){
  i++;
  holeHeight = holeHeight + 100;
  holeWidth = holeWidth + 100;
  hole.style.width = holeWidth + "px";
  hole.style.height = holeHeight + "px";
  hole.style.transition = 'all linear 1s';
  
  tapcounter.innerHTML = i;
}




function handler(e) {
  e.target.removeEventListener(e.type, arguments.callee);

  setInterval(function(){  
    checkForChanges();
    y = i;
  },500);

}

function checkForChanges(){
  if(i === y && originalHeight != holeHeight ){
    holeHeight = holeHeight - 100;
    holeWidth = holeWidth - 100;
    hole.style.width = holeWidth + "px";
    hole.style.height = holeHeight + "px";
    hole.style.transition = 'all linear 500ms';
  }

  if(originalHeight != holeHeight){

    small.style.opacity = 0;
  } else {
    small.style.opacity = 1;
  }
}