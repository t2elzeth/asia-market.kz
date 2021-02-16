// search
$('.prop_btn_filter').on('click', function(e){
  
   if ($(this).prop('checked')) {
    $('.load_gif').addClass('active');
    $('#payload_list').hide();
   var filter = $('.filter_form :input').filter(function(index, element) {
      return $(element).val() != '';
    });
    $.ajax({
      url: '/filterProduct?' + filter.serialize(),
      method: 'POST',
      success: function (html) {
        $('.load_gif').removeClass('active');
        $('#payload_list').show();
        $('#payload_list').html(html);
      }
    });
  }
});


$(document).ajaxComplete(function() {
    $('#search_pagination .pagination-wrap .pagination li a').click(function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        $.ajax({
            url: url,
            method: 'POST',
            success: function(data) {
              $('.load_gif').removeClass('active');
               $('#payload_list').html(data);
            }
        });
    });
});


// range

$('.watt_range-wrap .irs').on('mouseup', function(e){
 var filter = $('.filter_form :input').filter(function(index, element) {
      return $(element).val() != '';
    });
    $.ajax({
      url: '/filterProduct?' + filter.serialize(),
      method: 'POST',
      success: function (html) {
       $('#payload_list').html(html);
      }
    });
 
});




$('.min_filter_input').on('change',function(e){
  $('.load_gif').addClass('active');
  $('#payload_list').hide();
  var this_v = $(this);
  
  setTimeout(function () {
    var filter = $('.filter_form :input').filter(function(index, element) {
      return $(element).val() != '';
    });
    console.log("this min " + this_v.val());
    console.log("next max " + this_v.next().val());
    console.log("prop " + this_v.attr("data-prop"));
    console.log("*****");
    $.ajax({
      url: '/filterProduct?' + filter.serialize(),
      data: {
        min_prop_value: this_v.val(),
        max_prop_value: this_v.next().val(),
        prop_id: this_v.attr("data-prop"),
        category_id: $('.category_filter_id').val(),
      },
      method: 'POST',
      success: function (html) {
        $('.load_gif').removeClass('active');
        $('#payload_list').show();
       $('#payload_list').html(html);
      }
    });
    }, 500);
});


$('.max_filter_input').on('change', function(e){
  $('.load_gif').addClass('active');
  $('#payload_list').hide();
  var this_v = $(this);

  setTimeout(function () {
  var filter = $('.filter_form :input').filter(function(index, element) {
      return $(element).val() != '';
    });
    console.log("this max " + this_v.val());
    console.log("prev min " + this_v.prev().val());
    console.log("prop " + this_v.attr("data-prop"));
    console.log("*****");
    $.ajax({
      url: '/filterProduct?' + filter.serialize(),
      data: {
        min_prop_value: this_v.prev().val(),
        max_prop_value: this_v.val(),
        prop_id: this_v.attr("data-prop"),
        category_id: $('.category_filter_id').val(),
      },
      method: 'POST',
      success: function (html) {
        $('.load_gif').removeClass('active');
        $('#payload_list').show();
       $('#payload_list').html(html);
      }
    });
  }, 500);
});


$('.watt_range-wrap .irs').on('pointerup', function(e){

  var filter = $('.filter_form :input').filter(function(index, element) {
      return $(element).val() != '';
    });
    $.ajax({
      url: '/filterProduct?' + filter.serialize(),
      method: 'POST',
      success: function (html) {
     
       $('#payload_list').html(html);
      }
    });
 
});


$(document).ready(function(){
  
  $(".show_more_filter").click(function(e){
    e.preventDefault();
    $(this).siblings('.item-fiter:hidden').slice(0,3).fadeIn("slow");
    
    if($(this).siblings('.item-fiter:hidden').length == 0){
       $(this).fadeOut();
      }
  });
});




















