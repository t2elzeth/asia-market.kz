// burger
$(document).ready(function () {
    $('.burder_menu').click(function (event) {
        $('.burder_menu, #main-menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
});
$('.link').on('click', function(){
    $('.burder_menu, #main-menu').toggleClass('active');
    $('body').toggleClass('lock');
});
