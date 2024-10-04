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
    var color =color3;
    //Select the text color
    var colortxt = colortxt3;
    var gendertext1 = "It is a Girl!";
    var gendertext2 = "It is a Boy!";
    var gendertext3= "It is a Demo!";
    //Select the gender text
    var gendertext = gendertext3;
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
                $('.images').hide();
                $('#or').hide();
                $('#girl').hide();
                document.getElementsByTagName("body")[0].style.backgroundColor = color;
                document.getElementsByTagName("body")[0].style.backgroundImage = 'none';
                document.getElementById("H3").insertAdjacentHTML('afterend', "<h4 id='testtext' style='white-space:normal'> Depending on the product you buy, here it will say either <br> 'It is a Girl!' or 'It is a Boy! with red or green background.</h4>");

                $('#H3').hide();
                $('#H4').hide();
                //$('#scratcher3Pct').hide();

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
            // var ticks = Math.max(200, 300 * (timeLeft / duration));
            skew = Math.max(0.8, skew - 0.001);
            confetti({
                particleCount: 1,
                startVelocity: 0,
                ticks: 100,
                scalar: 2,
                origin: {
                x: Math.random(),
                // since particles fall down, skew start toward the top
                y: (Math.random() * skew) - 0.2
                },
                colors: ['#ffffff'],
                shapes: ['circle'],
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
        //$("#scratcher3Pct").hide();
        $("#resetbutton").hide();
        for (i = 0; i < scratchers.length; i++) {
            scratchers[i].reset();
        }
       
        $('#tboy').hide();
        $('#boy').show();
        $('#or').show();
        $('#girl').show();
        $('.images').show();

        document.getElementsByTagName("body")[0].style.backgroundColor = "#ffffff";
        document.getElementsByTagName("body")[0].style.backgroundImage = 'url(images/background.jpg)';
        document.getElementById('testtext').remove();

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
            document.getElementById('surname').style.fontWeight="normal";
        }
       /* $(document).ready(function(){
            // function scope wavesurfer
            snow = confetti.shapeFromPath({
                path: 'm 117.54643,163.48983 c 0,0.8149 -0.67908,1.49398 -1.49398,1.49398 -0.81491,0 -1.49399,-0.67908 -1.49399,-1.49398 v -7.52427 l -8.36633,-4.83508 v 9.64301 l 6.51922,3.74855 c 0.70624,0.40745 0.95072,1.331 0.54327,2.03725 -0.40746,0.70625 -1.30385,0.95072 -2.03726,0.54327 l -5.02523,-2.90648 v 6.81801 c 0,0.8149 -0.67908,1.52115 -1.49399,1.52115 -0.8149,0 -1.49398,-0.67909 -1.49398,-1.52115 v -6.81801 l -5.025233,2.90648 c -0.733411,0.40745 -1.629803,0.16298 -2.037254,-0.54327 -0.407452,-0.70625 -0.162981,-1.6298 0.543267,-2.03725 l 6.51922,-3.74855 v -9.64301 l -8.366331,4.83508 v 7.52427 c 0,0.8149 -0.679085,1.49398 -1.493987,1.49398 -0.814902,0 -1.493987,-0.67908 -1.493987,-1.49398 v -5.81297 l -5.894458,3.42259 c -0.706248,0.40745 -1.602641,0.16298 -2.010092,-0.54327 -0.407451,-0.70625 -0.16298,-1.60264 0.543269,-2.01009 l 5.894458,-3.42259 -5.02523,-2.90649 c -0.706248,-0.40745 -0.950719,-1.30384 -0.543268,-2.03725 0.407451,-0.70625 1.303844,-0.95072 2.037255,-0.54327 l 6.519217,3.77572 8.366324,-4.83509 -8.366324,-4.83509 -6.519217,3.77572 c -0.733411,0.40745 -1.629804,0.16298 -2.037255,-0.54327 -0.407451,-0.70625 -0.16298,-1.62981 0.543268,-2.01009 l 5.02523,-2.90649 -5.894458,-3.42259 c -0.706249,-0.40745 -0.95072,-1.331 -0.543269,-2.03725 0.407451,-0.70625 1.303844,-0.95072 2.010092,-0.54327 l 5.894458,3.42259 v -5.81297 c 0,-0.8149 0.679085,-1.49399 1.493987,-1.49399 0.814902,0 1.493987,0.67909 1.493987,1.49399 v 7.52427 l 8.366331,4.80792 v -9.64301 l -6.51922,-3.77572 c -0.706248,-0.40745 -0.950719,-1.30384 -0.543267,-2.03725 0.407451,-0.70625 1.303843,-0.95072 2.037254,-0.54327 l 5.025233,2.90649 v -6.81802 c 0,-0.8149 0.67908,-1.49398 1.49398,-1.49398 0.81491,0 1.49399,0.67908 1.49399,1.49398 v 6.81802 l 5.02523,-2.90649 c 0.73341,-0.40745 1.6298,-0.16298 2.03726,0.54327 0.40745,0.73341 0.16297,1.6298 -0.54327,2.03725 l -6.51922,3.77572 v 9.64301 l 8.36633,-4.80792 v -7.52427 c 0,-0.8149 0.67908,-1.49399 1.49399,-1.49399 0.8149,0 1.49398,0.67909 1.49398,1.49399 v 5.81297 l 5.89446,-3.42259 c 0.73341,-0.40745 1.6298,-0.16298 2.03726,0.54327 0.40745,0.70625 0.16297,1.6298 -0.54327,2.03725 l -5.89446,3.42259 5.02523,2.90649 c 0.73341,0.40745 0.95072,1.30384 0.54327,2.01009 -0.40745,0.73341 -1.33101,0.95072 -2.03726,0.54327 l -6.51921,-3.77572 -8.36633,4.83509 8.36633,4.83509 6.51921,-3.77572 c 0.73341,-0.40745 1.62981,-0.16298 2.03726,0.54327 0.40745,0.73341 0.16298,1.6298 -0.54327,2.03725 l -5.02523,2.90649 5.89446,3.39543 c 0.70624,0.43461 0.95072,1.331 0.54327,2.03725 -0.40746,0.73341 -1.30385,0.95072 -2.03726,0.54327 l -5.89446,-3.42259 z',
                matrix: [0.49984879,0,0,0.49984879,-41.861374,-62.27708]
                        });
        }); */
        //document.getElementById('intro').innerHTML= "This is a gender reveal scratch off for <strong>" + surname + "</strong> family. It contains sound when the gender is revealed. Do you want to continue with sound?";
        document.getElementById('surname').innerHTML= surname;

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
        rnd = 2
        
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
    