function stickyTitles(stickies) {

    this.load = function() {

			  stickies.each(function(){
				
				    var thisSticky = jQuery(this).wrap('<div class="followWrap" />');
				        thisSticky.parent().height(thisSticky.outerHeight());
				
				    jQuery.data(thisSticky[0], 'pos', thisSticky.offset().top);

			  });
		}
			
		this.scroll = function() {
		
			  stickies.each(function(i){				
				
				    var thisSticky = jQuery(this),
					      nextSticky = stickies.eq(i+1),
					      prevSticky = stickies.eq(i-1),
					      pos = jQuery.data(thisSticky[0], 'pos');
			
				    if (pos <= jQuery(window).scrollTop()) {
					
					      thisSticky.addClass("fixed");
					
					      if (nextSticky.length > 0 && thisSticky.offset().top >= jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight()) {
						
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
	var count = 0;
	function countDivs(){

		if(jQuery(".followMeBar").length == 0){
			console.log(jQuery(".followMeBar").length);
			timeout = setTimeout(function(){
				countDivs();
			}, 1000);
			// give up
			count++;
			if(count == 10){ clearTimeout(timeout); }
		}else{
			console.log(jQuery(".followMeBar").length);
			clearTimeout(timeout);
		
			var newStickies = new stickyTitles(jQuery(".followMeBar"));
			
			newStickies.load();
			
			jQuery(window).on("scroll", function() {
				  newStickies.scroll();
			});
		}
	}
	countDivs();
});