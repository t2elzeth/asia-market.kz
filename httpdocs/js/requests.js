$('#sort, #per-page').on('change', function () {
    var path_name = window.location.pathname;
    if (path_name.includes('/category/')) {
        var id = path_name.substring(10);
        var sort_order = $('#sort').val();
        var per_page = $('#per-page').val();
        var sort = sort_order.substring(0, sort_order.indexOf('-'));
        var order = sort_order.substring(sort_order.indexOf('-') + 1);
        window.location.replace(`/category/${id}?sort=${sort}&order=${order}&per_page=${per_page}&page=1`);
    } else if (path_name.includes('/search')) {
        var search = $('#search').val();

        var sort_order = $('#sort').val();
        var per_page = $('#per-page').val();
        var sort = sort_order.substring(0, sort_order.indexOf('-'));
        var order = sort_order.substring(sort_order.indexOf('-') + 1);
        window.location.replace(`/search?search=${search}&sort=${sort}&order=${order}&per_page=${per_page}&page=1`);
    }
});