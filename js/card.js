$(function() {
   

	
	var $flipButton = $('nav a'),
		$container = $('.container'),
		startAnimationTimeInit = 0, //Animation duration for opening sequence
		transitionTimeInit = 1000, //Animation duration for card flip transition
		startAnimationTime = startAnimationTimeInit,
		transitionTime = transitionTimeInit,
		animating = true, //Value to stop things from happening if animating
		startId = location.hash.substr(1) + 'Face'; //Get id of first card face to "fall" onto page
	
   
  	//Initiate gallery stuffs
	$('.rs-carousel').carousel({
		itemsPerPage: 4,
		nextPrevActions: false,
		pagination: true
	});


	$('.rs-carousel .rs-carousel-item a').each(function() {

		if ($(this).hasClass('play-movie')) {
			$(this).append('<span class="enlargeOverlay"><span aria-hidden="true" class="icon-play" data-icon="&#x25b6;"></span></span>');
		} else {
			$(this).append('<span class="enlargeOverlay"><span aria-hidden="true">+</span></span>');
		}

	});


	var prettyPhotoSettings = {
 		theme: 'light_square',
 		social_tools: false,
 		deeplinking: false,
 		slideshow: false,
 		overlay_gallery: false,
 		show_title: false,
 		markup: '<div class="pp_pic_holder"> \
						<div class="ppt">&nbsp;</div> \
						<div class="pp_top"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
						<div class="pp_content_container"> \
							<div class="pp_left"> \
							<div class="pp_right"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<div class="pp_hoverContainer"> \
											<a class="pp_next" href="#"><span class="pp_nav_text">Next</span><span aria-hidden="true" data-icon="&#x2192;" class="icon-next"></span></a> \
											<a class="pp_previous" href="#"><span aria-hidden="true" data-icon="&#x2190;"  class="icon-previous"></span><span class="pp_nav_text">Previous</span></a> \
										</div> \
										<div id="pp_full_res"></div> \
										<div class="pp_details"> \
											<div class="pp_nav"> \
												<a href="#" class="pp_arrow_previous"><span aria-hidden="true" data-icon="&#x2190;" class="icon-previous"></span><span class="pp_nav_text" >Previous</span></a> \
												<p class="currentTextHolder">0/0</p> \
												<a href="#" class="pp_arrow_next"><span class="pp_nav_text">Next</span><span aria-hidden="true"class="icon-next" data-icon="&#x2192;"></span></a> \
											</div> \
											<p class="pp_description"></p> \
											{pp_social} \
											<a class="pp_close" href="#"><span class="pp_nav_text">Close</span><span aria-hidden="true" class="icon-close" data-icon="&#x2b;"></span></a> \
										</div> \
									</div> \
								</div> \
							</div> \
							</div> \
						</div> \
						<div class="pp_bottom"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>',
			gallery_markup: '<div class="pp_gallery"> \
								<a href="#" class="pp_arrow_previous">Previous</a> \
								<div> \
									<ul> \
										{gallery} \
									</ul> \
								</div> \
								<a href="#" class="pp_arrow_next">Next</a> \
							</div>'
 	}

 	//Replacing valid HTML5 "data-rel" with old "rel" to get gallery working
 	$('a[data-rel]').each(function() {
   		$(this).attr('rel', $(this).data('rel'));
	});
 	
 	
 	$("a[rel^='prettyPhoto']").prettyPhoto(prettyPhotoSettings);
	

	var mediaQuery = 'desk';

	if (Modernizr.mq('only screen and (max-width: 600px)') || Modernizr.mq('only screen and (max-height: 520px)')) {
		
		mediaQuery = 'mobile';
		$("a[rel^='prettyPhoto']").unbind('click');

	} 
	

	// Disables prettyPhoto if screen small
	$(window).resize(function() {
	
	if ((Modernizr.mq('only screen and (max-width: 600px)') || Modernizr.mq('only screen and (max-height: 520px)')) && mediaQuery == 'desk') {
		
		$("a[rel^='prettyPhoto']").unbind('click.prettyphoto');
		mediaQuery = 'mobile';

	} else if (!Modernizr.mq('only screen and (max-width: 600px)') && !Modernizr.mq('only screen and (max-height: 520px)') && mediaQuery == 'mobile') {
		$("a[rel^='prettyPhoto']").prettyPhoto(prettyPhotoSettings);
		mediaQuery = 'desk';
	}
	
	});



	/*

	Labels inside forms:
	Copyright (c) 2009 Stefano J. Attardi, http://attardi.org/

	Licence and source can be found at: http://attardi.org/labels/#info

	*/

    function toggleLabel() {
        var input = $(this);
        setTimeout(function() {
            var def = input.attr('title');
            if (!input.val() || (input.val() == def)) {
                input.prev('span').css('visibility', '');
                if (def) {
                    var dummy = $('<label></label>').text(def).css('visibility','hidden').appendTo('body');
                    input.prev('span').css('margin-left', dummy.width() + 3 + 'px');
                    dummy.remove();
                }
            } else {
                input.prev('span').css('visibility', 'hidden');
            }
        }, 0);
    };

    function resetField() {
        var def = $(this).attr('title');
        if (!$(this).val() || ($(this).val() == def)) {
            $(this).val(def);
            $(this).prev('span').css('visibility', '');
        }
    };

    $('input, textarea').on('keydown', toggleLabel);
    $('input, textarea').on('paste', toggleLabel);

    $('input, textarea').on('focusin', function() {
        $(this).prev('span').css('color', '#ccc');
    });
    $('input, textarea').on('focusout', function() {
        $(this).prev('span').css('color', '#999');
    });

    $(function() {
        $('input, textarea').each(function() { toggleLabel.call(this); });
    });


    /* Contact form */

    $("#ajax-contact-form").submit(function() {
      
        $.ajax({
            type: "POST",
            url: "contactform/submit.php",
            data: $(this).serialize()+'&ajax=1',
            success: function(msg) {
            	if (msg == 1) {
            		 $("#ajax-contact-form").find("input[type=text], textarea").val("").prev('span').css('visibility', '');
            		$('.contactPop').addClass('contactSuccess').html('Message sent, thanks! A copy has also been sent to you.<br/><br/><strong>Click to dismiss</strong>').fadeIn();
            	} else {
            		$('.contactPop').html(msg + '<br/><br/><strong>Click to dismiss</strong>').fadeIn();
            	}
            

			
            }
        });

        return false;
    });

    $('.contactPop').on('click', function() {
    	$(this).fadeOut(function() {
    		$(this).removeClass('contactSuccess');
    	})
    })


    /* Main card stuff */

	if (!location.hash  || !$('#' + startId).length) { startId = $('.home').attr('id'); }; //If no hash value, or invalid hash, use home face
	
	function checkAnimationSupport() {
		if ($('.no-cssanimations').length || $('.no-csstransforms3d').length 
       || Modernizr.mq('only screen and (max-width: 600px)') || Modernizr.mq('only screen and (max-height: 520px)')) 
		{ startAnimationTime = 0; } // No animation time if no animation support / small screen
		if ($('.no-csstransitions').length || $('.no-csstransforms3d').length 
      || Modernizr.mq('only screen and (max-width: 600px)') || Modernizr.mq('only screen and (max-height: 520px)') ) 
		{  transitionTime = 0;} // No transition time if no transition support / small screen
		if (!Modernizr.mq('only screen and (max-width: 600px)') && !Modernizr.mq('only screen and (max-height: 520px)') 
         && $('.cssanimations').length && $('.csstransforms3d').length ) 
		{ startAnimationTime = startAnimationTimeInit;  }
		if (!Modernizr.mq('only screen and (max-width: 600px)') && !Modernizr.mq('only screen and (max-height: 520px)') 
        &&  $('.csstransitions').length && $('.csstransforms3d').length ) 
		{ transitionTime = transitionTimeInit;}
	}
	
	function oppositePos(currentPos) { //Finds opposite position of menu item
	
		if (currentPos == 'topLeft') { return 'bottomRight'; } 
		else if (currentPos == 'topRight') { return 'bottomLeft'; } 
		else if (currentPos == 'bottomLeft') { return 'topRight'; } 
		else if (currentPos == 'bottomRight') { return 'topLeft'; }
	
	}
		

	
	var $startElem = $('#'+startId),
	startPos = $startElem.attr('data-menu-pos'); //Get position to setup current state of menu
	$startElem.addClass('fall current quickDown'); //Give starting card face correct classes
	$('nav .'+startPos).addClass('current'); //Giving current class to menu item
	
	checkAnimationSupport();
	var t = setTimeout(function() { //Timer waiting for starting animation to end

		animating = false;
		 
		//Reseting the start related classes
		$('#'+startId).removeClass('fall');
		$('body').removeClass('start');
		
		$('.face:not(#'+startId+')').each(function() { //All faces except current
			
			//Seting up face with directional animation classes depending on menu positions
			$(this).addClass(oppositePos($(this).attr('data-menu-pos'))); 

		});
      
     
      
     
		
	}, startAnimationTime);


	$(window).hashchange(function() {
		
		var showingId = location.hash.substr(1) + 'Face';
		
		if (!location.hash || !$('#' + showingId).length) { window.location = '#home'; return; }; 	

		
		var	$showingElem = $('#' + showingId), //Element to be shown
			$hidingElem = $('.face.current'), //Element to be hidden
			hidingId = $hidingElem.attr('id'),
			hidingPos = $showingElem.attr('data-menu-pos'), //Class to flip hiding element
			hidingResetPos = oppositePos($hidingElem.attr('data-menu-pos')); //The reset class of hiding element
		
		
		if (showingId == hidingId) { return }; //Escape function if already at correct state
		
		animating = true;
		
		//Hide element. Remove all classes and give directional class to make it rotate out of view
		$hidingElem.removeClass('current topLeftHover topRightHover bottomLeftHover bottomRightHover quickDown').addClass(hidingPos);
		
		//Show element. Remove directional class and give it "current" class to make it rotate into view
		$showingElem.removeClass('bottomRight topRight bottomLeft topLeft behindTheScenes').addClass('current');
		
		//Set menu current position
		$('nav .current').removeClass('current');
		$('nav .'+hidingPos).addClass('current');
		
		checkAnimationSupport();
		var t = setTimeout(function() { //After transition animation ends
		
			$showingElem.addClass('quickDown'); //Makes the 3D hover "peek" animations quick
			$hidingElem.removeClass(hidingPos).addClass(hidingResetPos + ' behindTheScenes'); //Reset Element
			
			$waitingHover = $('.waitingHover');
			if ($waitingHover.length) { //checks to see if hover has happened during animation
				var pos = $waitingHover.parent().attr('class'); //Gets position of hover
				
				$showingElem.addClass(pos + 'Hover'); //Adds hover "peek" class
				$waitingHover.removeClass('waitingHover'); //Removes waiting hover class
			};
			
			animating = false;
			
		}, transitionTime);
	})
	
	$flipButton.bind('mouseenter', function() {

		var showingId = $(this).attr('data-id'),
			pos = $(this).parent().attr('class'),
			$hidingElem = $('.face.current'), //Element to be hidden
			$showingElem = $('#' + showingId), //Element to be shown
			hidingId = $hidingElem.attr('id'),
			hidingPos = pos; //Class to flip hiding element
			
		if (showingId == hidingId) { return } //Escape function if already at correct state
		else if (animating) { $(this).addClass('waitingHover'); return; }; //If animating, give a waiting hover class
		
		$hidingElem.addClass(hidingPos + 'Hover'); 
		
	
	
	});
	
	$flipButton.bind('mouseleave', function() {
			
		var	$hidingElem = $('.face.current'), //Element to be hidden
			hidingPos = $(this).parent().attr('class');
			
		$hidingElem.removeClass(hidingPos + 'Hover');
		$('.waitingHover').removeClass('waitingHover');
			
	});
	
	$flipButton.bind('click', function(e) {
	
		if (animating) {
			e.preventDefault();

		}
		
	});
	
	

	
})