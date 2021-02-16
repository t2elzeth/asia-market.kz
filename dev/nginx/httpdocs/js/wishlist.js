var on_add_wishlist_text;
var on_delete_wishlist_text;
function init_wishlist(on_add_wishlist, on_delete_wishlist) {
    on_add_wishlist_text = on_add_wishlist;
    on_delete_wishlist_text = on_delete_wishlist;
    Notiflix.Notify.Init({
        timeout: 2000,
        plainText: false,
        messageMaxLength: 1000
    });
}

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
// $('body').on('click', '.add-wishlist', function (e) {
//     e.preventDefault();
//     let product_id = $(this).attr('product-id');
//     let qty = $(this).attr('qty');
//     let options = [];
//     $.ajax({
//         url: '/wishlist/add',
//         method: 'POST',
//         data: {
//             product_id,
//             qty,
//             options
//         },
//         success: function (reponse) {
//             $('.wishlist-html').html(reponse.wishlist_list);
//             $('.open-wishlist .count').text(reponse.count);
//             Notiflix.Notify.Success(on_add_wishlist_text);
//         }
//     });
// });
// $('body').on('click', '.remove-wishlist', function (e) {
//     e.preventDefault();
//     let row_id = $(this).attr('row-id');
//     $.ajax({
//         url: '/wishlist/remove',
//         method: 'POST',
//         data: {
//             row_id
//         },
//         success: function (reponse) {
//             $('.wishlist-html').html(reponse.wishlist_list);
//             $('.open-wishlist .count').text(reponse.count);
//             Notiflix.Notify.Warning(on_delete_wishlist_text);
//         }
//     });
// });

// $('body').on('click', '.open-wishlist', function () {
//     $('#wishlist-modal').modal('show');
// });




$('body').on('click', '.add-wishlist', function (e) {
    e.preventDefault();
    let product_id = $(this).attr('product-id');
    let qty = $(this).attr('qty');
    let options = [];
    $.ajax({
        url: '/wishlist/add',
        method: 'POST',
        data: {
            product_id,
            qty,
            options
        },
        success: function (response) {
             $('.open-wishlist .count').text(response.count);
             $(`a[product-id="${product_id}"]`).removeClass("add-wishlist").addClass("remove-wishlist active");
            $(`a[product-id="${product_id}"]`).attr('row-id', response.row_id);
            // $('.wishlist-html').html(reponse.wishlist_list);
            //Notiflix.Notify.Success(on_add_wishlist_text);
        }
    });
});
$('body').on('click', '.remove-wishlist', function (e) {
    e.preventDefault();
    let row_id = $(this).attr('row-id');
    let product_id = $(this).attr('product-id');
    $.ajax({
        url: '/wishlist/remove',
        method: 'POST',
        data: {
            product_id,
            row_id
        },
        success: function (reponse) {
            $('.open-wishlist .count').text(reponse.count);
            $(`a[product-id="${product_id}"]`).removeClass("remove-wishlist active").addClass("add-wishlist");
            $('.wishlist-html').html(reponse.wishlist_list);
            //Notiflix.Notify.Warning(on_delete_wishlist_text);
        }
    });
});
