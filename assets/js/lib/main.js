
jQuery(document).ready(function($){

     $('.slideshow').owlCarousel({
        loop:true,
        nav:true,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        mouseDrag: false,
        navText: [  
            '<i class="fa fa-angle-left fa-4x" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right fa-4x" aria-hidden="true"></i>'
        ],
        responsive:{
            0:{
                items:1
            }
        }
    });

    $('.action, .comedy, .trailer').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        mouseDrag: false,
        slideBy: 7,
        navSpeed: 50,
        rows: true,
        rowsCount: 2,
        navText: [  
            '<i class="fa fa-angle-left fa-2x" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right fa-2x" aria-hidden="true"></i>'
        ],
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:7,
                nav:true
            }
        }
    });


});


jQuery(document).ready(function($){
    //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
    var MqL = 1170;
    //move nav element position according to window width
    moveNavigation();
    $(window).on('resize', function(){
        (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
    });

    //mobile - open lateral menu clicking on the menu icon
    $('.mobile-button').on('click', function(event){
        event.preventDefault();
        if( $('.section-main').hasClass('nav-is-visible') ) {
            closeNav();
            $('.overlay').removeClass('is-visible');
        } else {
            $(this).addClass('nav-is-visible');
            $('.primary-nav').addClass('nav-is-visible');
            $('.section-header').addClass('nav-is-visible');
            $('.section-main').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').addClass('overflow-hidden');
            });
            toggleSearch('close');
            $('.overlay').addClass('is-visible');
        }
    });

    //open search form
    $('.search-button').on('click', function(event){
        event.preventDefault();
        toggleSearch();
        closeNav();
    });


    //close lateral menu on mobile 
    $('.overlay').on('swiperight', function(){
        if($('.primary-nav').hasClass('nav-is-visible')) {
            closeNav();
            $('.overlay').removeClass('is-visible');
        }
    });
    $('.nav-on-left .overlay').on('swipeleft', function(){
        if($('.primary-nav').hasClass('nav-is-visible')) {
            closeNav();
            $('.overlay').removeClass('is-visible');
        }
    });
    $('.overlay, .close-dialog').on('click', function(){
        closeNav();
        toggleSearch('close')
        $('.overlay').removeClass('is-visible');
    });


    //prevent default clicking on direct children of .primary-nav 
    $('.primary-nav').children('.has-children').children('a').on('click', function(event){
        event.preventDefault();
    });
    //open submenu
    $('.has-children').children('a').on('click', function(event){
        if( !checkWindowWidth() ) event.preventDefault();
        var selected = $(this);
        if( selected.next('ul').hasClass('is-hidden') ) {
            //desktop version only
            selected.addClass('selected').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
            selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
            $('.overlay').addClass('is-visible');
        } else {
            selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
            $('.overlay').removeClass('is-visible');
        }
        toggleSearch('close');
    });

    //submenu items - go back link
    $('.go-back').on('click', function(){
        $(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
    });

    function closeNav() {
        $('.mobile-button').removeClass('nav-is-visible');
        $('.section-header').removeClass('nav-is-visible');
        $('.primary-nav').removeClass('nav-is-visible');
        $('.has-children ul').addClass('is-hidden');
        $('.has-children a').removeClass('selected');
        $('.moves-out').removeClass('moves-out');
        $('.section-main').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            $('body').removeClass('overflow-hidden');
        });
    }

    function toggleSearch(type) {
        if(type=="close") {
            //close serach 
            $('.croll-search').removeClass('is-visible');
            $('.section-search').removeClass('is-visible');
            $('.search-button').removeClass('search-is-visible');
            $('.overlay').removeClass('search-is-visible');
        } else {
            //toggle search visibility
            $('.croll-search').toggleClass('is-visible');
            $('.section-search').toggleClass('is-visible');
            $('.search-button').toggleClass('search-is-visible');
            $('.overlay').toggleClass('search-is-visible');
            if($(window).width() > MqL && $('.section-search').hasClass('is-visible')) $('.section-search').find('input[type="search"]').focus();
            ($('.section-search').hasClass('is-visible')) ? $('.overlay').addClass('is-visible') : $('.overlay').removeClass('is-visible') ;
        }
    }

    function checkWindowWidth() {
        //check window width (scrollbar included)
        var e = window, 
            a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if ( e[ a+'Width' ] >= MqL ) {
            return true;
        } else {
            return false;
        }
    }

    function moveNavigation(){
        var navigation = $('.menubar');
        var desktop = checkWindowWidth();
        if ( desktop ) {
            navigation.detach();
            navigation.insertBefore('.header-buttons');
        } else {
            navigation.detach();
            navigation.insertAfter('.section-main');
        }
    }
    $(".croll-search").getNiceScroll().remove()
    $(".croll-search").niceScroll({
        cursorwidth: "8px",
        cursorcolor: "#1A134C",
        cursoropacitymin: 0,
        cursorborder: "0",
        cursorborderradius: "0px",
        autohidemode: false
    });
    
});

if ($('.scroll-back').length) {
    var scrollTrigger = 100,
      scrollback = function () {
          var scrollTop = $(window).scrollTop();
          if (scrollTop > scrollTrigger) {
              $('.scroll-back').addClass('show');
          } else {
              $('.scroll-back').removeClass('show');
          }
      };
    scrollback();
    $(window).on('scroll', function () {
        scrollback();
    });
    $('.scroll-back').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}
$(document).ready(function() {

    $('.tab-content>div:not(":first-of-type")').hide();
    $('.tabs-list li:first-of-type').find(':first').width('100%');

    $('.tabs-list li').each(function(i) {
        $(this).attr('data-tab', 'tab' + i);
    });

    $('.tab-content>div').each(function(i) {
        $(this).attr('data-tab', 'tab' + i);
    });

    $('.tabs-list li').on('click', function() {
        var dataTab = $(this).data('tab');
        var getWrapper = $(this).closest('.tab');

        getWrapper.find('.tabs-list li').removeClass('active');
        $(this).addClass('active');

        getWrapper.find('.tab-content>div').hide();
        getWrapper.find('.tab-content>div[data-tab=' + dataTab + ']').show();

    });

});


jQuery(document).ready(function($){
    var mainHeader = $('.navbar'),
      secondaryNavigation = $('.navbar-header'),
      //this applies only if secondary nav is below intro section
      belowNavHeroContent = $('.sub-nav-hero'),
      headerHeight = mainHeader.height();

    //set scrolling variables
    var scrolling = false,
      previousTop = 0,
      currentTop = 0,
      scrollDelta = 10,
      scrollOffset = 150;

    mainHeader.on('click', '.nav-trigger', function(event){
        // open primary navigation on mobile
        event.preventDefault();
        mainHeader.toggleClass('is-active');
    });

    $(window).on('scroll', function(){
        if( !scrolling ) {
            scrolling = true;
            (!window.requestAnimationFrame)
              ? setTimeout(autoHideHeader, 250)
              : requestAnimationFrame(autoHideHeader);
        }
    });

    $(window).on('resize', function(){
        headerHeight = mainHeader.height();
    });

    function autoHideHeader() {
        var currentTop = $(window).scrollTop();

        ( belowNavHeroContent.length > 0 )
          ? checkStickyNavigation(currentTop) // secondary navigation below intro
          : checkSimpleNavigation(currentTop);

        previousTop = currentTop;
        scrolling = false;
    }

    function checkSimpleNavigation(currentTop) {
        //there's no secondary nav or secondary nav is below primary nav
        if (previousTop - currentTop > scrollDelta) {
            //if scrolling up...
            mainHeader.removeClass('is-hidden');
        } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
            //if scrolling down...
            mainHeader.addClass('is-hidden');
        }
    }

    function checkStickyNavigation(currentTop) {
        //secondary nav below intro section - sticky secondary nav
        var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();

        if (previousTop >= currentTop ) {
            //if scrolling up...
            if( currentTop < secondaryNavOffsetTop ) {
                //secondary nav is not fixed
                mainHeader.removeClass('is-hidden');
                secondaryNavigation.removeClass('fixed slide-up');
                belowNavHeroContent.removeClass('secondary-nav-fixed');
            } else if( previousTop - currentTop > scrollDelta ) {
                //secondary nav is fixed
                mainHeader.removeClass('is-hidden');
                secondaryNavigation.removeClass('slide-up').addClass('fixed');
                belowNavHeroContent.addClass('secondary-nav-fixed');
            }

        } else {
            //if scrolling down...
            if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
                //hide primary nav
                mainHeader.addClass('is-hidden');
                secondaryNavigation.addClass('fixed slide-up');
                belowNavHeroContent.addClass('secondary-nav-fixed');
            } else if( currentTop > secondaryNavOffsetTop ) {
                //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset
                mainHeader.removeClass('is-hidden');
                secondaryNavigation.addClass('fixed').removeClass('slide-up');
                belowNavHeroContent.addClass('secondary-nav-fixed');
            }

        }
    }

});
