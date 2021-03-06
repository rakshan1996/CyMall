﻿function loadData() {

    $.get("http://localhost:50403/api/page", function (data, status) {
        var elements = $('.col-lg-12');
              
        $.each(data, function (index) {

            //elements.append("<div class='col-lg-4'>"+"<img src=\"" + data[index].image_name + "\" /img>"+ "<p>" + "₹" + data[index].cost + "      " + data[index].product_name + "</p>" + "<p>" + "Quantity:" + data[index].quantity + "</p>"+"</div>");

            elements.append("<div class='col-lg-4'>" + "<div class='card'>" + "<div class='card-image'>" + "<img src=\"" + data[index].image_name + "\"/>" + "</div>" + "<span class='card-title'>" + data[index].product_name + "</span>" + "<div class='card-content'>" + "<p>" + "₹" + data[index].cost + "</p>" + "<div class='card-action'>" + "<a onclick=" + "\"add_to_cart(" + data[index].product_id +")\">" + "Buy" + "</a>" + "</div>" + "</div>" + "</div>" + "</div>");
        })
    });





    $.get("http://localhost:50403/api/categories", function (data, status) {      
        var elemnts = $('#dropdown_ha');
        $.each(data, function (index) {
                    elemnts.append
                        ("<a onclick="+"\"displayCategory("+data[index].category_id+")\" "+">" + data[index].category_name + "</a>");

        })
    });

    $.get("http://localhost:50403/api/brands", function (data, status) {
        var elements = $('#sh_brand');
        $.each(data, function (index) {

            elements.append("<a onclick=" + "\"show_brand(" + data[index].brand_id+")\"" + ">" + data[index].brand_name + "</a>");
        })
    });

    
    

    
}


function load_cart_data() {
    var cost=0;
    $.get("http://localhost:50403/api/categories", function (data, status) {
        var elemnts = $('#dropdown_ha');
        $.each(data, function (index) {
            elemnts.append
                ("<a>" + data[index].category_name + "</a>");

        })
    });

    $.get("http://localhost:50403/api/brands", function (data, status) {
        var elements = $('#sh_brand');
        $.each(data, function (index) {

            elements.append("<a>" + data[index].brand_name + "</a>");
        })
    });

    $.get("http://localhost:50403/api/cart", function (data, status) {
        var elements = $('#cart_item');
        elements.empty();
        $.get("http://localhost:50403/api/page", function (product_info, status) {

            $.each(data, function (index) {
                var id_cart = data[index].product_id;
                var quant;
                var product_12 = product_info.find(function (product) {
                    return product.product_id == id_cart;
                });
                
                if (data[index].product_id == product_12.product_id) {
                    quant = data[index].quantity;                    
                }
                cost = cost + product_12.cost * quant;
                elements.append("<div class='col-lg-4'>" + "<div class='card'>" + "<div class='card-image'>" + "<img src=\"" + product_12.image_name + "\"/>" + "</div>" + "<span class='card-title'>" + product_12.product_name + "</span>" + "<div class='card-content'>" + "<p>" + "₹" + product_12.cost + "</p>" + "<p>" + "Quantity: " + quant + "</p>" + "<div class='card-action'>"  + "<a onclick=" + "\"remove_cart(" + product_12.product_id + ")\">" + " remove" + " </a>" + "</div>" + "</div>" + "</div>" + "</div>");
                var money = $('#cost');
                money.empty();
                money.append(cost);
               
            })
        })
    });
}

function update_cart() {
    var product;
    var cost = 0;
    var elements = $('#cart_item');
    var money = $('#cost');

    $.get("http://localhost:50403/api/cart", function (data, status) {
        elements.empty();
        money.empty();
        $.get("http://localhost:50403/api/page", function (product_info, status) {

            $.each(data, function (index) {
                var id_cart = data[index].product_id;
                var quant;
                var product_12 = product_info.find(function (product) {
                    return product.product_id == id_cart;
                });

                if (data[index].product_id == product_12.product_id) {
                    quant = data[index].quantity;
                }
                cost = cost + product_12.cost * quant;
                money.empty();
                money.append(cost);

                elements.append("<div class='col-lg-4'>" + "<div class='card'>" + "<div class='card-image'>" + "<img src=\"" + product_12.image_name + "\"/>" + "</div>" + "<span class='card-title'>" + product_12.product_name + "</span>" + "<div class='card-content'>" + "<p>" + "₹" + product_12.cost + "</p>" + "<p>" + "Quantity: " + quant + "</p>" + "<div class='card-action'>"  + "<a onclick=" + "\"remove_cart(" + product_12.product_id + ")\">" + " remove" + " </a>" + "</div>" + "</div>" + "</div>" + "</div>");
            })
        })
    });
}

function delete_from_cart(id) {
    var product;

    
    $.get("http://localhost:50403/api/cart", function (data, status) {

        product = data.find(function (cart) {
            return cart.product_id == id;
        });

        if (product.quantity <= 1) {
            $.ajax({
                type: 'DELETE',
                url: "http://localhost:50403/api/cart/" + id

            });
        }
        if (data.length == 0) {
            var money = $('#cost');

            money.append("₹" + " " + "0");
        }


    });
    
}