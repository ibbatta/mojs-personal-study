(function() {

    // ES. 1
    var test1 = $('#test1');
    var scaleCurve1 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
    var squashCurve1 = mojs.easing.path('M0,100.004963 C0,100.004963 25,147.596355 25,100.004961 C25,70.7741867 32.2461944,85.3230873 58.484375,94.8579105 C68.9280825,98.6531013 83.2611815,99.9999999 100,100');

    var thumb = new mojs.Tween({
        repeat: 0,
        delay: 0,
        duration: 700,
        onUpdate: function(progress) {
            var translateProgress1 = scaleCurve1(progress),
                squashProgress1 = squashCurve1(progress),
                scaleX = 1 - 2 * squashProgress1,
                scaleY = 1 + 2 * squashProgress1;

            test1[0].style.transform = 'translateY(' + -70 * translateProgress1 + 'px) ' + 'scaleX(' + scaleX + ') ' + 'scaleY(' + scaleY + ')' + 'translateY(' + 0 + 'px)';
        },
        onComplete: function() {
            thumb.replayBackward();
            //test1[0].style.transform = 'translateY(' + 0 + 'px) ' + 'scaleX(' + 1 + ') ' + 'scaleY(' + 1 + ')' + 'translateY(' + 0 + 'px)';
        }
    });

    test1.on('click', function() {
        thumb.replay();
    });


    // ES. 2
    var test2 = $('#test2');
    var elSpan = test2.find('span');
    var scaleCurve2 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
    var timeline = new mojs.Timeline();

    var anim1 = new mojs.Burst({
        parent: test2,
        duration: 1000,
        shape: 'circle',
        fill: '#FBFF12',
        opacity: 1,
        childOptions: { radius: { 10: 0 } },
        radius: { 10: 70 },
        count: 12,
        isSwirl: true,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        isShowStart: true
    });

    var anim2 = new mojs.Transit({
        parent: test2,
        duration: 2000,
        type: 'circle',
        radius: { 0: 50 },
        fill: 'transparent',
        stroke: '#41EAD4',
        strokeWidth: { 10: 0 },
        opacity: { 1: 0 },
        easing: mojs.easing.bezier(0.1, 1, 0.5, 1),
        isShowStart: true
    });

    var anim3 = new mojs.Tween({
        duration: 1500,
        onUpdate: function(progress) {
            var scaleProgress2 = scaleCurve2(progress);
            elSpan[0].style.WebkitTransform = elSpan[0].style.transform = 'scale3d(' + scaleProgress2 + ',' + scaleProgress2 + ',1)';
        }
    });

    timeline.add(anim1, anim2, anim3);

    test2.on('click', function() {
        timeline.replay();
    });


    // ES. 3
    var test3 = $('#test3');
    var scaleCurve3 = mojs.easing.path('M0,100 L25,55.9999983 C26.2328835,42.0708847 78.7847843,0 99,0');

    var shape = new mojs.Shape({
        parent: test3,
        shape: 'rect',
        fill: 'none',
        stroke: 'cyan',
        radius: 10,
        strokeWidth: 20,
        angle: {
            [-180]: 0
        },

        duration: 600
    }).then({
        strokeWidth: 0,
        scale: { to: 2, easing: scaleCurve3 },
    });

    test3.on('click', function() {
        shape.replay();
    });

})();


// var el = document.querySelector('.icobutton');
// var elSpan = el.querySelector('span');

// var rect = new mojs.Shape({
//     shape: 'rect',
//     left: '50%',
//     fill: 'none',
//     scale: { 0: 1 },
//     radius: 50,
//     stroke: { '#FF006E': '#41EAD4' },
//     strokeWidth: { 10: 0 },
//     strokeDasharray: { '100%': '10%' },
//     strokeDashoffset: { '-100%': '100%' },
//     angle: { 0: 180 },
//     duration: 3000,
//     repeat: 0,
//     isShowStart: true
// }).play();

