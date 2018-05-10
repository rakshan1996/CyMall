function add_to_cart(id) {
    var product;
    $.get("http://localhost:50403/api/cart", function (data, status) {

        product = data.find(function (cart) {
            return cart.product_id == id;
        });
        
        if (product == null) {

            $.get("http://localhost:50403/api/page", function (data, status) {

                product = data.find(function (product) {
                    return product.product_id == id;
                });
                var objec = {
                    'product_id': product.product_id,
                    'quantity': 1
                }
                $.post("http://localhost:50403/api/cart", objec, JSON);

            });

        }
        else {
            $.post("http://localhost:50403/api/updateCart/"+ id, JSON);
            update_cart();
        }
        

    });
}

function remove_cart(id) {
    var product;

    $.get("http://localhost:50403/api/cart", function (data, status) {
        console.log(data);
        $.each(data, function (index) {
            console.log(data[index].quantity);
            if (data[index].quantity == 0) {
                $.ajax({
                    type: 'DELETE',
                    url: "http://localhost:50403/api/cart/" + data[index].product_id

                });
            }

        });
    });
    
    
    $.get("http://localhost:50403/api/cart", function (data, status) {

        product = data.find(function (cart) {
            return cart.product_id == id;
        });

        if (product != null) {
            $.post("http://localhost:50403/api/cart/" + id, JSON);
        }
        
            
        
            update_cart();
    });
}