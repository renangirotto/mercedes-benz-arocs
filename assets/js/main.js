Site = {};

Site.Init = function () {
    Site.MainHeader();
    Site.Banner();
    Site.Tabs();
    Site.Accordion();
    Site.Technical();
    Site.Gallery();
    Site.Dealers.Init();
    Site.Footer();
    Site.ModalClose();
    Site.Cookies();

    viewport = document.querySelectorAll("meta[name=viewport]");
    viewport.forEach(function (element) {
        element.setAttribute('content', 'width=750, user-scalable=no');
    })
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

            const offSetTop = $(this).offset().top

            const diference = $(window).width() > 992 ? 137 : 156
            let body = $("html, body");
            body.stop().animate({ scrollTop: offSetTop - diference - 50 }, 500);
        } else {
            accordion.parent().removeClass('active')
            clickedAccordion.parent().addClass('active')

            const offSetTop = $(this).offset().top

            const diference = $(window).width() > 992 ? 137 : 156
            let body = $("html, body");
            body.stop().animate({ scrollTop: offSetTop - diference - 50 }, 500);
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

Site.Dealers = {}
Site.Dealers.Init = function () {
    const apiBase = 'https://vempramercedes.com.br/api'
    const cepField = '#cepDealer'
    const dealerTabs = '.sDealers-tabs-item'
    const dealerPanels = '.sDealers-panels-item'
    const citySelect = '#dealersCity'
    const statesSelect = '#dealersState'
    const dealers = "#dealersList";

    $(`${cepField}`).mask('00000-000');
    $(`${cepField}`).on("input", function () {
        const cepValue = this.value

        if (cepValue.length === 9) {
            Site.Dealers.RequestDealerByCep(apiBase, cepValue);
        }
    });

    Site.Dealers.RequestStates(apiBase);

    $(`${dealerTabs}`).on('click', function () {
        const selectedTab = $(this).attr('data-tab')

        $(`${dealerTabs}`).removeClass('active')
        $(this).addClass('active');

        $(`${dealerPanels}`).removeClass('active');

        $(`${cepField}`).val('');
        $(`${citySelect}`).find('option').remove().end();
        $(`${citySelect}`).append(
            $('<option>').val('selecione').text('Selecione a cidade')
        );
        $(`${statesSelect} option`).attr('selected', false);
        $(`${statesSelect} option[value="selecione"]`).attr('selected', true);

        $(`${dealers}`).parent().removeClass('active');

        $(`${dealerPanels}`).each(function () {
            if ($(this).attr('data-panel') === selectedTab) {
                $(this).addClass('active')
            }
        })
    })
}

Site.Dealers.RequestStates = function (apiBase) {
    const requestStates = fetch(`${apiBase}/get-dealers-external?type=states`);
    const statesSelect = '#dealersState'

    requestStates
        .then(function (response) {
            response.json().then(function (result) {
                result.States.forEach(function (item) {
                    const state = item

                    $(`${statesSelect}`).append(
                        $('<option>').val(state.Name).text(state.Name)
                    )
                })

                $(`${statesSelect}`).on('change', function () {
                    const state = $(`${statesSelect} option:selected`).val();

                    Site.Dealers.RequestCities(apiBase, state);
                })
            }),
                function (error) {
                    console.log({ error });
                }
        })
}

Site.Dealers.RequestCities = function (apiBase, state) {
    const citySelect = '#dealersCity'
    const dealers = "#dealersList";
    const dealerMap = '#dealersMap';

    let selectedState = $('#dealersState option:selected').val();

    if (selectedState !== 'selecione') {
        const requestCities = fetch(`${apiBase}/get-dealers-external?type=cities&state=${selectedState}`);

        requestCities.then(function (response) {
            response.json().then(function (result) {
                $(`${citySelect} option`).remove();

                $(`${citySelect}`).append(
                    $('<option>').val('selecione').text('Selecione a cidade')
                )

                result.Cities.forEach(function (item) {
                    const city = item

                    $(`${citySelect}`).append(
                        $('<option>').val(city.Name).text(city.Name)
                    )
                })

                $(`${citySelect}`).on('change', function () {
                    const city = $(`${citySelect} option:selected`).val();

                    if (city === 'selecione') {
                        $(`${dealers}`).parent().removeClass('active');
                    } else {
                        Site.Dealers.RequestDealerByStateAndCity(apiBase, selectedState, city);
                    }
                })
            }),
                function (error) {
                    console.log({ error });
                }
        })
    }

    if (selectedState === 'selecione') {
        $(`${citySelect}`).find('option').remove().end();
        $(`${citySelect}`).append(
            $('<option>').val('selecione').text('Selecione a cidade')
        );

        $(`${dealerMap}`).attr('src', '');
        $(`${dealers}`).parent().removeClass('active');
    }
}

Site.Dealers.RequestDealerByCep = function (apiBase, cepValue) {
    const requestByCep = fetch(`${apiBase}/get-dealers-external?type=dealers&zipCode=${cepValue}`);

    requestByCep.then(async function (response) {
        await response.json().then(function (result) {
            if (result !== undefined) {
                Site.Dealers.BuildDealersList(result.Dealers);
            }
        }),
            function (error) {
                console.log({ error });
            }
    })
}

Site.Dealers.RequestDealerByStateAndCity = function (apiBase, state, city) {
    let selectedState = $('#dealersState option:selected').val();
    let selectedCity = $('#dealersCity option:selected').val();

    const requestByStateAndCity = fetch(`${apiBase}/get-dealers-external?type=dealers&state=${selectedState}&city=${selectedCity}`);

    requestByStateAndCity.then(async function (response) {
        await response.json().then(function (result) {
            if (result !== undefined) {
                Site.Dealers.BuildDealersList(result.Dealers);
            }
        }),
            function (error) {
                console.log({ error });
            }
    })
}

Site.Dealers.BuildDealersList = function (dealersList) {
    const dealers = "#dealersList";

    $(`${dealers}`).find('.single-dealer').remove().end();

    dealersList.forEach(function (item) {
        const dealer = item;

        $(`${dealers}`).append(
            $('<li>').attr({
                class: 'single-dealer',
                "data-latitude": `${dealer.Coordinate.Latitude}`,
                "data-longitude": `${dealer.Coordinate.Longitude}`
            }).append(
                $('<h6>').text(dealer.FriendlyName),
                $('<p>').text(dealer.Address),
                $('<p>').text(`${dealer.City} - ${dealer.State} - ${dealer.ZipCode}`),
                $('<a>').text(dealer.WebSite).attr({
                    href: dealer.WebSite,
                    target: "_blank"
                }),
            )
        )
    })

    $(`${dealers}`).parent().addClass('active');

    Site.Dealers.SelectDealer(dealersList[0].Coordinate.Latitude, dealersList[0].Coordinate.Longitude);
}

Site.Dealers.SelectDealer = function (initialLatitude = 0, initialLongitude = 0) {
    const dealer = '.single-dealer';
    const dealerMap = '#dealersMap';
    const zoom = 15
    const size = '607x500';
    const markerColor = 'red';
    const key = 'AIzaSyAaEs5LYdDGrC1vh_Y9MXtvvBRxQGFCzg0'

    if (initialLatitude !== 0) {
        const coordinate = `${initialLatitude},${initialLongitude}`

        const url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + coordinate + '&zoom=' + zoom + '&markers=color:' + markerColor + '|' + coordinate + '&size=' + size + '&key=' + key;

        $(`${dealerMap}`).attr('src', url);
    }

    $(`${dealer}`).on('click', function () {
        const coordinate = `${$(this).attr('data-latitude')},${$(this).attr('data-longitude')}`

        const url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + coordinate + '&zoom=' + zoom + '&markers=color:' + markerColor + '|' + coordinate + '&size=' + size + '&key=' + key;

        $(`${dealerMap}`).attr('src', url);
    })
}

Site.Footer = function () {
    const backToTop = $('#backToTop')
    const cookies = $('.footer-cookies')
    const modalCookies = $('#modalCookies')
    const privacity = $('.footer-privacity')
    const modalPrivacity = $('#modalPrivacity')
    const notification = $('.footer-notification')
    const modalNotification = $('#modalNotification')

    backToTop.on('click', function () {
        let body = $("html, body");
        body.stop().animate({ scrollTop: 0 }, 500);
    })

    cookies.on('click', function (e) {
        e.preventDefault();
        $('body').addClass('no-scroll');

        modalCookies.addClass('active');

        modalCookies.find('.modal-close').on('click', function () {
            modalCookies.removeClass('active')
            $('body').removeClass('no-scroll');
        })
    })

    privacity.on('click', function (e) {
        e.preventDefault();
        $('body').addClass('no-scroll');

        modalPrivacity.addClass('active');

        modalPrivacity.find('.modal-close').on('click', function () {
            modalPrivacity.removeClass('active')
            $('body').removeClass('no-scroll');
        })
    })

    notification.on('click', function (e) {
        e.preventDefault();
        $('body').addClass('no-scroll');

        modalNotification.addClass('active');

        modalNotification.find('.modal-close').on('click', function () {
            modalNotification.removeClass('active')
            $('body').removeClass('no-scroll');
        })
    })
}

Site.ModalClose = function (close = false) {
    const modal = $('#modal');

    if (close) {
        modal.removeClass('active');
        modal.find('.modal-video').remove();
        modal.find('.modal-image').remove();
        $('body').removeClass('no-scroll');
    }
}

Site.Cookies = function () {
    const cookies = $('.cookies')
    const cookiesBtn = $('#cookiesOk')

    const hasCookies = localStorage.getItem('cookies-arocs')

    if (hasCookies === null || hasCookies === "") {
        cookies.removeClass('hidden')
    }

    cookiesBtn.on('click', function () {
        localStorage.setItem('cookies-arocs', "true")
        cookies.addClass('hidden')
    })
}

$(document).ready(function () {
    Site.Init();
});