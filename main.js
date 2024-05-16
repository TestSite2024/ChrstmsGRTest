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


    var audio = new Audio('audio/celebrate.mp3');
    var triggered=false;
    var nosound=true;
    var params = new URLSearchParams(window.location.search.slice(1));
    var pct3,pct4,pct5=0;

    function supportsCanvas() {
        return !!document.createElement('canvas').getContext;
    };
    
    /**
     * Handle scratch event on a scratcher
     */
    function checkpct() {
        
        if (pct3>0 && pct4>0 && pct5>0)  {
            if (pct3<20 || pct4<20 || pct5<20)  {

            //$('#scratcher3Pct').html('It is a girl!');
            //$("#scratcher3Pct").show();
            //document.getElementById("scratcher3Pct").innerHTML="Scratch MORE!";
            if (!CrispyToast.clearall()){
                CrispyToast.success('Scratch MORE!',{ position: 'top-center' },{timeout: 3000});
                }
            } 
        }
        if (pct3>20 && pct4>20 && pct5>20) {
            $('#boy').text('It is a girl!');
            $('#boy').css('color','#F860AA');

            //document.getElementById("boy").style.color('#F860AA');

            $('#or').hide();
            $('#girl').hide();
            //document.getElementById("title").style.color = "#F860AA";
            document.getElementsByTagName("body")[0].style.backgroundColor = '#ff95c8';
            document.getElementsByTagName("body")[0].style.backgroundImage = 'none';

            //document.getElementsByTagName("body")[0].style.backgroundImage.animation = 'gradient 15s ease infinite';
            $('#H3').hide();
            $('#H4').hide();
            $('#scratcher3Pct').hide();

            confetti_effect();
        }
    };
    function scratcher3Changed(ev) {
        // Test every pixel. Very accurate, but might be slow on large
        // canvases on underpowered devices:
        //var pct = (scratcher.fullAmount() * 100)|0;
    
        // Only test every 32nd pixel. 32x faster, but might lead to
        // inaccuracy:

        pct3 = (this.fullAmount(32) * 100)|0;
        checkpct();
        
    };
    function scratcher4Changed(ev) {
        pct4 = (this.fullAmount(32) * 100)|0;
        checkpct();
    };
    function scratcher5Changed(ev) {
        pct5 = (this.fullAmount(32) * 100)|0;
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
            audio.volume=0.5;
            audio.play();
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
        console.log("triggered");
        $("#resetbutton").show();
        //onResetClicked(scratchers);
        }());
     
         
    };
    
    /**
     * Reset all scratchers
     */
    function onResetClicked(scratchers) {
        var i;
        pct3=0;
        pct4=0;
        pct5=0;
        $("#scratcher3Pct").hide();
        $("#resetbutton").hide();
        for (i = 0; i < scratchers.length; i++) {
            scratchers[i].reset();
        }
        //$("#scratcher3Pct").html('Find the gender');
       
        $('#boy').text('Boy');
        $('#boy').css('color','#7FB1ED');
        $('#or').show();
        $('#girl').show();

        //document.getElementById("title").style.color = "#000000";


        document.getElementsByTagName("body")[0].style.backgroundImage = 'url(images/background.jpg)';

        $('#H3').show();
        $('#H4').show();
        triggered = false;
        audio.pause();
        audio.currentTime = 0;    
        return false;
    };
    
    /**
     * Assuming canvas works here, do all initial page setup
     */
    function initPage() {
        var scratcherLoadedCount = 0;
        var scratchers = [];
        var i, i1;
        if (window.confirm('This scratch off contains sound when the gender is revealed. Do you want to continue with sound? (Ok:with sound, Cancel:without sound')) {
            nosound=false;
          } else {
            nosound=true;
        }

        //console.log(params.surname);
        if (params.get('surname') != null) {
            $("#baby").text('baby ' + params.get('surname')+'!');}
        else {
            $("#baby").text('the baby!');
        }
        
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
        scratchers[3].addEventListener('scratchesended', scratcher3Changed);
        //scratchers[4].addEventListener('reset', scratchersChanged);
        scratchers[4].addEventListener('scratchesended', scratcher4Changed);
        //scratchers[5].addEventListener('reset', scratchersChanged);
        scratchers[5].addEventListener('scratchesended', scratcher5Changed);
    
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
    