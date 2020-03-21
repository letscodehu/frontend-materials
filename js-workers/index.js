
    if('animationWorklet' in CSS) {
        CSS.animationWorklet.addModule('./animator.js').then(function () {
            
var worklet = new WorkletAnimation(
    'passthrough',  // name of animator
    new KeyframeEffect(
        document.querySelector('.box'),
        [
            {
                transform: 'rotate(0)'
            },
            {
                transform: 'rotate(360deg)'
            }
        ],
        {  
            duration: 2000,
            iterations: Number.POSITIVE_INFINITY
        }
    ),
    document.timeline,  // timeline
    {}   // registerAnimator options
);
worklet.play();

            });
    }
   
     