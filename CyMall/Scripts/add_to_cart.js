﻿

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
            
        }
        

    });
}

function remove_cart(id) {
    var product;    
    $.get("http://localhost:50403/api/cart", function (data, status) {

        product = data.find(function (cart) {
            return cart.product_id == id;
        });
       
        if (product != null) {
            if (product.quantity <= 1) {
                delete_from_cart(id);
                update_cart();
            }
            else {
                $.post("http://localhost:50403/api/cart/" + id, JSON);
                update_cart();
            }

        }
        else {
            
            if (data.length == 0) {
                var elements = $('#cart_item');
                elements.empty();
            }
        }
        
    });
}