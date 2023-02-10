/*----------------------------------*/
/*		    Navigation
/*----------------------------------*/

$(document).ready(function(){

	$("#nav > li:first-child").addClass('home-page'); // remove this if You don't want to have a house icon instead of text in homepage
	
	$("#nav ul").css({display: "none"}); // Opera Fix
	$("#nav li").hover(function(){
		$(this).find('ul:first').css({visibility: "visible",display: "none"}).slideDown(200);
	},function(){
		$(this).find('ul:first').css({visibility: "hidden"});
	});
});

/*----------------------------------*/
/*		   Image overlay
/*----------------------------------*/

$(document).ready(function(){
	$('.image-overlay a').hover(function () {
			$(this).find('.image-overlay-bg').stop(true, true).animate({opacity: 0.6}, 300 );
		}, function () {
			$(this).find('.image-overlay-bg').stop(true, true).animate({opacity: 0}, 300 );
		}
	);
	$('.video-overlay a').hover(function () {
			$(this).find('.video-overlay-bg').stop(true, true).animate({opacity: 0.6}, 300 );
		}, function () {
			$(this).find('.video-overlay-bg').stop(true, true).animate({opacity: 0}, 300 );
		}
	);
	$('.audio-overlay a').hover(function () {
			$(this).find('.audio-overlay-bg').stop(true, true).animate({opacity: 0.6}, 300 );
		}, function () {
			$(this).find('.audio-overlay-bg').stop(true, true).animate({opacity: 0}, 300 );
		}
	);
	$('.link-overlay a').hover(function () {
			$(this).find('.link-overlay-bg').stop(true, true).animate({opacity: 0.6}, 300 );
		}, function () {
			$(this).find('.link-overlay-bg').stop(true, true).animate({opacity: 0}, 300 );
		}
	);
	$('.gallery-overlay a').hover(function () {
			$(this).find('.gallery-overlay-bg').stop(true, true).animate({opacity: 0.6}, 300 );
		}, function () {
			$(this).find('.gallery-overlay-bg').stop(true, true).animate({opacity: 0}, 300 );
		}
	);
});

$(document).ready(function(){
	$('.lightbox-photo a').hover(function () {
			$(this).find('img').stop(true, true).animate({opacity: 0.6}, 300 );
		}, function () {
			$(this).find('img').stop(true, true).animate({opacity: 1}, 300 );
		}
	);
});

/*----------------------------------*/
/*		Adding classes to lists
/*----------------------------------*/

$(document).ready(function() {		
	$("ul li:first-child").addClass("first-child");
	$("ul li:last-child").addClass("last-child");
});

/*----------------------------------*/
/*		 TipTip plugin
/*----------------------------------*/

$(document).ready(function() {
	$(".tipped-top").tipTip({
		delay: 0,
		defaultPosition: "top"
	});
	$(".tipped-bottom").tipTip({
		delay: 0,
		defaultPosition: "bottom"
	});
	$(".tipped-left").tipTip({
		delay: 0,
		defaultPosition: "left"
	});
	$(".tipped-right").tipTip({
		delay: 0,
		defaultPosition: "right"
	});
});

/*----------------------------------*/
/*		  Preloader
/*----------------------------------*/

$(document).ready(function(){	
	$(".latest-projects, .gallery, .portfolio-boxed, .portfolio, .portfolio-single-photo, .blog-masonry-post").preloader();
});

/*----------------------------------*/
/*		      Twitter
/*----------------------------------*/

$(document).ready(function(){
	$('#tweets').tweetable({
		username: 'joaquinperezm',
		time: true,
		limit: 1,
		replies: true,
		position: 'append'
	});
});

/*----------------------------------*/
/*		    Flickr Feed
/*----------------------------------*/

$(document).ready(function(){
	$('#flickr-feed ul').jflickrfeed({
		limit: 8,
		qstrings: {
			id: '94476904@N06'
		},
		itemTemplate:
		'<li>' +
			'<a data-rel="prettyPhoto[flickr-feed]" href="{{image_b}}" title="{{title}}">' +
				'<img src="{{image_s}}" alt="{{title}}" width="44" height="44" />' +
			'</a>' +
		'</li>'
	}, function(data) {
		$("a[data-rel^='prettyPhoto']").prettyPhoto({
			overlay_gallery: false
		});
	});
});

/*----------------------------------*/
/*		GoToTop plugin
/*----------------------------------*/

$(document).ready(function() {
	$().UItoTop({
		easingType: 'easeOutQuart',
		scrollSpeed: 500,
	});
});

/*----------------------------------*/
/*	   UI Accordion and toggle
/*----------------------------------*/

$(document).ready(function(){
	$(".accordion").accordion ({
		header: "h3"
	});
});

$(document).ready(function(){
	$(".toggle div").hide(); // hide div on default
	$(".toggle h3").click(function(){ // set the trigger
		$(this).toggleClass("active").next().slideToggle(300); // add class active and toggle speed
		return false;
	});
});

/*----------------------------------*/
/*		FancyBox plugin
/*----------------------------------*/

$(document).ready(function(){
	$("a[data-rel^='prettyPhoto']").prettyPhoto({
		overlay_gallery: false
	});
});

/*----------------------------------*/
/*		Gallery Image Overlay
/*----------------------------------*/

$(document).ready(function() {
	$(".image-overlay a[data-rel^='prettyPhoto']").append("<span class='image-overlay-bg'></span>");
	$(".video-overlay a[data-rel^='prettyPhoto']").append("<span class='video-overlay-bg'></span>");
	$(".audio-overlay a[data-rel^='prettyPhoto']").append("<span class='audio-overlay-bg'></span>");
	$(".link-overlay a[data-rel^='prettyPhoto']").append("<span class='link-overlay-bg'></span>");
	$(".gallery-overlay a[data-rel^='prettyPhoto']").append("<span class='gallery-overlay-bg'></span>");
});

/*----------------------------------*/
/*		  FitVids plugin
/*----------------------------------*/

$(document).ready(function() {		
	$(".container").fitVids();
});

/*----------------------------------*/
/*		  Skeleton Tabs
/*----------------------------------*/

/*
* Skeleton V1.1
* Copyright 2011, Dave Gamache
* www.getskeleton.com
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 8/17/2011
*/

$(document).ready(function() {

	/* Tabs Activiation
	================================================== */

	var tabs = $('ul.tabs');

	tabs.each(function(i) {

		//Get all tabs
		var tab = $(this).find('> li > a');
		tab.click(function(e) {

			//Get Location of tab's content
			var contentLocation = $(this).attr('href');

			//Let go if not a hashed one
			if(contentLocation.charAt(0)=="#") {

				e.preventDefault();

				//Make Tab Active
				tab.removeClass('active');
				$(this).addClass('active');

				//Show Tab Content & add active class
				$(contentLocation).fadeIn().addClass('active').siblings().hide().removeClass('active');

			}
		});
	});
});