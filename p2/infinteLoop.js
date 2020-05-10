TweenMax.set('svg', {
	visibility: 'visible'
})
TweenMax.set('.dot', {
	transformOrigin: '50% 50%'
})
TweenMax.set('#switch', {
	rotation: -99.7,
	transformOrigin: '50% 50%'
})

var bezier = MorphSVGPlugin.pathDataToBezier('.path')
TweenLite.defaultEase = Elastic.easeOut.config(0.1, 0.8);
let tl = new TimelineMax({repeat: -1}).timeScale(1.6);
tl.to('.dot', 4, {
	bezier: {
      type: "cubic",
      values: bezier,
      autoRotate: false
    },
	ease: Linear.easeNone,
	repeat: 1
})
.to('#switch', 0.5, {
	rotation: 0
}, 1.5)

.to('#switch', 0.5, {
	rotation: 80
}, 3.5)
.to('#switch', 0.5, {
	rotation: 180
}, 5.5)
.to('#switch', 0.5, {
	rotation: 260
}, 7.5)

//TweenMax.globalTimeline.timeScale(0.25)