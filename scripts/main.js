(function() {

    // ES. 1
    var test1 = $('#test1');
    var scaleCurve1 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
    var squashCurve1 = mojs.easing.path('M0,100.004963 C0,100.004963 25,147.596355 25,100.004961 C25,70.7741867 32.2461944,85.3230873 58.484375,94.8579105 C68.9280825,98.6531013 83.2611815,99.9999999 100,100');

    var thumb = new mojs.Tween({
        repeat: 0,
        delay: 0,
        duration: 500,
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
    var elSpan2 = test3.find('span');
    var scaleCurve3 = mojs.easing.path('M0,100 L25,55.9999983 C26.2328835,42.0708847 78.7847843,0 99,0');
    var timeline2 = new mojs.Timeline();

    class Heart extends mojs.CustomShape {
        getShape() {
            return `<path d="M92.5939814,7.35914503 C82.6692916,-2.45304834 66.6322927,-2.45304834 56.7076029,7.35914503 L52.3452392,11.6965095 C51.0327802,12.9714696 48.9328458,12.9839693 47.6203869,11.6715103 L47.6203869,11.6715103 L43.2705228,7.35914503 C33.3833318,-2.45304834 17.3213337,-2.45304834 7.43414268,7.35914503 C-2.47804756,17.1963376 -2.47804756,33.12084 7.43414268,42.9205337 L29.7959439,65.11984 C29.7959439,65.1323396 29.8084435,65.1323396 29.8084435,65.1448392 L43.2580232,78.4819224 C46.9704072,82.1818068 52.9952189,82.1818068 56.7076029,78.4819224 L70.1696822,65.1448392 C70.1696822,65.1448392 70.1696822,65.1323396 70.1821818,65.1323396 L92.5939814,42.9205337 C102.468673,33.12084 102.468673,17.1963376 92.5939814,7.35914503 L92.5939814,7.35914503 Z"></path>`;
        }
    }
    mojs.addShape('heart', Heart);

    var anim4 = new mojs.Shape({
        parent: test3,
        shape: 'heart',
        fill: 'rgba(255, 32, 110, 1)',
        stroke: 'rgba(255, 32, 110, 1)',
        strokeWidth: 10,
        duration: 500,
        repeat: 0,
        delay: 0,
        scale: 0,
        easing: scaleCurve3
    }).then({
        strokeWidth: 5,
        fill: 'transparent',
        scale: { to: 0.5 }
    }).then({
        strokeWidth: 0,
        scale: { to: 0.7 }
    });

    var anim5 = new mojs.Burst({
        parent: test3,
        shape: 'circle',
        stroke: 'yellow',
        fill: 'deeppink',
        strokeWidth: 1,
        delay: 0,
        duration: 1000,
        opacity: 1,
        scale: 1,
        children: {
            shape: 'polygon',
            fill: 'deeppink',
            radius: { 20: 0 },
            angle: { 0: 90 },
        },
        radius: { 20: 80 },
        count: 6,
        easing: scaleCurve3
    });

    var anim6 = new mojs.Tween({
        duration: 1500,
        onUpdate: function(progress) {
            var scaleProgress2 = scaleCurve2(progress);
            elSpan2[0].style.WebkitTransform = elSpan2[0].style.transform = 'scale3d(' + scaleProgress2 + ',' + scaleProgress2 + ',1)';
        }
    });

    timeline2.add(anim4, anim5, anim6);

    test3.on('click', function() {
        timeline2.replay();
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

