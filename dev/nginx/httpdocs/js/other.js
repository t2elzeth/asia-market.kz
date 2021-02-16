$('#product-quantity').on('change', function () {
    var selector = $(this).attr('data-target');
    var qty = $(this).val();
    $(selector).attr('qty', qty);
});
$('body').on('click', '.qty-changers', function (e) {
    e.preventDefault();

    var current = parseInt($(this).siblings('.current-qty').text());
    var initial = parseInt($(this).attr('data-initial'));

    if ($(this).hasClass('subs') && current > 1) {
        current -= 1;
    } else if ($(this).hasClass('add')) {
        current += 1;
    }

    $(this).siblings('.current-qty').text(current);
    $(this).parent().siblings('.update-cart').attr('qty', current);

    if (current != initial) {
        $(this).parent().siblings('.update-cart').removeClass('d-none');
    } else {
        $(this).parent().siblings('.update-cart').addClass('d-none');
    }
});

$('.order-modal-opener').on('click', function (e) {
    e.preventDefault();
    var data = $(this).attr('data');
    var order_id = $(this).attr('order-id');
    data = JSON.parse(data);
    $('#order-modal-label').text(`Заказ #${order_id}`);
    $('.order-html').html('');
    for (let i = 0; i < data.length; i++) {
        var $html = `
            <div class="order-item-modal">
                <p class="mb-0">
                    <span>
                        ${data[i].name}
                    </span>

                    <span>
                        - ${data[i].quantity} x ${data[i].price} ₸
                    </span>
                </p>
            </div>
        `;
        $('.order-html').append($html);
    }
    $('#order-modal').modal('show');
});
$('.add-address-toggler').on('click', function (e) {
    e.preventDefault();

    $('#address-modal-label').text('Новый адрес');
    $('#address-modal form').attr('action', '/account/add/address');
    $('[id^=address-]').val('');

    $('#address-modal').modal('show');
});
$('.update-address-toggler').on('click', function (e) {
    e.preventDefault();
    
    var address = $(this).attr('data');
    address = JSON.parse(address);
    
    $('#address-modal-label').text(`Изменить ${address.name}`);
    $('#address-modal form').attr('action', '/account/update/address');

    $('#address-id').val(address.id);
    $('#address-name').val(address.name);
    $(`#address-country option[value=${address.country}]`).attr('selected', 'selected');
    $('#address-street-address').val(address.address);
    $('#address-city').val(address.city);
    $('#address-email').val(address.email);
    $('#address-phone').val(address.phone);
    if (address.is_default) {
        $('#address-default').attr('checked', 'checked');
    }

    $('#address-modal').modal('show');
});