
$(document).ready(function () {
    //btnDashboardTest
    $("#btnDashboardTest").click(function (e) {
        e.preventDefault()
        serverUrl = $("#dnacurl").val();
        console.info("Getting discovery list");
        const thisowner = $(this);
        thisowner.prop('disabled', true);
        $.ajax({
            // /api/v1/discovery/1/10
            // Use the count number for something
            // https://sandboxdnac2.cisco.com/api/v1/discovery/count = {"response":16,"version":"1.0"}
            url: serverUrl + "/api/v1/global-credential?credentialSubType=CLI",
            type: 'get',
            async: true,
            crossDomain: true,
            headers: {
                "content-type": "application/json",
                "x-auth-token": $("#dnacauthtoken").val()
            },
            dataType: 'json',
            success: function (data) {
                console.info("Test Job Done");
                console.info(data);
            },
            complete: function() {
                thisowner.prop('disabled', false);
            },
            error: function (e) {
                alert("Status code: " + e.status +"\n" + e.responseText);
                console.info(e);
            },
        });
    });
    //btnDashboardd3Test
    $("#btnDashboardd3Test").click(function (e) {
        e.preventDefault()
        d3.selectAll(".d3").style("background-color", "green");
    });
});