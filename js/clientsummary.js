
$(document).ready(function () {
    // events page.
    $("#btnClientHealthsummary").click(function () {
        //alert( "Handler for .click() called." );
        serverUrl = $("#dnacurl").val();
        const thisowner = $(this);
        thisowner.prop('disabled', true);
        console.info("Get all events fired");
        $.ajax({
            url: serverUrl + "/dna/intent/api/v1/client-health",
            type: 'get',
            async: true,
            crossDomain: true,
            headers: {
                "content-type": "application/json",
                "x-auth-token": $("#dnacauthtoken").val()
            },
            dataType: 'json',
            success: function (data) {
                console.info("events retreived");
                console.info(data);
            },
            complete: function () {
                console.info("get done");
                thisowner.prop('disabled', false);
            },
            error: function (e) {
                alert("Status code: " + e.status +"\n" + e.responseText);
                console.info(e);
            },
        });
    });
    
    // Save button.
    $("#na").click(function (e) {
        e.preventDefault();
        console.info("Saving login information...");
        localStorage.setItem('dnacurl', $("#dnacurl").val());
        localStorage.setItem('dnacusername', $("#dnacusername").val());
        localStorage.setItem('dnacpassword', $("#dnacpassword").val());
    });
});
