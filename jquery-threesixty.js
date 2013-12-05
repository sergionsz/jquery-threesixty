/* ==================================================================
* jquery-threesixty.js
* 
* Company: Universidad Distrital Francisco José de Caldas
* Mail: shnavarretes@correo.udistrital.edu.co
* Web: www.udistrital.edu.co
* Description: Based on mahonnaise's cyclotron and inspired by
* 	jackmoore's colorbox, this is a jQuery that builds a 360°
* 	interactive gallery-like presentation of your images.
* Usage:
* 	1. Make sure you've linked jQuery and threesixty files:
* 		<script src="/path/to/jquery-threesixty.js"
* 			type="text/javascript"></script>
*		<link rel="stylesheet" type="text/css"
* 			href="/path/to/jquery-threesixty.css">
* 	2. Make an anchor to your image with the class threesixty:
* 		<a class="threesixty" href="/path/to/image">Link</a>
* 	3. Add to your script:
* 		$(document).ready(function ($) {
*			$('.threesixty').threesixty();
*		});
* 	4. Profit!
* 	
* licence : GPL
===================================================================== */
(function ($) {
	$.fn.threesixty = function (options) {
		var settings = $.extend({
			/* friction: From 1 to infinity.
			 * Reduces velocity with time */
			friction: 5,
			/* height: of the image box in pixels.
			 * Image should adjust accordingly */
			height: 600,
			/* opacity: of the background.
			 * Between 0 (transparent) and 1 (black).  */
			opacity: 0.7,
			cssPrefix: 'ts',
			/* How much frames per second */
			fps: 50,
		}, options);
		
		/* Initialize by adding the background and container divs 
		* if they don't already exist */
		var prefix = settings.cssPrefix;
		if ($("#" + prefix +"-background").length == 0){		
			$('body').prepend('<div id="' + prefix +'-background">\
			<span id="' + prefix + '-close">&times;</span>\
			</div><div id="' + prefix + '-container"></div>');
		}
		var background = $('#' + prefix +'-background')
		var container = $('#' + prefix +'-container');
		/* The box will be the whole thing: background + container */
		var box = background.add(container);
		/* Hide the box at init and configure it */
		box.hide();
		container.css('height', settings.height + 'px');
		background.css('opacity', settings.opacity);
		
		return this.each(function () {
			var link = $(this);
			var cursorX1 = 0;
			var velocity = 0;
			var armed;
			var offset = 0;
			var tick;
			var prevX;
			/* This should be really small, so we divide it by 100
			 * Values lesser than 1 act like a negative friction,
			 * so we should add 1  */
			var friction = (settings.friction/100)+1;
			var period = 1000/settings.fps;
			
			/* Show threesixty on click */
			link.click(function (e) {
				container.css({
					'background-image': 'url('+link.attr('href')+')',
					'background-position': '0px 0px'
				});
				box.show();
				e.preventDefault();
			});
			
			/* Arm the cursor on mousedown */
			container.bind("mousedown touchstart", function (e) {
				cursorX1 = e.pageX;
				if (cursorX1 == 0){
					e.preventDefault();
					cursorX1 = event.touches[0].clientX;
				}
				armed = true;
				e.preventDefault();
			});
			
			/* Move the image on mousemove (when armed) */
			container.bind("mousemove touchmove",function (e) {
				if (armed) {
					var cursorX2 = e.pageX;
					if (cursorX2 == 0){
						e.preventDefault();
						cursorX2 = event.touches[0].clientX;
					}
					if (prevX === undefined) { prevX = cursorX2; }
					
					offset = parseFloat(container.css('background-position').split(' ')[0].replace('px',''));
					offset += cursorX2 - cursorX1;
					cursorX1=cursorX2;
					
					container.css('background-position', offset);
					
					/* Calculate velocity based on
					 * distance from last position */
					velocity = prevX - cursorX2;
					prevX = cursorX2;
				}
			});
			
			/* Disarm on mouseleave or mouseup */
			container.bind('mouseleave mouseup touchend touchcancel', function () {
				armed = false;
			});
			
			/* Close on pressing Esc or click on background */
			$(document).keyup(function(e){
				if(e.keyCode === 27)
					close();
			});
			background.click(function (e){
				close();
			});
			
			/* Private functions */
			var close = function () {
				box.hide();
			}
			
			/* This executes fps times per second
			 * Reduces velocity based on friction */
			tick = function () {
				
				if (!armed && velocity) {
					velocity /= friction;
					offset = parseFloat(container.css('background-position').split(' ')[0].replace('px',''));
					offset -= velocity;
					container.css('background-position', offset);
					if (Math.abs(velocity) < 0.1) {
						velocity = 0;
					}
				}
			};

			setInterval(tick,period);
			
		});
	};
}(jQuery));
