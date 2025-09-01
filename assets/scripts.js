// Reservation dropdown toggle
function toggleReservation() {
    const menu = document.getElementById('reservationMenu');
    menu.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.reservation-dropdown');
    const menu = document.getElementById('reservationMenu');
    
    if (!dropdown.contains(event.target)) {
        menu.classList.remove('show');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Magnetic Button Functionality
function initMagneticButtons() {
    var magnets = document.querySelectorAll('.magnetic');
    var strength = 100;
    
    if(window.innerWidth > 540){
        magnets.forEach( (magnet) => {
            magnet.addEventListener('mousemove', moveMagnet );
            magnet.addEventListener('mouseleave', function(event) {
                gsap.to( event.currentTarget, 1.5, {
                  x: 0, 
                  y: 0, 
                  ease: Elastic.easeOut
                });
                gsap.to( $(this).find(".btn-text"), 1.5, {
                  x: 0, 
                  y: 0, 
                  ease: Elastic.easeOut
                });
            });
        });
    }

    function moveMagnet(event) {
        var magnetButton = event.currentTarget;
        var bounding = magnetButton.getBoundingClientRect();
        var magnetsStrength = magnetButton.getAttribute("data-strength");
        var magnetsStrengthText = magnetButton.getAttribute("data-strength-text");
          
        gsap.to( magnetButton, 1.5, {
            x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrength,
            y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrength,
            rotate: "0.001deg",
            ease: Power4.easeOut
        });
        gsap.to( $(magnetButton).find(".btn-text"), 1.5, {
            x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrengthText,
            y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrengthText,
            rotate: "0.001deg",
            ease: Power4.easeOut
        });
    }

    // Button Fill Animation
    $('.btn-click.magnetic').on('mouseenter', function() {
        if($(this).find(".btn-fill").length) {
            gsap.to($(this).find(".btn-fill"), .6, {
                startAt: {y: "76%"},
                y: "0%",
                ease: Power2.easeInOut
            });
        }
        if($(this).find(".btn-text-inner.change").length) {
            gsap.to($(this).find(".btn-text-inner.change"), .3, {
                startAt: {color: "#FFFFFF"},
                color: "#1C1D20",
                ease: Power3.easeIn,
            });
        }
    });

    $('.btn-click.magnetic').on('mouseleave', function() {
        if($(this).find(".btn-fill").length) {
            gsap.to($(this).find(".btn-fill"), .6, {
                y: "-76%",
                ease: Power2.easeInOut
            });
        }
        if($(this).find(".btn-text-inner.change").length) {
            gsap.to($(this).find(".btn-text-inner.change"), .3, {
                color: "#FFFFFF",
                ease: Power3.easeOut,
                delay: .3
            });
        }
    });
}

// Navigation functionality
$(document).ready(function(){
    // Show/hide hamburger on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('main').addClass('scrolled');
        } else {
            $('main').removeClass('scrolled');
        }
    });
    
    // Open/close navigation when clicked hamburger or menu button
    $(".btn-hamburger, .btn-menu").click(function(){
        if ($(".btn-hamburger").hasClass('active')) {
            $(".btn-hamburger").removeClass('active');
            $("body").removeClass('nav-active');
        } else {
            $(".btn-hamburger").addClass('active');
            $("body").addClass('nav-active');
        }
    });
    
    // Close nav when clicking background
    $('.fixed-nav-back').click(function(){
        $(".btn-hamburger").removeClass('active');
        $("body").removeClass('nav-active');
    });
    
    // Close nav when clicking nav link
    $('.fixed-nav .btn-link').click(function(){
        $(".btn-hamburger").removeClass('active');
        $("body").removeClass('nav-active');
    });
});

// Sticky Cursor avec images hover
function initStickyCursorWithDelay() {
    var cursorImage = $(".mouse-pos-list-image");
    var cursorBtn = $(".mouse-pos-list-btn");
    var cursorSpan = $(".mouse-pos-list-span");

    var posXImage = 0;
    var posYImage = 0;
    var posXBtn = 0;
    var posYBtn = 0;
    var posXSpan = 0;
    var posYSpan = 0;
    var mouseX = 0;
    var mouseY = 0;

    if(document.querySelector(".mouse-pos-list-image, .mouse-pos-list-btn, .mouse-pos-list-span")) {
        gsap.to({}, 0.0083333333, {
            repeat: -1,
            onRepeat: function() {
                if(document.querySelector(".mouse-pos-list-image")) {
                    posXImage += (mouseX - posXImage) / 12;
                    posYImage += (mouseY - posYImage) / 12;
                    gsap.set(cursorImage, {
                        css: {
                            left: posXImage,
                            top: posYImage
                        }
                    });
                }
                if(document.querySelector(".mouse-pos-list-btn")) {
                    posXBtn += (mouseX - posXBtn) / 7;
                    posYBtn += (mouseY - posYBtn) / 7;
                    gsap.set(cursorBtn, {
                        css: {
                            left: posXBtn,
                            top: posYBtn
                        }
                    });
                }
                if(document.querySelector(".mouse-pos-list-span")) {
                    posXSpan += (mouseX - posXSpan) / 6;
                    posYSpan += (mouseY - posYSpan) / 6;   
                    gsap.set(cursorSpan, {
                        css: {
                            left: posXSpan,
                            top: posYSpan
                        }
                    });
                }
            }
        });
    }

    $(document).on("mousemove", function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Gestion du hover sur les éléments de service
    $('.mouse-pos-list-image-wrap a').on('mouseenter', function() {
        $('.mouse-pos-list-image, .mouse-pos-list-btn, .mouse-pos-list-span').addClass('active');
    });
    $('.mouse-pos-list-image-wrap a').on('mouseleave', function() {
        $('.mouse-pos-list-image, .mouse-pos-list-btn, .mouse-pos-list-span').removeClass('active');
    });

    $('.mouse-pos-list-image-wrap li.visible').on('mouseenter', function() {
        var $elements = $(".mouse-pos-list-image-wrap li.visible");
        var index = $elements.index($(this));
        var count = $(".mouse-pos-list-image li.visible").length;
        
        if($(".float-image-wrap")) {
            gsap.to($(".float-image-wrap"), {
                y: (index*100)/(count*-1) + "%",
                duration: .6,
                ease: Power2.easeInOut
            });
        }
        $(".mouse-pos-list-image.active .mouse-pos-list-image-bounce").addClass("active").delay(400).queue(function(next){
            $(this).removeClass("active");
            next();
        });
    });
}

// Update local time in footer (exactement comme Denis)
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    
    // Get timezone offset
    const offset = now.getTimezoneOffset();
    const hours = Math.abs(Math.floor(offset / 60));
    const sign = offset <= 0 ? '+' : '-';
    const timezone = `UTC${sign}${hours}`;
    
    const fullTimeString = `${timeString} ${timezone}`;
    
    const timeElement = document.getElementById('timeSpan');
    if (timeElement) {
        timeElement.textContent = fullTimeString.toUpperCase();
    }
}

// Initialize ripples effect on all sections when DOM is loaded
$(document).ready(function() {
    // Initialize magnetic buttons
    initMagneticButtons();
    
    // Initialize sticky cursor with images
    initStickyCursorWithDelay();
    
    // Initialize time update
    updateTime();
    setInterval(updateTime, 1000);
    
    // Apply ripples to all main sections
    $('#home').ripples({
        resolution: 500,
        dropRadius: 20,
        perturbance: 0.04
    });
    
    $('#services').ripples({
        resolution: 400,
        dropRadius: 15,
        perturbance: 0.03
    });
    
    $('#galerie').ripples({
        resolution: 400,
        dropRadius: 15,
        perturbance: 0.03
    });
    
    $('#contact').ripples({
        resolution: 400,
        dropRadius: 15,
        perturbance: 0.03
    });
});