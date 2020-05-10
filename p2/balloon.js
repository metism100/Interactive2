//balloon
function balloonGrow(){
  var balloon = $("#balloon")[0];
  var radius = balloon.getAttribute("r");
  var cySet = balloon.getAttribute("cy");
  balloon.setAttribute('r', parseInt(radius) + 10);
  balloon.setAttribute('cy', parseInt(cySet) - 10);
  if (parseInt(radius) > 125) {
    ion.sound.play("balloon-pop3");
    var balloonTl = new TimelineMax();
    balloonTl.add("pop");
    balloonTl.to("#balloon", 0.05, {
      scale: 5,
      opacity: 0,
      transformOrigin: "50% 50%",
      ease: Circ.easeOut
    }, "pop");
    balloonTl.fromTo("#balloon", 0.05, {
      opacity: 0,
      scale: 1
    }, {
      opacity: 1,
      scale: 1,
      transformOrigin: "50% 50%",
      ease: Circ.easeIn
    }, "pop+=0.2");
    balloonTl.fromTo("#balburst polygon", 0.6, {
        opacity: 1,
        y: 0,
        rotation: 0
        }, {
        rotation: 500,
        y: 100,
        opacity: 0,
        ease:Expo.easeOut
    }, "pop");
    setTimeout(function(){
      balloon.setAttribute("r", "45");
      balloon.setAttribute("cy", "233.5");
    }, 200);
  }
}

//colors one
function colorsOne() {
  var sceneChange = new TimelineMax();
    sceneChange.add("sch");
    sceneChange.to(allP, 1, {
      fill: "hsl(+=20%, +=5%, -=20%)",
      ease: Circ.easeOut
    }, "sch");
    sceneChange.to(allP, 1, {
      fill: "hsl(-=20%, -=5%, +=20%)",
      ease: Circ.easeIn
    }, "sch+=1.3");
  sceneChange.to(".st14", 1, {
      opacity: 0.1,
      ease: Circ.easeOut
    }, "sch");
    sceneChange.to(".st14", 1, {
      opacity: 1,
      ease: Circ.easeIn
    }, "sch+=1.3");
}

//colors two
function colorsTwo() {
  var colorChange = new TimelineMax();
  colorChange.add("col");
  colorChange.to(allP, 1.5, {
    fill: "hsl(+=50%, -=5%, -=20%)",
    ease: Circ.easeOut
  }, "col");
  colorChange.to(allP, 2, {
    fill: "hsl(-=50%, +=5%, +=20%)",
    ease: Circ.easeIn
  }, "col+=1.6");
}

// init bunch of sounds
ion.sound({
    sounds: [
        {name: "butterflies5"},
        {name: "hit2"},
        {name: "hit3"},
        {name: "hit4"},
        {name: "hit5"},
        {name: "hit6"},
        {name: "hit7"},
        {name: "hit8"},
        {name: "hit9"},
        {name: "hit10"},
        {name: "paperplane3"},
        {name: "yawn1"},
        {name: "balloon-pop3"}
    ],

    // main config
    path: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/",
    preload: true,
    multiplay: true,
    volume: 0.9
});

//desktop keyboard
$(document).keydown(function(e) {
    switch(e.which) {
        
        case 65: // a
          ion.sound.play("hit2");
          lightning.restart();
        break;
        
        case 70: // f
        //balloon
          balloonGrow();
          ion.sound.play("hit4");
        break;
        
        case 83: // s
          colorsOne();
          ion.sound.play("hit3");
        break;
        
        case 186: // semicolon
          colorsTwo();
          ion.sound.play("hit5");
        break;
        
        case 75: // k
          setTimeout(function(){
            ion.sound.play("butterflies5");
          }, 100);
          insect.restart();
        break;
        
        case 74: // j
          ion.sound.play("hit6");
          flower.restart();
        break;
        
        case 76: // l
          ion.sound.play("paperplane3");
          TweenMax.fromTo($("#paper"), 2, {
            x: 0,
            y: 0 
            }, {
            bezier:{
              type:"soft", 
              values:[{x:-300, y:-35}, {x:-600, y:-15}, {x:-900, y:20}, {x:-1200, y:0}, {x:-1400, y:20}]
            },
          ease:Power3.easeOut});
        break;
        
        case 68: // d
          ion.sound.play("yawn1");
          yawn.restart();
        break;
          
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent scrolling with arrows
});

//make the keyboard visible to mobile devices through insanely long and arguably horrible regex
window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

if ( window.mobileAndTabletcheck() === true ) {
  $("h1").css("display", "none");
  TweenMax.to("h2", 1, {
    opacity: 0,
    delay: 4,
    ease: Circ.easeOut
  });
  
   $("#k1").on("click", function() {
      ion.sound.play("hit2");
      lightning.restart();
    });
        
   $("#k2").on("click", function() {
      balloonGrow();
      ion.sound.play("hit4");
    });
        
   $("#k3").on("click", function() {
      colorsOne();
      ion.sound.play("hit3");
    });
        
   $("#k4").on("click", function() {
      colorsTwo();
      ion.sound.play("hit5");
    });
        
   $("#k5").on("click", function() {
      ion.sound.play("butterflies5");
      insect.restart();
    });
        
   $("#k6").on("click", function() {
      ion.sound.play("hit6");
      flower.restart();
    });
        
   $("#k7").on("click", function() {
      ion.sound.play("paperplane3");
      TweenMax.fromTo($("#paper"), 2, {
        x: 0,
        y: 0 
        }, {
        bezier:{
          type:"soft", 
          values:[{x:-300, y:-35}, {x:-600, y:-15}, {x:-900, y:20}, {x:-1200, y:0}, {x:-1400, y:20}]
        },
      ease:Power3.easeOut});
    });
        
   $("#k8").on("click", function() {
        ion.sound.play("yawn1");
        yawn.restart();
    });
}

