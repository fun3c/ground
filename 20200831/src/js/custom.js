/*global jQuery:false */
jQuery(document).ready(function($) {
"use strict";
	var resData = { code: "success", telephone: "1388****1388", userId: ""}; 
	// get phone
	function getTelephone() {
		if (window.Promise) {
			return new Promise(function (resolve, reject) {
				_udata.getTelephone(function (res) {  // res={code:"success",telephone:"",userId:""}
					console.log("取号结果：", res);
					resData = res;
					resolve(resData);
				});
			})
		} else {
			return {
				then: function(callback) {
					_udata.getTelephone(function (res) {
						resData = res;
						callback(resData);
					})
				}
			}
		}
	}
	
	// set phone
	function setPhone(code, $el) {
		if (code === 'success') {
			$el.html(resData.telephone)
		} else {
			// fix
		}
	}
	var delay1 = 400;
	var delay2 = 200;

	// login
	// 头部登录按钮
	$('#login > a').on('click', function (e) {
		$('#login-layer').fadeIn(delay1);
		// setPhone(resData.code, $('#login-layer').find('.title'))
		e.preventDefault();
	});
	// 一键登录
	$('#login-layer .login-btn').on('click', function (e) {
		// var $agreeCheckbox = $('#agree-checkbox');
		$('#login-layer').fadeOut(delay1);
		$('#agree').fadeIn(delay1);
		// if (!$agreeCheckbox.attr('checked')) {
		// 	$('#login-layer').fadeOut(delay1);
		// 	$('#agree').fadeIn(delay1);
		// } else {
		// 	$('#login').fadeOut(delay2);
		// 	// $('#isLogin').show();
		// 	$('#login-layer').fadeOut(delay1);
		// }
		e.preventDefault();
	});
	// 关闭
	$('#login-layer .close-btn').on('click', function () {
		$('#login-layer').fadeOut(delay1);
	});
	$('#agree .close-btn').on('click', function () {
		$('#login-layer').fadeIn(delay2);
		$('#agree').fadeOut(delay1);
	});
	// 用户协议等链接
	$('.agree').find('a').on('click', function(e) {
		var text = $(this).text();
		$('.agree-title').text(text);
		$('#agree').fadeIn(delay1);
		$('.agree-foot').hide();
		e.preventDefault();
	});
	// 同意
	$('#agree .btn-primary').on('click', function() {
		$('#agree').fadeOut(delay1);
		$('#login-layer').fadeOut(delay1);
		$('#login').fadeOut(delay2);
		$('#isLogin').show();
		getTelephone().then(function (res) {
			setPhone(res.code, $('#isLogin').find('.phone-number'))
		});
	})
	// 不同意
	$('#agree .btn-default').on('click', function () {
		$('#agree').fadeOut(delay1);
		$('#login-layer').fadeOut(delay1);
	})


		//add some elements with animate effect

		$(".big-cta").hover(
			function () {
			$('.cta a').addClass("animated shake");
			},
			function () {
			$('.cta a').removeClass("animated shake");
			}
		);
		$(".box").hover(
			function () {
			$(this).find('.icon').addClass("animated fadeInDown");
			$(this).find('p').addClass("animated fadeInUp");
			},
			function () {
			$(this).find('.icon').removeClass("animated fadeInDown");
			$(this).find('p').removeClass("animated fadeInUp");
			}
		);
		
		
		$('.accordion').on('show', function (e) {
		
			$(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('active');
			$(e.target).prev('.accordion-heading').find('.accordion-toggle i').removeClass('icon-plus');
			$(e.target).prev('.accordion-heading').find('.accordion-toggle i').addClass('icon-minus');
		});
		
		$('.accordion').on('hide', function (e) {
			$(this).find('.accordion-toggle').not($(e.target)).removeClass('active');
			$(this).find('.accordion-toggle i').not($(e.target)).removeClass('icon-minus');
			$(this).find('.accordion-toggle i').not($(e.target)).addClass('icon-plus');
		});	

		
		// tooltip
		$('.social-network li a, .options_box .color a').tooltip();
 
		//scroll to top
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100) {
				$('.scrollup').fadeIn();
				} else {
				$('.scrollup').fadeOut();
			}
		});
		$('.scrollup').click(function(){
			$("html, body").animate({ scrollTop: 0 }, 1000);
				return false;
		});
    $('#post-slider').flexslider({
        // Primary Controls
        controlNav          : false,              //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
        directionNav        : true,              //Boolean: Create navigation for previous/next navigation? (true/false)
        prevText            : "Previous",        //String: Set the text for the "previous" directionNav item
        nextText            : "Next",            //String: Set the text for the "next" directionNav item
         
        // Secondary Navigation
        keyboard            : true,              //Boolean: Allow slider navigating via keyboard left/right keys
        multipleKeyboard    : false,             //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
        mousewheel          : false,             //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
        pausePlay           : false,             //Boolean: Create pause/play dynamic element
        pauseText           : 'Pause',           //String: Set the text for the "pause" pausePlay item
        playText            : 'Play',            //String: Set the text for the "play" pausePlay item
         
        // Special properties
        controlsContainer   : "",                //{UPDATED} Selector: USE CLASS SELECTOR. Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be ".flexslider-container". Property is ignored if given element is not found.
        manualControls      : "",                //Selector: Declare custom control navigation. Examples would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
        sync                : "",                //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
        asNavFor            : "",                //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider
    });
	
    $('#main-slider').flexslider({
        namespace           : "flex-",           //{NEW} String: Prefix string attached to the class of every element generated by the plugin
        selector            : ".slides > li",    //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
        animation           : "fade",            //String: Select your animation type, "fade" or "slide"
        easing              : "swing",           //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
        direction           : "horizontal",      //String: Select the sliding direction, "horizontal" or "vertical"
        reverse             : false,             //{NEW} Boolean: Reverse the animation direction
        animationLoop       : true,              //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
        smoothHeight        : false,             //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
        startAt             : 0,                 //Integer: The slide that the slider should start on. Array notation (0 = first slide)
        slideshow           : true,              //Boolean: Animate slider automatically
        slideshowSpeed      : 7000,              //Integer: Set the speed of the slideshow cycling, in milliseconds
        animationSpeed      : 600,               //Integer: Set the speed of animations, in milliseconds
        initDelay           : 0,                 //{NEW} Integer: Set an initialization delay, in milliseconds
        randomize           : false,             //Boolean: Randomize slide order
         
        // Usability features
        pauseOnAction       : true,              //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
        pauseOnHover        : false,             //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
        useCSS              : true,              //{NEW} Boolean: Slider will use CSS3 transitions if available
        touch               : true,              //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
        video               : false,             //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches
         
        // Primary Controls
        controlNav          : true,              //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
        directionNav        : true,              //Boolean: Create navigation for previous/next navigation? (true/false)
        prevText            : "Previous",        //String: Set the text for the "previous" directionNav item
        nextText            : "Next",            //String: Set the text for the "next" directionNav item
         
        // Secondary Navigation
        keyboard            : true,              //Boolean: Allow slider navigating via keyboard left/right keys
        multipleKeyboard    : false,             //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
        mousewheel          : false,             //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
        pausePlay           : false,             //Boolean: Create pause/play dynamic element
        pauseText           : 'Pause',           //String: Set the text for the "pause" pausePlay item
        playText            : 'Play',            //String: Set the text for the "play" pausePlay item
         
        // Special properties
        controlsContainer   : "",                //{UPDATED} Selector: USE CLASS SELECTOR. Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be ".flexslider-container". Property is ignored if given element is not found.
        manualControls      : "",                //Selector: Declare custom control navigation. Examples would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
        sync                : "",                //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
        asNavFor            : "",                //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider
    });
	/* -------- Isotope Filtering -------- */
		var $container = $('#isotope-gallery-container');
		var $filter = $('.filter');
		$(window).load(function () {
		// Initialize Isotope
		$container.isotope({
			itemSelector: '.gallery-item-wrapper'
		});
		$('.filter a').click(function () {
			var selector = $(this).attr('data-filter');
			$container.isotope({ filter: selector });
			return false;
		});
		$filter.find('a').click(function () {
			var selector = $(this).attr('data-filter');
			$filter.find('a').parent().removeClass('active');
			$(this).parent().addClass('active');
		});
		});
		$(window).smartresize(function () {
		$container.isotope('reLayout');
		});
		// End Isotope Filtering
		$('.gallery-zoom').magnificPopup({ 
				type: 'image'
				// other options
			});
});