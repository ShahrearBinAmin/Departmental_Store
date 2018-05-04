
          var table;
          var jq =  $.noConflict();
          $(document).ready( function ($) {

            table  = $('#myTable').DataTable();

          } );

          $('body').on('click', '#apply', function(){
         //to get currently clicked row object

          var row  = $(this).parents('tr')[0];

          data = table.row( row ).data();
          alert(data[0]);

          });

