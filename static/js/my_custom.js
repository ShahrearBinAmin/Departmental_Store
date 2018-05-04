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

        //console.log(d[6]);
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

                //console.log(d[5] + "  " + typeof (d[5]));
                if (d[5] != "None") {
                    var end = d[5].split('-');
                    end = new Date(end[0], end[1], end[2]);
                    var differenceInMilisecond = end - start;

                    var year_age = Math.floor(differenceInMilisecond / 31536000000);
                    var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);
                    var month_age = Math.floor(day_age / 30);
                    day_age = day_age % 30;
                    $('#end_date').text(end.toDateString());
                    $('#time_range').text("Year :" + year_age + ", Month : " + month_age + ", Days : " + day_age);
                }
                else {
                    $('#end_date').text("Not Applicable");
                    $('#time_range').text("Days : 1");
                }


                var count = 0, slots = [], slot_number;
                for (var i = 6; i <= 10; i++) {
                    if (d[i].includes("checked")) {
                        slot_number = i - 5;
                        slots[count] = slot_number;
                        count++;
                    }
                }
                //console.log(slots);
                $('#slot_number').text(slots);
                if (d[11].includes("checked")) {
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




    });
    $('#confirm').click(function () {
        var email = $('#email').text()
        var room_name = $('#room_name').text()
        var start_date = $('#start_date').text()
        var end_date = $('#end_date').text()
        var time_range = $('#time_range').text()
        var time_slot = $('#slot_number').text()


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
        xhttp.open("POST", "http://127.0.0.1:5000/confirmation?query=Yes&name="
            + user + "&reqid=" + req_id + "&email=" + email + "&room_name=" + room_name
            + "&start_date=" + start_date + "&end_date=" + end_date + "&time_range=" + time_range
            + "&time_slot=" + time_slot, true);
        xhttp.send();

    });

    $('#discard').click(function () {
        var email = $('#email').text()
        var room_name = $('#room_name').text()
        var start_date = $('#start_date').text()
        var end_date = $('#end_date').text()
        var time_range = $('#time_range').text()
        var time_slot = $('#slot_number').text()

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
        xhttp.open("POST", "http://127.0.0.1:5000/confirmation?query=No&name="
            + user + "&reqid=" + req_id + "&email=" + email + "&room_name=" + room_name
            + "&start_date=" + start_date + "&end_date=" + end_date + "&time_range=" + time_range
            + "&time_slot=" + time_slot, true);
        xhttp.send();

    });

});




