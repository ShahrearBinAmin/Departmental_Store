$(document).ready(function () {


    var path = window.location.pathname;
    console.log(path);
    $(function () {
        $('.trigger').click(function () {
            console.log("clicked");

            $('#add_class_btn').click(function () {
                var add_name = $('#add_room_name').val();
                var add_unit_price= $('#add_unit_price').val();
                var add_vendor= $('#add_vendor').val();
                var add_quantity= $('#add_quantity').val();
                // console.log(name+capacity);
                if (add_name.length > 2 && add_unit_price > 0 && add_vendor.length > 2 && add_quantity>0) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            // Typical action to be performed when the document is ready:
                            console.log(xhttp.responseText);
                            var reply = xhttp.responseText;
                            if (reply == "error") {
                                //$('#room_name').css({'background-color' : '#DD2C00'});
                                showAutoCloseTimerMessage(name);

                            } else {
                                location.reload();
                            }
                        }
                    };
                    console.log(add_vendor);

                    xhttp.open("GET", "http://127.0.0.1:5000/product_insert_data?new_name=" +add_name + "&price=" + add_unit_price+
                              "&quantity="+add_quantity+"&vendor="+add_vendor, true);

                    xhttp.send();
                } else {
                    showAutoCloseTimerMessage_add();
                }
            });

        });

    })
});

function delete_row(row) {
    var row = row.parentNode.parentNode;
    //console.log(typeof (p));
    //console.log(row);
    var id=row.childNodes[1].textContent;
    var name = row.childNodes[3].textContent;
    //console.log(name);
    showCancelMessage(name,id, row);

}

function showCancelMessage(room,id, row) {
    swal({
        title: "Are you sure?",
        text: room + " will be deleted!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {

            swal("Deleted!", "Product " + room + " is deleted", "success");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    var reply = xhttp.responseText;
                    if (reply == "Success") {
                        row.parentNode.removeChild(row);
                    }

                }
            };
            xhttp.open("GET", "http://127.0.0.1:5000/product_delete?name=" + id, true);


            xhttp.send();
        }
    });
}

function edit_row(row) {
    var row = row.parentNode.parentNode;
    // var path=window.location.pathname;
    //console.log(typeof (p));
    // console.log(row);
    var id = row.childNodes[1].textContent;
    var prev_name = row.childNodes[3].textContent;
    var price = row.childNodes[5].textContent;
    var qunatity = row.childNodes[7].textContent;
    var vendor = row.childNodes[9].textContent;
    console.log(id);
    document.getElementById("product_id").innerHTML = id;
    $('#room_name').val(prev_name);
    $('#unit_price').val(price);
    $('#quantity').val(qunatity);
    $('#vendor').val(vendor);

    $('#update').click(function () {
        var new_name = $('#room_name').val();
        var new_price = $('#unit_price').val();
        var new_vendor = $('#vendor').val();
        var new_quantity = $('#quantity').val();
        console.log(new_quantity);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                console.log(xhttp.responseText);
                var reply = xhttp.responseText;
                if (reply == "error") {
                    //$('#room_name').css({'background-color' : '#DD2C00'});
                    showAutoCloseTimerMessage(new_name);

                } else {
                    location.reload();
                }
            }
        };
        xhttp.open("GET", "http://127.0.0.1:5000/product_update_data?id=" + id + "&new_name=" + new_name +
            "&price=" + new_price + "&quantity=" + new_quantity + "&vendor=" + new_vendor, true);


        xhttp.send();
        console.log(id + " " + new_name + " " + new_price + " " + new_vendor + " " + new_qunatity);
    });

}

function showAutoCloseTimerMessage(new_name) {
    type_name = "Product"
    swal({
        title: "Error!",
        text: type_name + " " + new_name + " already exists",
        timer: 1500,
        showConfirmButton: false

    });
}

function showAutoCloseTimerMessage_add() {
    swal({
        title: "Error!",
        text: "Enter a vallid info",
        timer: 1500,
        showConfirmButton: false

    });
}



