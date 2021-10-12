Site = {};

Site.Init = function () {
    Site.MainHeader();
    Site.Accordion();
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

    headerSubMenu.on('click', function() {
        $('.mainHeader-menu-mb').addClass('active');
    })

    headerSubMenuClose.on('click', function() {
        $('.mainHeader-menu-mb').removeClass('active');
    })
}

Site.Accordion = function() {
    const accordion = $('.accordion-title');
    
    accordion.on('click', function() {
        const clickedAccordion = $(this)
        const isActive = clickedAccordion.parent().hasClass('active')

        console.log(clickedAccordion)
        console.log(isActive)

        if (isActive) {
            clickedAccordion.parent().removeClass('active')
        } else {
            accordion.parent().removeClass('active')
            clickedAccordion.parent().addClass('active')
        }
    })
}

Site.Footer = function() {
    const backToTop = $('#backToTop');

    backToTop.on('click', function() {
        let body = $("html, body");
        body.stop().animate({ scrollTop: 0 }, 500);
    })
}

$(document).ready(function () {
    Site.Init();
});