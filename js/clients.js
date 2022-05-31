
$(document).ready(function () {
    // events page.
    $("#btnClientHealth").click(function () {
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
                var tabledata = [];
                $.each(data.device, function (i, site) {
                    console.info(site.response);
                    console.info(site.response.length);
                    if(site.response.length) {                   
                        $.each(site.response, function(i, device) {
                            tabledata.push(device);
                            console.info(device);
                        });
                    };
                });
                var table = new Tabulator("#allEvents", {
                    data:data,
                    autoColumns:false,
                    layout:"fitDataFill",
                    pagination:"local",
                    paginationSize:20,
                    paginationSizeSelector:[10, 20, 50, 100, 1000],
                    //index:"hostname", //set the index field to the "hostname" field.
                    columns:[
                        {title:"Name", field:"name", headerFilter:"input"},
                        {title:"Namespace", field:"namespace", headerFilter:true},
                        {title:"Description", field:"description", headerFilter:true},
                        {title:"Event ID", field:"eventId"},
                        {title:"Category", field:"category"},
                        {title:"Severity", field:"severity"},
                        {title:"Domain", field:"domain"},
                        {title:"Tags", field:"tags"},
                    ],
                });
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
