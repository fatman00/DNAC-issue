
// No ©copyright issues
// But we will be happy to see you whenever you use our code(^_^)
// Designed by @BlackX-Lolipop
// Content available by @BlackX-732
// Content available @ https://github.com/BlackX-732/AwesomeMenu
// Version 21.2.7**/
// https://facebook.com/BlackX-732
// https://twitter.com/

$(document).ready(function () {
    $(".sidebar-btn").click(function () {
        $(".wrapper").toggleClass("collapse");
    });
    // onClick function for all menu buttons with the clickable class.
    $(".sidebar .clickable").click(function () {
        // Hide all content "pages"
        $(".main-container .content").hide();
        // Get href URL from button clicked
        let btnClickedHref = $(this).attr("href");
        // Only show the "page" with the same ID as the button href
        $(".main-container "+btnClickedHref).show();
    });
    //.sidebar-menu .sub-menu a
    // This will show all unused menues as darked out.
    $(".sidebar-menu .sub-menu a").each(function() {
        if($(this).attr("href") == "#") {
            $(this).addClass("bg-dark");
        }
        //console.info($(this).attr("href"));
    });
});

function constructTable(list, selector) {
    // https://www.geeksforgeeks.org/how-to-convert-json-data-to-a-html-table-using-javascript-jquery/
    // Getting the all column names
    var cols = Headers(list, selector);

    // Traversing the JSON data
    for (var i = 0; i < list.length; i++) {
        var row = $('<tr/>');
        for (var colIndex = 0; colIndex < cols.length; colIndex++) {
            var val = list[i][cols[colIndex]];

            // If there is any key, which is matching
            // with the column name
            if (val == null) val = "";
            row.append($('<td/>').html(val));
        }

        // Adding each row to the table
        $(selector).append(row);
    }
}
function Headers(list, selector) {
    var columns = [];
    var header = $('<tr/>');

    for (var i = 0; i < list.length; i++) {
        var row = list[i];

        for (var k in row) {
            if ($.inArray(k, columns) == -1) {
                columns.push(k);

                // Creating the header
                header.append($('<th/>').html(k));
            }
        }
    }

    // Appending the header to the table
    $(selector).append(header);
    return columns;
}