$('#checkout-form :checkbox').on('change', function (e) {
    if ($(this).attr('id') == 'checkout-pickup') {
        if (this.checked) {
            $('.delivery-information').addClass('d-none');
            $('.pickup-information').removeClass('d-none');
        } else {
            $('.delivery-information').removeClass('d-none');
            $('.pickup-information').addClass('d-none');
        }
    }
});

$('#checkout-region').on('change', function (e) {
    var value = $(this).val();
    var possible_values = [
        'Город Нур-Султан',
        'Город Алматы',
        'Город Шымкент'
    ];
    if (possible_values.indexOf(value) > -1) {
        $('#checkout-city').val(value.substring(6));
    }
});