function stickyTitles(stickies) {

    this.load = function() {
    	//console.log('load function called');
        stickies.each(function(){
            var thisSticky = jQuery(this).wrap('<div class="followWrap" />');
            thisSticky.parent().height(thisSticky.outerHeight());
            jQuery.data(thisSticky[0], 'pos', thisSticky.position().top);
        });
    }

    this.scroll = function() {
        stickies.each(function(i){
            var thisSticky = jQuery(this),
                nextSticky = stickies.eq(i+1),
                prevSticky = stickies.eq(i-1),
                pos = jQuery.data(thisSticky[0], 'pos');
            if (pos <= jQuery(window).scrollTop()) {
                console.log('gotcha');
                thisSticky.addClass("fixed");
                if (nextSticky.length > 0 && thisSticky.position().top == jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight()) {
                    thisSticky.addClass("absolute").css("top", jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight());
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


jQuery(document).ready(function(){
		// these are handled in the MainController directive so as to load after the ng-repeat
		//var newStickies = new stickyTitles(jQuery(".followMeBar"));
		//newStickies.load();
		//jQuery(window).on("scroll", function() {
		//	  window.newStickies.scroll();
		//});
});