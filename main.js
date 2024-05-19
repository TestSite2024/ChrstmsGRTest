/**
 * This file controls the page logic
 *
 * depends on jQuery>=1.7
 */

(function() {
    /**
     * Returns true if this browser supports canvas
     *
     * From http://diveintohtml5.info/
     */

    var color1 = '#ff95c8';
    var color2 = '#5194f8';
    var colortxt1 = '#F860AA';
    var colortxt2= '#7FB1ED';
    //Select the background color
    var color =color1;
    //Select the text color
    var colortxt = colortxt1;
    var gendertext1 = "It is a Girl!";
    var gendertext2 = "It is a Boy!";
    //Select the gender text
    var gendertext = gendertext1;
    
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
        
        if (pct3>0 && pct4>0 && pct5>0)  {
            if (pct3<15 || pct4<15 || pct5<15)  {
            //document.getElementById("scratcher3Pct").innerHTML="Scratch MORE!";
            if (!CrispyToast.clearall()){
                CrispyToast.success('Scratch MORE!',{ position: 'top-center' },{timeout: 3000});
                }
            } 
        }
        if ((pct1>15 && pct2>15 && pct6>15)&&(pct3<15||pct4<15||pct5<15)) {
            if (!CrispyToast.clearall()&&!triggered){
                CrispyToast.error('Scratch other circles. You havent find the gender yet!',{ position: 'top-center' },{timeout: 6000});
                }
        } 
        if (pct3>15&& pct4>15 && pct5>15) {
            $('#boy').text(gendertext);
            $('#boy').css('color',colortxt);
            $('#or').hide();
            $('#girl').hide();
            document.getElementsByTagName("body")[0].style.backgroundColor = color;
            document.getElementsByTagName("body")[0].style.backgroundImage = 'none';

            //document.getElementsByTagName("body")[0].style.backgroundImage.animation = 'gradient 15s ease infinite';
            $('#H3').hide();
            $('#H4').hide();
            $('#scratcher3Pct').hide();

            confetti_effect();
        }
    };
    function scratcher1Changed(ev) {
        pct1 = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function scratcher2Changed(ev) {
        pct2 = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function scratcher3Changed(ev) {
        // Test every pixel. Very accurate, but might be slow on large
        // canvases on underpowered devices:
        //var pct = (scratcher.fullAmount() * 100)|0;
    
        // Only test every 32nd pixel. 32x faster, but might lead to
        // inaccuracy:

        pct3 = (this.fullAmount(40) * 100)|0;
        checkpct();
        
    };
    function scratcher4Changed(ev) {
        pct4 = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function scratcher5Changed(ev) {
        pct5 = (this.fullAmount(40) * 100)|0;
       checkpct();
    };
    function scratcher6Changed(ev) {
        pct6 = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    };
    function confetti_effect() {
        if(triggered==true) {
            return;
        }
        if (!nosound) {
            soundHandle.play();
        }
        triggered=true;
        // do this for 10 seconds
        var duration = 10 * 1000;
        var end = Date.now() + duration;
        var defaults = { startVelocity: 10, spread: 360, ticks: 70, zIndex: 0 };
        var particleCount = 5 ;
        (function frame() {
        // launch a few confetti from the left edge
        confetti({...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#FFFFFF']}
        );
        // and launch a few from the right edge
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },colors: ['#FFFFFF']}
        );

        // keep going until we are out of time
        if (Date.now() < end) {
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
        pct1=0;
        pct2=0;
        pct3=0;
        pct4=0;
        pct5=0;
        pct6=0;
        $("#scratcher3Pct").hide();
        $("#resetbutton").hide();
        for (i = 0; i < scratchers.length; i++) {
            scratchers[i].reset();
        }
       
        $('#boy').text('Boy');
        $('#boy').css('color',colortxt2);
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
        var i, i1;
        soundHandle =     document.getElementById('soundHandle');
        $(document).ready(function() {
        addEventListener('touchstart', function (e) {
          if (soundHandle.currentTime!=0) {return;}
            soundHandle.src = 'audio/celebrate.mp3';
          soundHandle.play();
          soundHandle.pause();
            });
         });
        if (window.confirm('This scratch off contains sound when the gender is revealed. Do you want to continue with sound? (Ok:with sound, Cancel:without sound')) {
            nosound=false;
          } else {
            nosound=true;
        }
        // const mediaQueryList = window.matchMedia("(orientation: portrait)");
        // mediaQueryList.addEventListener("change", handleOrientationChange);
        // handleOrientationChange(mediaQueryList);
        
           
        //console.log(params.surname);
        var surname = params.get('surname');
        if (surname !=null && surname.replace(/\s/g, '').length) {
            $("#baby").text('baby ' + surname+'!');}
        else {
            $("#baby").text('the baby!');
        }
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
    
        for (i = 0; i < scratchers.length; i++) {
            i1 = i + 1;
            scratchers[i] = new Scratcher('scratcher' + i1);
    
            // set up this listener before calling setImages():
            scratchers[i].addEventListener('imagesloaded', onScratcherLoaded);
    
            scratchers[i].setImages('images/s' + i1 + 'bg.jpg',
                'images/foreground.jpg');
        
        }
        
        // get notifications of this scratcher changing
        // (These aren't "real" event listeners; they're implemented on top
        // of Scratcher.)
        //scratchers[3].addEventListener('reset', scratchersChanged);
        scratchers[0].addEventListener('scratchesended', scratcher1Changed);
        scratchers[1].addEventListener('scratchesended', scratcher2Changed);
        scratchers[3].addEventListener('scratchesended', scratcher3Changed);
        //scratchers[4].addEventListener('reset', scratchersChanged);
        scratchers[4].addEventListener('scratchesended', scratcher4Changed);
        //scratchers[5].addEventListener('reset', scratchersChanged);
        scratchers[5].addEventListener('scratchesended', scratcher5Changed);
        scratchers[6].addEventListener('scratchesended', scratcher6Changed);

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
    