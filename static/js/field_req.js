$(document).ready(function () {
    $('#my_data').dataTable({
        "aaSorting": [[3, 'desc']],
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
});
$(document).ready(function () {


    var table = $('#my_data').DataTable();
    var user, user_id;
    $('#my_data tbody').on('click', 'tr', function () {
        document.getElementById('appear').style.display = "block";

        var d = table.row(this).data();
        user = d['0'];
        req_id = d['1'];
        //console.log(d['0'] +typeof (d));

        console.log(d[4]);
        //console.log(d[6]);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var array = JSON.parse(this.response);
                //document.getElementById("para").innerHTML = xhttp.responseText;
                $('#username').text(array[0]);
                $('#email').text(array[1]);
                $('#contact').text(array[2]);
                $('#dept').text(array[3]);

                $('#room_name').text(d[2]);


                var start = d[4].split('-');
                start = new Date(start[0], start[1], start[2]);
                $('#start_date').text(start.toDateString());


                //console.log(slots);
                if (d[5].includes("checked")) {
                    $('#admin_confirmation').text("Yes");
                } else {
                    $('#admin_confirmation').text("No");
                }


            }
        };

        xhttp.open("GET", "http://127.0.0.1:5000/table_clicked?query=" + d[0], true);
        xhttp.send();

        var image_request = new XMLHttpRequest();
        image_request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var blob = image_request.response;
                var urlCreator = window.URL || window.webkitURL;

                var imageUrl = urlCreator.createObjectURL(blob);
                 //console.log(imageUrl);
                document.querySelector("#user_image").src = imageUrl;

               // console.log(image_request.responseText);

            }
        };

        image_request.open("GET", "http://127.0.0.1:5000/user_image?query=" + d[0], true);
        image_request.responseType = "blob";
        image_request.send();


        var payment_image_request = new XMLHttpRequest();
        payment_image_request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var arrayBufferView = new Uint8Array(this.response);
                var blob = new Blob([arrayBufferView], {type: "image/jpeg"});
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(blob);
                var img = document.querySelector("#payment_img");
                img.src = imageUrl;

                 document.querySelector("#payment_img").src = imageUrl;
                document.querySelector("#link_image").href = imageUrl;


            }
        };

        payment_image_request.open("GET", "http://127.0.0.1:5000/field_payment_image?query=" + d[1], true);
        payment_image_request.responseType = "arraybuffer";
        payment_image_request.send();


        $(function () {
            $('#aniimated-thumbnials').lightGallery({
                thumbnail: true,
                selector: 'a'
            });
        });

    });
    $('#confirm').click(function () {
        var email = $('#email').text()
        var room_name = $('#room_name').text()
        var start_date = $('#start_date').text()


        //alert("send clicked");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var reply = xhttp.responseText;
                if (reply == "Success") {
                    $("#success").show("slow", function () {
                        $("#success").hide("slow", function () {
                            location.reload();
                        });
                    });

                } else {
                    $("#error").show("slow", function () {
                        $("#error").hide("slow", function () {
                            location.reload();
                        });
                    });
                }

            }
        };
        xhttp.open("POST", "http://127.0.0.1:5000/field_confirmation?query=Yes&req_id=" + req_id + "&name="
            + user + "&email=" + email + "&room_name=" + room_name
            + "&start_date=" + start_date, true);
        xhttp.send();

    });

    $('#discard').click(function () {
        var email = $('#email').text()
        var room_name = $('#room_name').text()
        var start_date = $('#start_date').text()

        //alert("send clicked");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var reply = xhttp.responseText;
                if (reply == "Success") {
                    $("#success").show("slow", function () {
                        $("#success").hide("slow", function () {
                            $('#appear').hide("slow", function () {
                                location.reload();
                            });
                        });
                    });

                } else {
                    $("#error").show("slow", function () {
                        $("#error").hide("slow", function () {
                            $('#appear').hide("slow", function () {
                                location.reload();
                            });
                        });
                    });
                }

            }
        };
        //var send={confirmatin:"Yes"};
        //send.user_name=user;
        xhttp.open("POST", "http://127.0.0.1:5000/field_confirmation?query=No&req_id=" + req_id + "&name="
            + user + "&email=" + email + "&room_name=" + room_name
            + "&start_date=" + start_date, true);
        xhttp.send();

    });

});




