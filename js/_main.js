/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
(function(n){n.viewportSize={},n.viewportSize.getHeight=function(){return t("Height")},n.viewportSize.getWidth=function(){return t("Width")};var t=function(t){var f,o=t.toLowerCase(),e=n.document,i=e.documentElement,r,u;return n["inner"+t]===undefined?f=i["client"+t]:n["inner"+t]!=i["client"+t]?(r=e.createElement("body"),r.id="vpw-test-b",r.style.cssText="overflow:scroll",u=e.createElement("div"),u.id="vpw-test-d",u.style.cssText="position:absolute;top:-1000px",u.innerHTML="<style>@media("+o+":"+i["client"+t]+"px){body#vpw-test-b div#vpw-test-d{"+o+":7px!important}}<\/style>",r.appendChild(u),i.insertBefore(r,e.head),f=u["offset"+t]==7?i["client"+t]:n["inner"+t],i.removeChild(r)):f=n["inner"+t],f}})(this);

( function( $ ) {
	
	// Setup variables
	$window = $(window);
	$slide = $('.homeSlide');
	$slideTall = $('.homeSlideTall');
	$slideTall2 = $('.homeSlideTall2');
	$body = $('body');
	/*
	var homeSlides = $('.homeSlide');
	var $slideContent = $('.hsContainer');
	var slidesCount = $(homeSlides).length;
	var activeSlide = 1;
	*/
	/*var mobi_video = $.find('video');
	mobi_video = mobi_video[0];
	mobi_video.muted = true;
	*/
    //FadeIn all sections   
	$body.imagesLoaded( function() {
		setTimeout(function() {
		      
		      // Resize sections
		      adjustWindow();
		      
		      // Fade in sections
			  $body.removeClass('loading').addClass('loaded');
			  $('.navbar').fadeIn();
			  $('#register-link').fadeIn();
			  
		}, 800);
	});
	
	function adjustWindow(){
		
		// Init Skrollr
		if ($(window).width() > 800) {
			var s = skrollr.init({
			    render: function(data) {
			        //Debugging - Log the current scroll position.
			        //console.log(data.curTop);
			    }
			});
		}
		
		// Get window size
	    winH = $window.height();
	    
	    // Keep minimum height 550
	    if(winH <= 550) {
			winH = 550;
		} 
	    
	    // Resize our slides
	    $slide.height(winH);
	    $slideTall.height(winH*2);
	    $slideTall2.height(winH*3);
	    
	    // Refresh Skrollr after resizing our sections
	    if ($(window).width() > 800) {
		    s.refresh($('.homeSlide'));
		}
	    
	}



/*		var current_screen2 = 0;
		var cyclic_images2 = 0;
    	arr_screens2 = [
			'1-compressor.jpg',
			'2-compressor.jpg',
			'3-compressor.jpg'		
		];
	 	cyclic_images2 = 1;
        setInterval( function(){
			current_screen2++;
			if(current_screen2 >= arr_screens2.length)
				current_screen2 = 0;
			//console.log(arr_screens2[current_screen2]);
			$('#slide-1 .bcg').css("background-image","url('img/"+arr_screens2[current_screen2]+"')");
			
		},5000);

*/


















//scripting


//NAV BAR SCRIPTING 
//script for smooth scrolling 
//this is for the navbar
$(' a.scrollTo_nav').click(function(){
	var destination = $( $.attr(this, 'href') ).offset().top;
	$('html, body').animate({
    	scrollTop: destination-50
	}, 900);
	return false;
});
//this is for the go to top button
$('#register-link').click(function(){
	var destination = $( $.attr(this, 'href') ).offset().top;
	$('html, body').animate({
    	scrollTop: destination-50
	}, 900);
	return false;
});

//nav bar collapse on nav item click (mobile version)

$(".navbar-nav li a").click(function(event) {
	if ($(window).width() <=786) {
	$(".navbar-collapse").collapse('hide');
}
	$(this).closest('li').siblings('li').removeClass('active').end().addClass('active');
}); 


//Contact form subject section scripting

$('#slide-6 .hsContent .dropdown-menu li a').on('click',function(e){
	e.preventDefault();
	console.log($(this).text());
	
	/*$('.subject-button').find('span.change').text($(this).text()).css({
		
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
		paddingRight:"20px"		
	
	});
	*/
	
	
	
	if($('div.dropdown').width()>380)
	{
		if($(this).text().length>12){
			$('.subject-button').find('span.change').text($(this).text().substring(0,15)+"...");
		}else{
			$('.subject-button').find('span.change').text($(this).text().substring(0,15));
		}
	}else{
		if($(this).text().length>12){
			$('.subject-button').find('span.change').text($(this).text().substring(0,9)+"...");
		}else{
			$('.subject-button').find('span.change').text($(this).text().substring(0,9));
		}
	
	}	
	
});

/*//code to fit the image to the container in programs.html
$('.prog_container').find('img').each(function(){
  var imgClass = (this.width/this.height > 1) ? 'wide' : 'tall';
  $(this).addClass(imgClass);
 })*/


//initialting fo the gallery plugin


/*

$(window).on('scroll', function() {
    var scrollTop = $(this).scrollTop();

    $('#t_Partners').each(function() {
        var topDistance = $(this).offset().top;

        if ( (topDistance+10) < scrollTop ) {
           $('.navbar-nav').find('li.active'). 
        }
    });
});*/

$(window).on('scroll',function(){
	var windowTop = $(this).scrollTop();
    
    if($(this).scrollTop() >= $('#t_Contact_Us').offset().top){
           console.log('true');
           if(!($($('.navbar-nav').find('li')[4]).hasClass('active'))){
            $('.navbar-nav').find('li').removeClass('active');
            $($('.navbar-nav').find('li')[4]).addClass('active');
           }
    } else if(windowTop >= $('#t_partners_fo').offset().top){
           console.log('true');
           if(!($($('.navbar-nav').find('li')[1]).hasClass('active'))){
            $('.navbar-nav').find('li').removeClass('active');
            $($('.navbar-nav').find('li')[1]).addClass('active');
           }
    } else {
           $('.navbar-nav').find('li').removeClass('active');
           $($('.navbar-nav').find('li')[0]).addClass('active');
    }
});


















} )( jQuery );