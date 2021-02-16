var on_add_cart_text;
var on_update_cart_text;
var on_delete_cart_text;
function init_cart(on_add_cart, on_update_cart, on_delete_cart) {
    on_add_cart_text = 'Товар добавлен в корзину';
    on_update_cart_text = 'Товар успешно обновлен';
    on_delete_cart_text = 'Товар удален';
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
$('body').on('click', '.add-cart', function (e) {
    e.preventDefault();
    let product_id = $(this).attr('product-id');
    let qty = $(this).attr('qty');
    let options = [];
    $.ajax({
        url: '/cart/add',
        method: 'POST',
        data: {
            product_id,
            qty,
            options
        },
        success: function (reponse) {
            $('.cart-html').html(reponse.cart_list);
            $('.checkout-html').html(reponse.checkout_list);
            $('.open_main .count').text(reponse.count);
            $('.open-cart .count').text(reponse.count);
            $('.total').text(reponse.total);
            Notiflix.Notify.Success(on_add_cart_text);
        }
    });
});
$('body').on('click', '.update-cart', function (e) {
    e.preventDefault();
    let row_id = $(this).attr('row-id');
    let qty = $(this).attr('qty');
    $.ajax({
        url: '/cart/update',
        method: 'POST',
        data: {
            row_id,
            qty
        },
        success: function (reponse) {
            $('.cart-html').html(reponse.cart_list);
            $('.checkout-html').html(reponse.checkout_list);
            $('.open_main .count').text(reponse.count);
            $('.open-cart .count').text(reponse.count);
            $('.total').text(reponse.total);
            Notiflix.Notify.Success(on_update_cart_text);
        }
    });
});
$('body').on('click', '.remove-cart', function (e) {
    e.preventDefault();
    let row_id = $(this).attr('row-id');
    $.ajax({
        url: '/cart/remove',
        method: 'POST',
        data: {
            row_id
        },
        success: function (reponse) {
            $('.cart-html').html(reponse.cart_list);
            $('.checkout-html').html(reponse.checkout_list);
            $('.open_main .count').text(reponse.count);
            $('.open-cart .count').text(reponse.count);
            $('.total').text(reponse.total);
            Notiflix.Notify.Warning(on_delete_cart_text);
        }
    });
});
$('body').on('click', '.open-cart', function () {
    $('#cart-modal').modal('show');
});
