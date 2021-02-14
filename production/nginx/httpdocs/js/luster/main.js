(function ($) {
    "use strict";
/*--
Commons Variables
-----------------------------------*/
var windows = $(window);
    
/*--
    Menu Sticky
-----------------------------------*/
var sticky = $('.header-sticky');

windows.on('scroll', function() {
    var scroll = windows.scrollTop();
    if (scroll < 300) {
        sticky.removeClass('is-sticky');
    }else{
        sticky.addClass('is-sticky');
    }
});
    
/*--
    Header Search 
-----------------------------------*/
var $headerSearchToggle = $('.header-search-toggle');
var $headerSearchForm = $('.header-search-form');
    
$headerSearchToggle.on('click', function() {
    var $this = $(this);
    if(!$this.hasClass('open')) {
        //$this.addClass('open').find('i').removeClass('ion-ios-search-strong').addClass('ion-android-close');
        $this.addClass('open');
        $headerSearchForm.slideDown();
    } else {
        //$this.removeClass('open').find('i').removeClass('ion-android-close').addClass('ion-ios-search-strong');
        $this.removeClass('open');
        $headerSearchForm.slideUp();
    }
});
    
/*--
    - Background Image
------------------------------------------*/
var $backgroundImage = $('.bg-image');
$backgroundImage.each(function() {
    var $this = $(this),
        $bgImage = $this.data('bg');
    $this.css('background-image', 'url('+$bgImage+')');
});

/*--
    Mobile Menu
-----------------------------------*/
$('#mobile-menu-trigger').on('click', function(){
    $('#offcanvas-mobile-menu').removeClass('inactive').addClass('active');
});


$('#offcanvas-menu-close-trigger').on('click', function(){
    $('#offcanvas-mobile-menu').removeClass('active').addClass('inactive');
});
/*--
    Offcanvas Menu
-----------------------------------*/
var $offCanvasNav = $('.offcanvas-navigation'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.submenu2');
    
    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');
    
    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();
    
    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this);
        if ( ($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand')) ) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length){
                $this.parent('li').removeClass('active');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('active');
                $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.siblings('ul').slideDown();
            }
        }
    });

/*--
    Sliders
-----------------------------------*/
var $elementCarousel = $('.tf-element-carousel');
var $html = $('html');
var $body = $('body');
    
var slickInstances = [];

/*For RTL*/
if ($html.attr("dir") == "rtl" || $body.attr("dir") == "rtl") {
    $elementCarousel.attr("dir", "rtl");
}

$elementCarousel.each(function (index, element) {
    var $this = $(this);

    // Carousel Options


    var $options = typeof $this.data('slick-options') !== 'undefined' ? $this.data('slick-options') : '';

    var $spaceBetween = $options.spaceBetween ? parseInt($options.spaceBetween, 10) : 0,
        $rowSpace = $options.rowSpace ? parseInt($options.rowSpace, 10) : 0,
        $isCustomArrow = $options.isCustomArrow ? $options.isCustomArrow : false,
        $customPrev = $isCustomArrow === true ? ($options.customPrev ? $options.customPrev : '') : '',
        $customNext = $isCustomArrow === true ? ($options.customNext ? $options.customNext : '') : '',
        $vertical = $options.vertical ? $options.vertical : false,
        $focusOnSelect = $options.focusOnSelect ? $options.focusOnSelect : false,
        $pauseOnHover = $options.pauseOnHover ? $options.pauseOnHover : false,
        $pauseOnFocus = $options.pauseOnFocus ? $options.pauseOnFocus : false,
        $asNavFor = $options.asNavFor ? $options.asNavFor : '',
        $fade = $options.fade ? $options.fade : false,
        $autoplay = $options.autoplay ? $options.autoplay : false,
        $autoplaySpeed = $options.autoplaySpeed ? $options.autoplaySpeed : 5000,
        $swipe = $options.swipe ? $options.swipe : true,
        $swipeToSlide = $options.swipeToSlide ? $options.swipeToSlide : true,
        $verticalSwiping = $options.verticalSwiping ? $options.verticalSwiping : false,
        $arrows = $options.arrows ? $options.arrows : false,
        $dots = $options.dots ? $options.dots : false,
        $infinite = $options.infinite ? $options.infinite : false,
        $centerMode = $options.centerMode ? $options.centerMode : false,
        $centerPadding = $options.centerPadding ? $options.centerPadding : '',
        $speed = $options.speed ? parseInt($options.speed, 10) : 1000,
        $appendArrows = $options.appendArrows ? $options.appendArrows : $this,
        $prevArrow = $arrows === true ? ($options.prevArrow ? '<span class="' + $options.prevArrow.buttonClass + '"><i class="' + $options.prevArrow.iconClass + '"></i></span>' : '<button class="slick-prev">prev</span>') : '',
        $nextArrow = $arrows === true ? ($options.nextArrow ? '<span class="' + $options.nextArrow.buttonClass + '"><i class="' + $options.nextArrow.iconClass + '"></i></span>' : '<button class="slick-next">next</span>') : '',
        $rows = $options.rows ? parseInt($options.rows, 10) : 1,
        $rtl = $options.rtl || $html.attr('dir="rtl"') || $body.attr('dir="rtl"') ? true : false,
        $slidesToShow = $options.slidesToShow ? parseInt($options.slidesToShow, 10) : 1,
        $slidesToScroll = $options.slidesToScroll ? parseInt($options.slidesToScroll, 10) : 1;

    /*Responsive Variable, Array & Loops*/
    var $responsiveSetting = typeof $this.data('slick-responsive') !== 'undefined' ? $this.data('slick-responsive') : '',
        $responsiveSettingLength = $responsiveSetting.length,
        $responsiveArray = [];
    for (var i = 0; i < $responsiveSettingLength; i++) {
        $responsiveArray[i] = $responsiveSetting[i];

    }

    // Adding Class to instances
    $this.addClass('slick-carousel-' + index);
    $this.parent().find('.slick-dots').addClass('dots-' + index);
    $this.parent().find('.slick-btn').addClass('btn-' + index);

    if ($spaceBetween != 0) {
        $this.addClass('slick-gutter-' + $spaceBetween);
    }
    var $slideCount = null;
    $this.on('init', function (event, slick) {
        $slideCount = slick.slideCount;
        if ($slideCount <= $slidesToShow) {
            $this.children('.slick-dots').hide();
        }
    });
    $this.slick({
        slidesToShow: $slidesToShow,
        slidesToScroll: $slidesToScroll,
        asNavFor: $asNavFor,
        autoplay: $autoplay,
        autoplaySpeed: $autoplaySpeed,
        pauseOnHover: $pauseOnHover,
        speed: $speed,
        infinite: $infinite,
        rows: $rows,
        arrows: $arrows,
        dots: $dots,
        vertical: $vertical,
        focusOnSelect: $focusOnSelect,
        pauseOnFocus: $pauseOnFocus,
        centerMode: $centerMode,
        centerPadding: $centerPadding,
        swipe: $swipe,
        swipeToSlide: $swipeToSlide,
        fade: $fade,
        appendArrows: $appendArrows,
        prevArrow: $prevArrow,
        nextArrow: $nextArrow,
        rtl: $rtl,
        responsive: $responsiveArray,
    });

    // Updating the sliders in tab
    $('body').on('shown.bs.tab', 'a[data-toggle="tab"], a[data-toggle="pill"]', function (e) {
        $this.slick('setPosition');
    });
    $('body').on('shown.bs.modal', function (e) {
        $this.slick('setPosition');
    });
});


/*----------------------------------- 
    Price slider Active 
----------------------------------*/
$('#price-range').slider({
    range: true,
    min: 0,
    max: 1000,
    values: [ 0, 900 ],
    slide: function( event, ui ) {
        $('#price-amount').val( '$' + ui.values[ 0 ] + ' - $' + ui.values[ 1 ] );
    }
});
$('#price-amount').val('$' + $('#price-range').slider( 'values', 0 ) +
    ' - $' + $('#price-range').slider('values', 1 ) ); 
/*----------------------------------- 
    Count Down Active 
----------------------------------*/ 
$('[data-countdown]').each(function () {
    var $this = $(this),
    finalDate = $(this).data('countdown');
    $this.countdown(finalDate, function (event) {
        $this.html(event.strftime('<div class="single-countdown"><span class="single-countdown-time">%D</span><span class="single-countdown-text">Days</span></div><div class="single-countdown"><span class="single-countdown-time">%H</span><span class="single-countdown-text">Hours</span></div><div class="single-countdown"><span class="single-countdown-time">%M</span><span class="single-countdown-text">Mins</span></div><div class="single-countdown"><span class="single-countdown-time">%S</span><span class="single-countdown-text">Secs</span></div>'));
    });
});

/*----------------------------------- 
    Newsletter Popup Active 
----------------------------------*/ 
$("#close-newsletter-popup").on("click", function(){
    $("#newsletter-popup-area").addClass("d-none");
});
/*------------------------------ 
    Nice Select Active
---------------------------------*/
$('select').niceSelect();

/* -------------------------
    Venobox Active
* --------------------------*/  
$('.venobox').venobox({
    border: '10px',
    titleattr: 'data-title',
    numeratio: true,
    infinigall: true
}); 
/*------------------------
	Sticky Sidebar Active
-------------------------*/
$('#sticky-sidebar').theiaStickySidebar({
    // Settings
    additionalMarginTop: 120
  })

/*----- 
	Quantity
--------------------------------*/
$('.pro-qty').prepend('<button class="dec qtybtn">-</button>');
$('.pro-qty').append('<button class="inc qtybtn">+</button>');
$('.qtybtn').on('click', function() {
	var $button = $(this);
	var oldValue = $button.parent().find('input').val();
	if ($button.hasClass('inc')) {
	  var newVal = parseFloat(oldValue) + 1;
	} else {
	   // Don't allow decrementing below zero
	  if (oldValue > 0) {
		var newVal = parseFloat(oldValue) - 1;
		} else {
		newVal = 0;
	  }
	  }
	$button.parent().find('input').val(newVal);
}); 

/*----- 
	Shipping Form Toggle
--------------------------------*/ 
$('[data-shipping]').on('click', function(){
    if( $('[data-shipping]:checked').length > 0 ) {
        $('#shipping-form').slideDown();
    } else {
        $('#shipping-form').slideUp();
    }
})
/* ----------------------
    FAQ Accordion 
* -----------------------*/ 
$('.card-header a').on('click', function() {
    $('.card').removeClass('actives');
    $(this).parents('.card').addClass('actives');
  }); 
/*----- 
	Payment Method Select
--------------------------------*/
$('[name="payment-method"]').on('click', function(){
    
    var $value = $(this).attr('value');

    $('.single-method p').slideUp();
    $('[data-method="'+$value+'"]').slideDown();
    
})
/*----------------------------------
    ScrollUp Active
-----------------------------------*/
$.scrollUp({
    scrollText: '<i class="fa fa-angle-up"></i>',
    easingType: 'linear',
    scrollSpeed: 900,
    animation: 'fade'
});
    
/*--
	MailChimp
-----------------------------------*/
$('#mc-form').ajaxChimp({
	language: 'en',
	callback: mailChimpResponse,
	// ADD YOUR MAILCHIMP URL BELOW HERE!
	url: 'http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef'

});
function mailChimpResponse(resp) {
	
	if (resp.result === 'success') {
		$('.mailchimp-success').html('' + resp.msg).fadeIn(900);
		$('.mailchimp-error').fadeOut(400);
		
	} else if(resp.result === 'error') {
		$('.mailchimp-error').html('' + resp.msg).fadeIn(900);
	}  
}
    
/*--
    Conatact Map
-----------------------------------*/
if($('.contact-map').length){
    function initialize() {
        var mapOptions = {
            zoom: 14,
            scrollwheel: false,
            center: new google.maps.LatLng(40.730610, -73.935242)
        };
        var map = new google.maps.Map(document.getElementById('contact-map'), mapOptions);
        var marker = new google.maps.Marker({
            position: map.getCenter(),
            map: map,
            animation: google.maps.Animation.BOUNCE
        });

    }
    google.maps.event.addDomListener(window, 'load', initialize);
}
    
})(jQuery);	



 $("#watt").ionRangeSlider({
        type: "double",
        grid: true,
        min: 0,
        max: 400,
        from: 0,
        to: 380,
        prefix: "",
         onChange: function (data) {
            $('#watt_min').val(data.from);
            $('#watt_max').val(data.to);
       }
    });


 $("#lumen").ionRangeSlider({
        type: "double",
        grid: true,
        min: 65,
        max: 8600,
        from: 0,
        to: 5000,
        prefix: "",
         onChange: function (data) {
            $('#lumen_min').val(data.from);
            $('#lumen_max').val(data.to);
       }
    });

$(document).ready(function(){
   $('.phone_kz').mask('0 (000) 000 00 00');
});


$(".btn_show_more_product__description").click(function () {
    if($(".show_more_product__description").hasClass("show-more-height")) {
        $(this).text("Показать еще");
    } else {
        $(this).text("Скрыть ");
    }

    $(".show_more_product__description").toggleClass("show-more-height");
});