$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Developer", "Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Developer", "Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });

    // Resume popup functionality
    $('.hire-btn').click(function(e){
        e.preventDefault();
        $('.resume-popup').addClass('active');
        $('.resume-popup').css('display', 'flex');
        renderPDF();
    });

    $('.close-btn').click(function(){
        $('.resume-popup').removeClass('active');
        setTimeout(function() {
            $('.resume-popup').css('display', 'none');
        }, 300);
    });

    $(window).click(function(e){
        if($(e.target).hasClass('resume-popup')){
            $('.resume-popup').removeClass('active');
            setTimeout(function() {
                $('.resume-popup').css('display', 'none');
            }, 300);
        }
    });

    $('.download-btn').click(function(e){
        e.preventDefault(); 
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = 'pdf/Gokulakrishnan.pdf';
        link.download = 'Gokulakrishnan_Resume.pdf'; 
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Projects filter functionality
    $('.filter-btn').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        
        let filter = $(this).data('filter');
        
        if(filter == 'all'){
            $('.project-card').show(400);
        } else {
            $('.project-card').not('[data-category="'+filter+'"]').hide(200);
            $('.project-card[data-category="'+filter+'"]').show(400);
        }
    });

    // Project image popup functionality
    $('.view-btn').click(function(e){
        e.preventDefault();
        const imgSrc = $(this).closest('.project-card').find('.project-img img').attr('src');
        $('#popup-image').attr('src', imgSrc);
        $('.project-popup').addClass('active');
        $('.project-popup').css('display', 'flex');
    });

    $('.project-popup-close').click(function(){
        $('.project-popup').removeClass('active');
        setTimeout(function() {
            $('.project-popup').css('display', 'none');
        }, 300);
    });

    $('.project-popup').click(function(e){
        if($(e.target).hasClass('project-popup')){
            $('.project-popup').removeClass('active');
            setTimeout(function() {
                $('.project-popup').css('display', 'none');
            }, 300);
        }
    });
});

function renderPDF() {
    const canvas = document.getElementById('pdf-render');
    const url = 'pdf/Gokulakrishnan.pdf';

    pdfjsLib.getDocument(url).promise.then(function(pdf) {
        pdf.getPage(1).then(function(page) {
            const viewport = page.getViewport({scale: 1.5});
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    });
}

function sendEmail(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Email body formatting
    const emailBody = `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
    `;

    // Using EmailJS to send email
    emailjs.send('service_s2jdzo3', 'template_9j2x4ic', {
        to_email: 'lamagokulakrishnan@gmail.com',
        from_name: name,
        from_email: email,
        subject: subject,
        message: emailBody,
    }).then(
        function(response) {
            showStatus('Sent!');
            document.getElementById('contactForm').reset();
        },
        function(error) {
            showStatus('Failed to send. Please try again.');
        }
    );

    return false;
}

function showStatus(message) {
    const statusElement = document.querySelector('.status-message');
    statusElement.textContent = message;
    statusElement.classList.add('show');
    
    setTimeout(() => {
        statusElement.classList.remove('show');
    }, 3000);
}