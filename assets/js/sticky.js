function stickyTitles(stickies) {

    this.load = function() {
    	//console.log('load function called');
        stickies.each(function(){
            var thisSticky = jQuery(this).wrap('<div class="followWrap" />');
            thisSticky.parent().height(thisSticky.outerHeight());
            jQuery.data(thisSticky[0], 'pos', thisSticky.offset().top);

            /*
            if(thisSticky.hasClass('number1')){
            	console.log( 'scrollTop: ' + jQuery(window).scrollTop() );
            	console.log( 'vCW: offset().top: ' + jQuery('#view-containerWrapper').offset().top );
            	console.log( 'pW: offset().top: ' + jQuery('#productsWrapper').offset().top );
            	thisSticky.offset().top;
            	console.log( '1: offset().top: ' + thisSticky.offset().top );
            	console.log( '1: data: ' + jQuery.data(thisSticky[0], 'pos') );
            }
            */
        });
    }

    this.scroll = function() {
        stickies.each(function(i){
            var thisSticky = jQuery(this),
                nextSticky = stickies.eq(i+1),
                prevSticky = stickies.eq(i-1),
                pos = jQuery.data(thisSticky[0], 'pos'),
                scrollVal = jQuery(window).scrollTop(),
                newVal = scrollVal;
                releaseCurrent = scrollVal + 60 + thisSticky.outerHeight();
                //console.log('scrollVal: ' + scrollVal);
                //console.log('newVal: ' + newVal);
            if (pos <= newVal) {
                //if(thisSticky.hasClass('number1')){ console.log(thisSticky.offset().top); }
                thisSticky.addClass("fixed");
                nextSticky.removeClass("followColor");
                if (nextSticky.length > 0 && thisSticky.offset().top >= jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight() + 60) {
                    thisSticky.addClass("absolute").css("top", jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight());
                    nextSticky.addClass("followColor");
                }
            } else {
                thisSticky.removeClass("fixed");
                if (prevSticky.length > 0 && jQuery(window).scrollTop() <= jQuery.data(thisSticky[0], 'pos')  - prevSticky.outerHeight()) {
                    prevSticky.removeClass("absolute").removeAttr("style");
                    
                }
            }
        });         
    }
}

function instantiateOnceReady(){
	//window.scrollTo(0,0);
	window.newStickies = new stickyTitles(jQuery(".followMeBar"));
	window.newStickies.load();
	jQuery( '#productsWrapper' ).css( "margin-top", function( index ) {
	  return index + 60;
	});
}

jQuery(window).load(function(){
	window.scrollTo(0,0);
	//jQuery('#view-containerWrapper').offset().top
	
	// these are handled in the MainController directive so as to load after the ng-repeat
	//var newStickies = new stickyTitles(jQuery(".followMeBar"));
	//newStickies.load();
	
	jQuery(window).on("scroll", function() {
		if(window.newStickies){
			window.newStickies.scroll();
		}
	});
});