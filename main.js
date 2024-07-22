/**
 * This file controls the page logic
 *
 * depends on jQuery>=1.7
 */
var snow;
var rnd;
// locations of correct gender circles
var loc = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
// location of other gender which will give scratch further warning
var oloc = [[4,5,9],[1,2,7],[1,3,4],[3,5,8],[1,4,9],[1,2,7],[3,4,7],[1,2,6]];
var pct =new Array(9);
(function() {
    /**
     * Returns true if this browser supports canvas
     *
     * From http://diveintohtml5.info/
     */

    var color1 = '#ED0000';
    var color2 = '#00A44C';
    var color3 ='#969696';
    var colortxt1 = '#8d0000';
    var colortxt2= '#00612d';
    var colortxt3= '#000000';
    //Select the background color
    var color =color1;
    //Select the text color
    var colortxt = colortxt1;
    var gendertext1 = "It is a Girl!";
    var gendertext2 = "It is a Boy!";
    var gendertext3= "It is a Demo!";
    //Select the gender text
    var gendertext = gendertext1;
    var surname;
    var soundHandle = new Audio();
    var triggered=false;
    var nosound=true;
    var params = new URLSearchParams(window.location.search.slice(1));
    var pct1=0, pct2=0, pct3=0, pct4=0, pct5=0, pct6 = 0;

    function supportsCanvas() {
        return !!document.createElement('canvas').getContext;
    };
    
    
    /**
     * Handle scratch event on a scratcher
     */
    function checkpct() {
        var pct1 = pct[loc[rnd-1][0]-1];
        var pct2 = pct[loc[rnd-1][1]-1];
        var pct3 = pct[loc[rnd-1][2]-1];

        var pct4= pct[oloc[rnd-1][0]-1];
        var pct5= pct[oloc[rnd-1][1]-1];
        var pct6= pct[oloc[rnd-1][2]-1];

        if (!triggered) {
            if (pct1>0 && pct2>0 && pct3>0)  {
                if (pct1<15 || pct2<15 || pct<15)  {
                //document.getElementById("scratcher3Pct").innerHTML="Scratch MORE!";
                if (!CrispyToast.clearall()){
                    CrispyToast.success('Scratch MORE!',{ position: 'top-center' },{timeout: 3000});
                    }
                } 
            }
            if ((pct4>15 && pct5>15 && pct6>15)&&(pct1<15||pct2<15||pct3<15)) {
                if (!CrispyToast.clearall()&&!triggered){
                    CrispyToast.error('Scratch other circles. You havent find the gender yet!',{ position: 'top-center' },{timeout: 6000});
                    }
            } 

            if (pct1>15&& pct2>15 && pct3>15) {
                $('#tboy').show();
                $('#tboy').text(gendertext);
                $('#tboy').css('color',colortxt);
                $('#boy').hide();
                $('#or').hide();
                $('#girl').hide();
                document.getElementsByTagName("body")[0].style.backgroundColor = color;
                document.getElementsByTagName("body")[0].style.backgroundImage = 'none';
                //document.getElementById("H3").insertAdjacentHTML('afterend', "<h4 id='testtext' style='white-space:normal'> Depending on the product you buy, here it will say either <br> 'It is a Girl!' or 'It is a Boy! with pink or blue background.</h4>");

                $('#H3').hide();
                $('#H4').hide();
                $('#scratcher3Pct').hide();

                confetti_effect();
            }
        }
    };
    function scratcher1Changed(ev) {
        pct[0] = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function scratcher2Changed(ev) {
        pct[1] = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function scratcher3Changed(ev) {
        // Test every pixel. Very accurate, but might be slow on large
        // canvases on underpowered devices:
        //var pct = (scratcher.fullAmount() * 100)|0;
    
        // Only test every 32nd pixel. 32x faster, but might lead to
        // inaccuracy:

        pct[2] = (this.fullAmount(40) * 100)|0;
        checkpct();
        
    };
    function scratcher4Changed(ev) {
        pct[3] = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function scratcher5Changed(ev) {
        pct[4] = (this.fullAmount(40) * 100)|0;
       checkpct();
    };
    function scratcher6Changed(ev) {
        pct[5]= (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function scratcher7Changed(ev) {
        pct[6] = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function scratcher8Changed(ev) {
        pct[7] = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function scratcher9Changed(ev) {
        pct[8] = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    };
    function randomInRangeint(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    function confetti_effect() {
        if(triggered==true) {
            return;
        }
        if (!nosound) {
            soundHandle.volume=0.5;
            soundHandle.play();
        }
        triggered=true;
        var duration = 10 * 1000;
        var animationEnd = Date.now() + duration;
        var skew=1;
        (function frame() {
            var timeLeft = animationEnd - Date.now();
            var ticks = Math.max(200, 500 * (timeLeft / duration));
            skew = Math.max(0.8, skew - 0.001);

            confetti({
                particleCount: 1,
                startVelocity: 0,
                ticks: ticks,
                origin: {
                x: Math.random(),
                // since particles fall down, skew start toward the top
                y: (Math.random() * skew) - 0.2
                },
                colors: ['#ffffff'],
                shapes: [snow],
                gravity: randomInRange(0.4, 0.6),
                scalar: randomInRange(0.4, 1),
                drift: randomInRange(-0.4, 0.4)
            });
            // keep going until we are out of time
            if (timeLeft > 0) {
                requestAnimationFrame(frame);

                return;
            }
            $("#resetbutton").show();

        }());
              
     };
    
    /**
     * Reset all scratchers
     */
    function onResetClicked(scratchers) {
        var i;
        pct = [];
        $("#scratcher3Pct").hide();
        $("#resetbutton").hide();
        for (i = 0; i < scratchers.length; i++) {
            scratchers[i].reset();
        }
       
        $('#tboy').hide();
        $('#boy').show();
        $('#or').show();
        $('#girl').show();

        document.getElementsByTagName("body")[0].style.backgroundImage = 'url(images/background.jpg)';

        $('#H3').show();
        $('#H4').show();
        triggered = false;
        soundHandle.pause();
        soundHandle.currentTime = 0;    
        return false;
    };
    
    /**
     * Assuming canvas works here, do all initial page setup
     */
    // function handleOrientationChange(mql) {
    //     if (mql.matches) {
    //         /* The viewport is currently in portrait orientation */
    //         if(window.innerHeight>900) {
    //             size=130}
    //         else {
    //             size=100;
    //         }
 
    //       } else {
    //         /* The viewport is not currently in portrait orientation, therefore landscape */
    //         console.log(window.innerHeight + " " + window.innerWidth);
    //         size=100;
    //         if (window.innerWidth>900 && window.innerWidth>window.innerHeight*1.2){
    //             console.log("yes");
    //             size = 130;
    //         }
    //       }
          
    //       $('#scratcher1').width(size);
    //       $('#scratcher1').css('width',size);

    
    //   }
    
    function initPage() {
        var scratcherLoadedCount = 0;
        var scratchers = [];
        var pct = [];
        var i, i1;
        
        // if (window.confirm('This scratch off contains sound when the gender is revealed. Do you want to continue with sound? (Ok:with sound, Cancel:without sound')) {
        //     nosound=false;
        //   } else {
        //     nosound=true;
        // }
        surname = params.get('surname');
        if (surname !=null && surname.replace(/\s/g, '').length) {
            $("#baby").text('baby ' + surname+'!');}
        else {
            $("#baby").text('the baby!');
            surname="the";
        }
        $(document).ready(function(){
            // function scope wavesurfer
            snow = confetti.shapeFromPath({
                path: 'm 117.54643,163.48983 c 0.0235,2.18722 -3.47979,1.70924 -2.98797,-0.38214 0,-2.38071 0,-4.76142 0,-7.14213 -2.78878,-1.61169 -5.57755,-3.22339 -8.36633,-4.83508 0,3.21434 0,6.42867 0,9.64301 2.24834,1.31682 4.54195,2.5636 6.76204,3.9241 1.55956,1.37708 -0.78787,3.58114 -2.17787,2.14987 -1.52806,-0.88379 -3.05611,-1.76759 -4.58417,-2.65138 -0.0202,2.37194 0.0405,4.74802 -0.0308,7.11734 -0.4017,2.08202 -3.51101,1.13128 -2.9572,-0.80885 0,-2.10283 0,-4.20566 0,-6.30849 -1.7738,0.99994 -3.506778,2.08073 -5.306629,3.02909 -1.96818,0.6699 -2.697251,-2.47525 -0.770882,-2.95711 2.025837,-1.16486 4.051671,-2.32971 6.077511,-3.49457 0,-3.21434 0,-6.42867 0,-9.64301 -2.78878,1.61169 -5.577554,3.22339 -8.366331,4.83508 -0.02056,2.60695 0.04109,5.21812 -0.03077,7.82243 -0.409456,2.04452 -3.498923,1.11058 -2.957203,-0.80768 0,-1.76782 0,-3.53563 0,-5.30345 -2.060168,1.1729 -4.083309,2.41788 -6.166888,3.5452 -1.951179,0.6554 -2.669459,-2.45772 -0.753763,-2.93182 1.817943,-1.05558 3.635885,-2.11116 5.453828,-3.16674 -1.750971,-1.03479 -3.543641,-2.00504 -5.268056,-3.08093 -1.559857,-1.37272 0.787445,-3.58514 2.177726,-2.15072 2.026101,1.17345 4.052203,2.34691 6.078304,3.52036 2.788775,-1.6117 5.577549,-3.22339 8.366323,-4.83509 -2.788774,-1.6117 -5.577548,-3.22339 -8.366323,-4.83509 -2.272112,1.28907 -4.502198,2.6613 -6.800613,3.89833 -1.956423,0.67022 -2.703387,-2.46021 -0.771528,-2.93107 1.528056,-0.8838 3.056111,-1.76759 4.584167,-2.65139 -2.040509,-1.20747 -4.123882,-2.34894 -6.137284,-3.59814 -1.552192,-1.35939 0.766307,-3.58136 2.150279,-2.14912 1.817943,1.05558 3.635885,2.11116 5.453828,3.16674 0.0199,-2.03655 -0.04021,-4.07721 0.03077,-6.11113 0.409453,-2.04453 3.498924,-1.11059 2.957203,0.80768 0,2.33825 0,4.6765 0,7.01475 2.788777,1.60264 5.577551,3.20528 8.366331,4.80792 0,-3.21434 0,-6.42867 0,-9.64301 -2.24872,-1.32491 -4.539834,-2.58425 -6.762046,-3.95016 -1.559758,-1.37289 0.787247,-3.58479 2.177877,-2.15098 1.528059,0.8838 3.056109,1.76759 4.584169,2.65139 0.0202,-2.37155 -0.0406,-4.74726 0.0308,-7.11618 0.40945,-2.04452 3.49892,-1.11058 2.9572,0.80768 0,2.10284 0,4.20567 0,6.3085 1.7738,-0.99995 3.50678,-2.08073 5.30663,-3.0291 1.96686,-0.66944 2.69859,2.4769 0.77168,2.95849 -2.02611,1.17345 -4.05221,2.34691 -6.07831,3.52036 0,3.21434 0,6.42867 0,9.64301 2.78878,-1.60264 5.57755,-3.20528 8.36633,-4.80792 0.0206,-2.60695 -0.0411,-5.21812 0.0308,-7.82243 0.40945,-2.04453 3.49892,-1.11059 2.9572,0.80768 0,1.76782 0,3.53563 0,5.30345 2.06374,-1.17161 4.08559,-2.42599 6.17586,-3.5452 1.96888,-0.66868 2.69582,2.47278 0.77196,2.95898 -1.81794,1.05558 -3.63589,2.11116 -5.45383,3.16674 1.80874,1.11999 3.77579,2.02996 5.47682,3.29314 1.17719,1.60104 -1.25892,3.19847 -2.49672,1.84751 -1.98936,-1.15218 -3.97871,-2.30435 -5.96807,-3.45652 -2.78878,1.6117 -5.57755,3.22339 -8.36633,4.83509 2.78878,1.6117 5.57755,3.22339 8.36633,4.83509 2.27211,-1.28907 4.50219,-2.6613 6.80061,-3.89833 1.96676,-0.66961 2.69879,2.47725 0.77153,2.95823 -1.52806,0.8838 -3.05611,1.76759 -4.58417,2.65139 2.039,1.20314 4.13295,2.32327 6.13728,3.57878 1.55596,1.3802 -0.7883,3.58404 -2.17744,2.14132 -1.81794,-1.05558 -3.63589,-2.11116 -5.45383,-3.16674 0,1.93766 0,3.87531 0,5.81297 z',
                matrix: [0.35277776,0,0,-0.35277778,35.416827,22.91533]
              });
        });
        document.getElementById('intro').innerHTML= "This is a gender reveal scratch off for <strong>" + surname + "</strong> family. It contains sound when the gender is revealed. Do you want to continue with sound?";
        document.getElementById('id01').style.display='block';
        $('.nosoundbtn').on("click", function (e) {
            document.getElementById('id01').style.display='none';
            nosound=true;
        });
        $('.withsoundbtn').on("click", function (e) {
            document.getElementById('id01').style.display='none';
            nosound=false;
            if (soundHandle.currentTime!=0) {return;}
                soundHandle = document.getElementById('soundHandle');  
                soundHandle.autoplay = true;
                soundHandle.muted=false;
                soundHandle.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
                soundHandle.src = 'audio/celebrate.mp3';
                soundHandle.play();
                soundHandle.pause();
        });
        document.addEventListener(
            "visibilitychange",
             function(evt) {
                console.log("page hidden")
              if (document.visibilityState != "visible") {
                soundHandle.pause();
                soundHandle.currentTime=0;              }
            },
            false,
          );
        // const mediaQueryList = window.matchMedia("(orientation: portrait)");
        // mediaQueryList.addEventListener("change", handleOrientationChange);
        // handleOrientationChange(mediaQueryList);
        
           
        
        document.getElementById("resetbutton").style.backgroundColor = colortxt;

        // called each time a scratcher loads
        function onScratcherLoaded(ev) {
            
            scratcherLoadedCount++;
            $("table1").width($(window).width());
            if (scratcherLoadedCount == scratchers.length) {
                // all scratchers loaded!
    
                // bind the reset button to reset all scratchers
                $('#resetbutton').on('click', function() {
                        onResetClicked(scratchers);
                    });
    
                // hide loading text, show instructions text
                //$('#loading-text').hide();
                //$('#inst-text').show();
            }
        };
    
        // create new scratchers
        var scratchers = new Array(9);
        rnd = randomInRangeint(1,10);
        if (rnd>8) {
            rnd=8;   
        }
        rnd=1;
        for (i = 0; i < scratchers.length; i++) {
            i1 = i + 1;
            scratchers[i] = new Scratcher('scratcher' + i1);
    
            // set up this listener before calling setImages():
            scratchers[i].addEventListener('imagesloaded', onScratcherLoaded);
    
            scratchers[i].setImages('images/' + rnd + '/s' + i1 + 'bg.jpg',
                'images/foreground.jpg');
        
        }
       
        // get notifications of this scratcher changing
        // (These aren't "real" event listeners; they're implemented on top
        // of Scratcher.)
        //scratchers[3].addEventListener('reset', scratchersChanged);
        scratchers[0].addEventListener('scratchesended', scratcher1Changed);
        scratchers[1].addEventListener('scratchesended', scratcher2Changed);
        scratchers[2].addEventListener('scratchesended', scratcher3Changed);

        scratchers[3].addEventListener('scratchesended', scratcher4Changed);
        //scratchers[4].addEventListener('reset', scratchersChanged);
        scratchers[4].addEventListener('scratchesended', scratcher5Changed);
        //scratchers[5].addEventListener('reset', scratchersChanged);
        scratchers[5].addEventListener('scratchesended', scratcher6Changed);
        scratchers[6].addEventListener('scratchesended', scratcher7Changed);
        scratchers[7].addEventListener('scratchesended', scratcher8Changed);
        scratchers[8].addEventListener('scratchesended', scratcher9Changed);

        var canvas = document.getElementById('scratcher1');
        canvas.onmousemove = null;
        // Or if you didn't want to do it every scratch (to save CPU), you
        // can just do it on 'scratchesended' instead of 'scratch':
        //scratchers[2].addEventListener('scratchesended', scratcher3Changed);
    };
    
    /**
     * Handle page load
     */
    $(function() {
        if (supportsCanvas()) {
            initPage();
        } else {
            $('#scratcher-box').hide();
            $('#lamebrowser').show();
        }
    });
    
    })();
    