import isRoute from '../helpers/isRoute.js';
import anime from '../vendor/anime.js';

export default class Homepage {
    constructor() {
        const that = this;
        const currentRoute = new isRoute('template--homepage');

        // Check if route is on homepage
        if (currentRoute.isCurrent()) {
            that.animateShapes();
            that.demoScroll();
            that.submitForm();
        }
    }

    submitForm() {
        const addErr = function ($el, text) {
            $el.addClass('hasErr')
                .parent('div')
                .find('.homepage-form__error')
                .text(text);
        };

        const checkForErr = function () {
            // Remove all messages
            $('.homepage-form__error').text('');
            // Remove all errors
            $('.hasErr').removeClass('hasErr');
            let name = $('.form_name').val().trim() || '';
            let phone = $('.form_phone').val().trim() || '';
            let email = $('.form_email').val().trim() || '';

            let errors = 0;
            if (name.length <= 2) {
                addErr(
                    $('.form_name'),
                    'Your Name must have at least 3 characters',
                );
                errors++;
            }
            if (
                !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
                    phone,
                )
            ) {
                addErr($('.form_phone'), 'Please enter a valid phone number');
                errors++;
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                addErr(
                    $('.form_email'),
                    'This email isn’t recognised, please check.',
                );
                errors++;
            }

            return errors === 0
                ? { name: name, phone: phone, email: email }
                : false;
        };

        $(document).on('click', '.homepage-form__form .cta', function () {
            var formFields = checkForErr();
            if (checkForErr()) {
                $.ajax({
                    url: '/contact.php',
                    type: 'POST',
                    data: formFields,
                    success: function (response) {
                        console.log(response);
                        if (response == 'email-sent') {
                            $('.homepage-form__form .cta')
                                .parent('div')
                                .html(
                                    '<img src="/media/icons/check.svg" style="width:25px; height:25px; margin-right:5px;" /> Request submitted! Thanks, we’ll be in touch in 1-3 working days.',
                                );
                        } else {
                            alert(
                                'Ups, something went wrong, try again later!',
                            );
                        }
                    },
                    error: function () {
                        alert('Ups, something went wrong, try again later!');
                    },
                });
            }
        });
    }

    demoScroll() {
        $(document).on('click', 'a[href="#RequestDemo"]', function (event) {
            event.preventDefault();
            $('html, body').animate(
                { scrollTop: $('#RequestDemo').offset().top - 50 },
                800,
            );
        });
        $(document).on('click', 'a[href="#Categories"]', function (event) {
            event.preventDefault();
            $('html, body').animate(
                { scrollTop: $('#Categories').offset().top },
                800,
            );
        });
    }

    animateShapes() {
        const svgLeft = document.querySelector('.morph-left');
        const shapeElLeft = svgLeft.querySelector('path');
        const shapeLeft = {
            path:
                'M 415.6,206.3 C 407.4,286.6 438.1,373.6 496.2,454.8 554.3,536.1 497,597.2 579.7,685.7 662.4,774.1 834.3,731.7 898.5,653.4 962.3,575 967.1,486 937.7,370 909.3,253.9 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
            pathAlt:
                'M 415.6,206.3 C 407.4,286.6 415.5,381.7 473.6,462.9 531.7,544.2 482.5,637.6 579.7,685.7 676.9,733.8 826.2,710.7 890.4,632.4 954.2,554 926.8,487.6 937.7,370 948.6,252.4 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
        };

        const svgRight = document.querySelector('.morph-right');
        const shapeElRight = svgRight.querySelector('path');
        const shapeRight = {
            path:
                'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
            pathAlt:
                'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
        };

        const initShapeLoop = function (pos) {
            anime({
                targets: shapeElLeft,
                easing: 'linear',
                d: [
                    { value: shapeLeft.pathAlt, duration: 2500 },
                    { value: shapeLeft.path, duration: 3500 },
                ],
                loop: true,
                direction: 'alternate',
            });

            anime({
                targets: shapeElRight,
                easing: 'linear',
                d: [
                    { value: shapeRight.pathAlt, duration: 3500 },
                    { value: shapeRight.path, duration: 4500 },
                ],
                loop: true,
                direction: 'alternate',
            });
        };

        initShapeLoop();
    }
}
