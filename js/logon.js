
$(document).ready(function () {
    // LOGIN page.
    $("#dnacsubmit").click(function () {
        //alert( "Handler for .click() called." );
        serverUrl = $("#dnacurl").val();
        const thisowner = $(this);
        var myHeaders = {
            "Content-Type": "application/json",
            "Authorization": "Basic " + utf8_to_b64($("#dnacusername").val() + ":" + $("#dnacpassword").val()),
            "Accept": "application/json"
        }
        console.info("starting authentication");
        thisowner.prop('disabled', true);
        $.ajax({
            url: serverUrl + "/dna/system/api/v1/auth/token",
            type: 'post',
            async: true,
            crossDomain: true,
            headers: myHeaders,
            dataType: 'json',
            success: function (data) {
                console.info("Authentication success");
                $("#dnacauthtoken").val(data.Token);
                thisowner.prop('disabled', true);
            },
            complete: function () {
                thisowner.prop('disabled', false);
            },
            error: function (e) {
                alert("Status code: " + e.status +"\n" + e.responseText);
                console.info(e);
            },
            beforeSend: function (request) {
                request.withCredentials = false;
            }
        });
    });
    
    // Save button.
    $("#dnacsave").click(function (e) {
        e.preventDefault();
        console.info("Saving login information...");
        localStorage.setItem('dnacurl', $("#dnacurl").val());
        localStorage.setItem('dnacusername', $("#dnacusername").val());
        localStorage.setItem('dnacpassword', $("#dnacpassword").val());
    });

    // Load button.
    $("#dnacload").click(function (e) {
        e.preventDefault();
        console.info("Loading login information...");
        $("#dnacurl").val(localStorage.getItem('dnacurl'));
        $("#dnacusername").val(localStorage.getItem('dnacusername'));
        $("#dnacpassword").val(localStorage.getItem('dnacpassword'));
    });

    // clear button.
    $("#dnacclear").click(function (e) {
        e.preventDefault();
        console.info("Deleting login information...");
        localStorage.clear();
    });
    $("#loginDnacSelector").change(() => {
        // Autofill the input boxes with information from the selected options value.
        selectedVal=$("#loginDnacSelector").children("option:selected").val();
        $("#dnacurl").val(selectedVal.split(";")[0]);
        $("#dnacusername").val(selectedVal.split(";")[1]);
        $("#dnacpassword").val(selectedVal.split(";")[2]);
    });
});

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}