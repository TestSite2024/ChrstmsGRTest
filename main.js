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
    function supportsCanvas() {
        return !!document.createElement('canvas').getContext;
    };
    
    /**
     * Handle scratch event on a scratcher
     */
    function scratcher3Changed(ev) {
        // Test every pixel. Very accurate, but might be slow on large
        // canvases on underpowered devices:
        //var pct = (scratcher.fullAmount() * 100)|0;
    
        // Only test every 32nd pixel. 32x faster, but might lead to
        // inaccuracy:
        var pct1 = (scratchers[3].fullAmount(32) * 100)|0;
        var pct2 = (scratchers[4].fullAmount(32) * 100)|0;
        var pct3 = (scratchers[5].fullAmount(32) * 100)|0;
        $('#scratcher3Pct').html(' ' + pct1 + '%');

        if (pct1>10 && pct2>10 && pct3>10) {
                    $('#scratcher3Pct').html('It is a girl!');
                    document.getElementById("scratcher3Pct").innerHTML="It is a GIRL!";
        }
    };
    
    /**
     * Reset all scratchers
     */
    function onResetClicked(scratchers) {
        var i;
    
        for (i = 0; i < scratchers.length; i++) {
            scratchers[i].reset();
        }
    
        return false;
    };
    
    /**
     * Assuming canvas works here, do all initial page setup
     */
    function initPage() {
        var scratcherLoadedCount = 0;
        var scratchers = [];
        var i, i1;
    
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
                $('#loading-text').hide();
                $('#inst-text').show();
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
        scratchers[4].addEventListener('scratchesended', scratcher3Changed);
        //scratchers[5].addEventListener('reset', scratchersChanged);
        scratchers[5].addEventListener('scratchesended', scratcher3Changed);
    
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
    
