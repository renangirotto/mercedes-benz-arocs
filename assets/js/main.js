Site = {};

Site.Init = function () {
    Site.MainHeader();
    Site.Banner();
    Site.Tabs();
    Site.Accordion();
    Site.Gallery();
    Site.Footer();
}

Site.MainHeader = function () {
    const header = $('#mainHeader');
    const headerTrigger = header.find('.mainHeader-topbar-action');
    const headerMenuMobile = header.find('.mainHeader-menu');
    const headerMenuItem = header.find('.menu-item');
    const headerSubMenu = header.find('.subMenu');
    const headerSubMenuClose = header.find('.subMenu-close');

    headerTrigger.on('click', function () {
        $('body').toggleClass('no-scroll');
        headerTrigger.toggleClass('active');
        headerMenuMobile.toggleClass('active');
    })

    headerMenuItem.on('click', function () {
        const target = $(this).attr('data-section');
        const targetTop = $(`#${target}`).offset().top
        const diference = $(window).width() > 992 ? 137 : 156

        $('body').removeClass('no-scroll');
        headerTrigger.removeClass('active');
        headerMenuMobile.removeClass('active');

        let body = $("html, body");
        body.stop().animate({ scrollTop: targetTop - diference }, 500);
    })

    headerSubMenu.on('click', function () {
        $('.mainHeader-menu-mb').addClass('active');
    })

    headerSubMenuClose.on('click', function () {
        $('.mainHeader-menu-mb').removeClass('active');
    })
}

Site.Banner = function (close = false) {
    const buttonModal = $('#sBannerVideo');
    const modal = $('#sBannerModal');
    const videoId = modal.attr('data-video')

    buttonModal.on('click', function(){
        modal.find('iframe')[0].src = `https://www.youtube-nocookie.com/embed/${videoId}`
        modal.addClass('active');
    })

    if (close) {
        modal.find('iframe')[0].src = ""
        modal.removeClass('active');
    }
}

Site.Tabs = function () {
    const selectMobile = '#featureSelect';
    const tabs = '.sFeatures-tabs-item';
    const panels = '.sFeatures-panel-item';

    $(`${selectMobile}`).on('change', function() {
        const selectedTab = $(`${selectMobile} option:selected`).val();

        $(`${panels}`).removeClass('active');

        $(`${panels}`).each(function() {
            if ($(this).attr('data-panel') === selectedTab) {
                $(this).addClass('active')
            }
        })
    })

    $(`${tabs}`).on('click', function() {
        const selectedTab = $(this).attr('data-tab');

        $(`${tabs}`).removeClass('active');

        $(this).addClass('active');

        $(`${panels}`).removeClass('active');

        $(`${panels}`).each(function() {
            if ($(this).attr('data-panel') === selectedTab) {
                $(this).addClass('active')
            }
        })
    })
}

Site.Accordion = function () {
    const accordion = $('.accordion-title');

    accordion.on('click', function () {
        const clickedAccordion = $(this)
        const isActive = clickedAccordion.parent().hasClass('active')

        if (isActive) {
            clickedAccordion.parent().removeClass('active')
        } else {
            accordion.parent().removeClass('active')
            clickedAccordion.parent().addClass('active')
        }
    })
}

Site.Gallery = function () {
    const gallerySlide = '#gallerySlide'
    const galleryItem = $(`${gallerySlide}`).find('.sGallery-item');

    $(`${gallerySlide}`).slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    galleryItem.on('click', function () {
        const item = $(this);

        if (item.hasClass('video')) {
            const videoId = item.attr('data-video');

            /// 2. This code loads the IFrame Player API code asynchronously.
            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            // 3. This function creates an <iframe> (and YouTube player)
            //    after the API code downloads.
            var player;
            function onYouTubeIframeAPIReady() {
                player = new YT.Player('player', {
                    videoId: videoId,
                    playerVars: {
                        'playsinline': 1
                    },
                    events: {
                        'onReady': onPlayerReady
                    }
                });
            }

            // 4. The API will call this function when the video player is ready.
            function onPlayerReady(event) {
                event.target.playVideo();
            }

            item.addClass('playing');
            onYouTubeIframeAPIReady();
        }
    })
}

Site.Footer = function () {
    const backToTop = $('#backToTop');

    backToTop.on('click', function () {
        let body = $("html, body");
        body.stop().animate({ scrollTop: 0 }, 500);
    })
}

$(document).ready(function () {
    Site.Init();
});