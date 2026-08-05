(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        } 
    });
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // vegetable carousel
    $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });

    // Scroll Reveal Animation
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal-item, .scroll-reveal');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        if (entry.target.classList.contains('scroll-reveal')) {
                            const animationType = entry.target.dataset.animation || 'show-up';
                            entry.target.classList.add(animationType);
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            revealElements.forEach(element => observer.observe(element));
        } else {
            // Fallback for browsers without IntersectionObserver
            revealElements.forEach(element => {
                element.classList.add('visible');
                if (element.classList.contains('scroll-reveal')) {
                    const animationType = element.dataset.animation || 'show-up';
                    element.classList.add(animationType);
                }
            });
        }
    }

    // Initialize scroll reveal when document is ready
    $(document).ready(function() {
        initScrollReveal();
        initNetlifyForms();
    });

    function initNetlifyForms() {
        const forms = document.querySelectorAll('form[data-netlify]');

        forms.forEach(form => {
            const messageEl = form.querySelector('.form-success-message');
            const formName = form.getAttribute('name');
            const storageKey = formName ? `netlify-form-submitted-${formName}` : null;

            if (messageEl && storageKey && localStorage.getItem(storageKey)) {
                messageEl.textContent = 'Thanks! Your submission was received. The form is cleared.';
                messageEl.classList.remove('d-none', 'alert-danger');
                messageEl.classList.add('alert-success');
                localStorage.removeItem(storageKey);

                setTimeout(() => {
                    if (messageEl) {
                        messageEl.classList.add('d-none');
                    }
                }, 5000);
            }

            form.addEventListener('submit', function() {
                if (storageKey) {
                    localStorage.setItem(storageKey, 'true');
                }
            });
        });
    }

})(jQuery);

