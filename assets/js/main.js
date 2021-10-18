Site = {};

Site.Init = function () {
    Site.MainHeader();
    Site.Banner();
    Site.Tabs();
    Site.Accordion();
    Site.Technical();
    Site.Gallery();
    Site.Dealers();
    Site.Footer();
    Site.ModalClose();
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

    buttonModal.on('click', function () {
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

    $(`${selectMobile}`).on('change', function () {
        const selectedTab = $(`${selectMobile} option:selected`).val();

        $(`${panels}`).removeClass('active');

        $(`${panels}`).each(function () {
            if ($(this).attr('data-panel') === selectedTab) {
                $(this).addClass('active')
            }
        })
    })

    $(`${tabs}`).on('click', function () {
        const selectedTab = $(this).attr('data-tab');

        $(`${tabs}`).removeClass('active');

        $(this).addClass('active');

        $(`${panels}`).removeClass('active');

        $(`${panels}`).each(function () {
            if ($(this).attr('data-panel') === selectedTab) {
                $(this).addClass('active')
            }
        })
    })
}

Site.Technical = function () {
    const technicalSlide = '#technicalSlide';
    const technicalItem = $(`${technicalSlide}`).find('.sTechnical-slide-item');

    $(`${technicalSlide}`).slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
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
    const modal = $('#modal');

    $(`${gallerySlide}`).slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
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

            modal.find('.modal-player-image').append(
                $('<iframe>').attr({
                    class: 'modal-video',
                    src: `https://www.youtube-nocookie.com/embed/${videoId}`,
                    frameborder: "0",
                    allowfullscreen: "allowfullscreen"
                })
            )

            modal.addClass('active');
        }

        if (!item.hasClass('video')) {
            const imgId = item.attr('data-image');

            modal.find('.modal-player-image').append(
                $('<img>').attr({
                    class: 'modal-image',
                    src: `./assets/images/galeria/${imgId}.jpg`,
                })
            )

            modal.addClass('active');
        }
    })
}

Site.Dealers = function () {
    const cepField = '#cepDealer';

    $(`${cepField}`).mask('00000-000');

    $(`${cepField}`).on("input", function() {
        const cepValue = this.value

        if (cepValue.length === 9) {
            const requestByCep = fetch('https://vempramercedes.com.br/api/get-dealers-external?type=dealers&zipCode=02856100');

            requestByCep.then(
                response => {
                    console.log(response)
                }
            )
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

Site.ModalClose = function (close = false) {
    const modal = $('#modal');

    if (close) {
        modal.removeClass('active');
        modal.find('.modal-video').remove();
        modal.find('.modal-image').remove();
    }
}

$(document).ready(function () {
    Site.Init();
});