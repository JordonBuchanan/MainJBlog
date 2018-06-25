//$(".fa-chevron-down").click(function(e) {
    ///e.preventDefault();
    //$('.contactForm').toggleClass('contactFormActive')
    //$(this).slideDown;
//});

$(function(){
    $(".fa-chevron-down").click(function(){
        if($(".contactForm").hasClass('contactFormActive')){
            $(".contactForm").slideDown(1000);
        } else {
            $(".contactForm").addClass('contactFormActive');
        }
    });
});

$('.particle').particleground({
    dotColor: '#fff',
    lineColor: '#fff'
});