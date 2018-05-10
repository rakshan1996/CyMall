function displayCategory(id) {
    var elemnts = $('.col-lg-12');
    elemnts.empty();
    
    $.get("http://localhost:50403/api/page", function (data, status) {
        
        var product = data.filter(function (product) {
            return product.category_id == id;
        });

        console.log(product);
        $.each(product, function (index) {
           
            elemnts.append("<div class='col-lg-4'>" + "<div class='card'>" + "<div class='card-image'>" + "<img src=\"" + product[index].image_name + "\"/>" + "</div>" + "<span class='card-title'>" + product[index].product_name + "</span>" + "<div class='card-content'>" + "<p>" + "₹" + product[index].cost + "</p>" + "<div class='card-action'>" + "<a onclick=" + "\"add_to_cart(" + data[index].product_id + ")\">" + "Buy" + "</a>" + "<span>" + "     " + "</span>" +  "</div>" + "</div>" + "</div>" + "</div>");

        })
    });
    
    

} 
