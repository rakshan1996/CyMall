function display_cart() {
    $.get("http://localhost:50403/api/cart", function (data, status) {
        $.each(data, function (index) {
            var id_cart = data[index].product_id;
            $.ajax({
                type: 'DELETE',
                url: "http://localhost:50403/api/cart/" + id_cart

            });            
            
        })

        alert("Products Bought" + " ");
        update_cart();


    })
}


