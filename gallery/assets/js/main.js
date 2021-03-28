/*
 * Cocoon -  Portfolio html  Template
 * Build Date: december 2017
 * Author: colorlib
 * Copyright (C) 2018 colorlib
 */
/* ------------------------------------- */
/*  TABLE OF CONTENTS
 /* ------------------------------------- */
/*   PRE LOADING                          */
/*   WOW                                 */
/*   SIDEBAR Menu                                */
/*   Portfolio Masonry                         */
/*   portfolio-filter                    */
/*   pop up                              */
/*   OWL CAROUSEL                        */
/*    MAPS                               */
/*   COUNTER JS              */



/* ==============================================
/*  PRE LOADING
  =============================================== */
'use strict';
$(window).load(function () {
    $('.loader').delay(500).fadeOut('slow');
});


$(document).ready(function () {

    'use strict';
    /* ==============================================
     /*   wow
      =============================================== */
    var wow = new WOW({
        animateClass: 'animated',
        offset: 10,
        mobile: true
    });
    wow.init();

    /* ==============================================
      Sidebar show and hide
       =============================================== */
    $(".menu-btn").on('click', function (i) {
        $("body").toggleClass("sidebar_closed");
    });


    /* --------------------------------------------------------
     COUNTER JS
     ----------------------------------------------------------- */

    $('.counter').counterUp({
        delay: 5,
        time: 3000
    });

    /* --------------------------------------------------------
     Add images from image folder dynamically
    ----------------------------------------------------------- */
    var categories = [];
    var images = [];

    (function(dirFile) { 
        var obj = dirFile;

        obj.children.forEach(function(item){
            categories.push(item.name);
            item.children.forEach(function(nested_item){
                images.push( {
                    name: nested_item.name,
                    category: item.name
                });
            })
        })
    })(paths);

    // String formatter
    // https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format

    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined' ?
                    args[number] :
                    match;
            });
        };
    }

    // String to be formatted
    // {0} - category
    // {1} - img src
    var html_div = `
    <div class="grid-item {0}  col-sm-12 col-md-6 col-lg-3">
        <a href="{1}" title="{0}">
            <div class="project_box_one">
                <img  data-src="{1}" alt="pro1" />
                <div class="product_info">
                    <div class="product_info_text">
                        <div class="product_info_text_inner">
                            <i class="ion ion-plus"></i>
                            <h4>{0}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    `

    var html_filter = `
        <li data-filter=".{0}"> <a href="javascript:void(0)">{0}</a></li>
    `

    // shuffle array
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    shuffle(images);
    let $grid1 = $('.grid');
    let $filter = $('#filtr-container');

    categories.forEach(function (item) {
        $filter.append(html_filter.format(item));
    })

    let base_dir = "assets/img/img/";
    images.forEach(function (item) {
        let cat = item.category;
        let src = base_dir + cat + '/' + item.name;
        $grid1.append(html_div.format(cat, src));
    })


    /* ==============================================
     portfolio-filter
     =============================================== */

    // filter items on button click

    var $grid = $('.grid').isotope({
        // set itemSelector so .grid-sizer is not used in layout
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            // use element for option
            columnWidth: '.grid-sizer'
        }
    });

    $(".grid .grid-item img").Lazy({
        // beforeLoad: function(){
        //     $('.grid').isotope({
        //         // set itemSelector so .grid-sizer is not used in layout
        //         itemSelector: '.grid-item',
        //         percentPosition: true,
        //         masonry: {
        //             // use element for option
        //             columnWidth: '.grid-sizer'
        //         }
        //     })
        // },
        afterLoad: function(){
            $grid.isotope();
            $("#all_images").trigger('click');
        }
    });

    // $grid.imagesLoaded().progress(function () {
    //     $grid.isotope('layout');
    // });



    $('#filtr-container').on('click', 'li', function (e) {
        e.preventDefault();
        $('#filtr-container li').removeClass('active');
        $(this).closest('li').addClass('active');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
            filter: filterValue
        });
    });

    /* ==============================================
     pop up
     =============================================== */

    // portfolio-pop up

    $('.img-container').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }
    });

    /* ==============================================
     OWL CAROUSEL
     =============================================== */
    $('.testimonial_carousel').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
    });


    /* ------------------------------------- */
    /* Animated progress bars
     /* ------------------------------------- */
    'use strict';

    var waypoints = $('.progress_container').waypoint(function () {
        $('.progress .progress-bar').progressbar({
            transition_delay: 1000
        });
    }, {
        offset: '50%'
    });


    /* --------------------------------------------------------
    MAPS
    ----------------------------------------------------------- */
    var map = $('#map');
    if (map.length > 0) {
        google.maps.event.addDomListener(window, 'load', init);
        var lattuide = map.attr('data-lat');
        var longtuided = map.attr('data-lon');
    }

    function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 16,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(lattuide, longtuided), // New York

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#a3ccff"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#dfdfdf"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#f9ecd4"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                            "saturation": 36
                        },
                        {
                            "color": "#333333"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#f2f2f2"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                }
            ]
        };

        // Get the HTML DOM element that will contain your map
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        // Let's also add a marker while we're at it
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lattuide, longtuided),
            map: map,
            icon: 'assets/img/map-icon.png',
            title: 'cocoon!'
        });
    }
});