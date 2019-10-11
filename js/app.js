$reloadTime = 1000; // 1 min=60s=60000ms
$reloadTime2 = 60000; //only for logs

$(document).on("pageshow", "#status", function(e) {
    persistentNavbar(e);
    console.log('pageshow triggered');
    updateStatus();
    $statusPageReloadObj = setInterval(updateStatus, $reloadTime);
});

$(document).on("pagehide", "#status", function(e) {
    console.log('status pagehide triggered');
    clearInterval($statusPageReloadObj);
});

$(document).on("pageshow", "#mark5", function(e) {
    persistentNavbar(e);
    console.log('pageshow triggered');
    updateMark5();
    setInterval(updateMark5, $reloadTime);
});

$(document).on("pageshow", "#systemtemp", function(e) {
    persistentNavbar(e);
    console.log('pageshow triggered');
    updateSystemTemp();
    setInterval(updateSystemTemp, $reloadTime);
});
$(document).on("pageshow", "#antenna", function(e) {
    persistentNavbar(e);
    console.log('pageshow triggered');
    updateAntenna();
    setInterval(updateAntenna, $reloadTime);
});
$(document).on("pageshow", "#station", function(e) {
    persistentNavbar(e);
    console.log('pageshow triggered');
    updateStation();
    setInterval(updateStation, $reloadTime);
});
$(document).on("pageshow", "#logs", function(e) {
    persistentNavbar(e);
    console.log('pageshow triggered');
    updateLogs();
    setInterval(updateLogs, $reloadTime2);
});
$(document).on("pageshow", "#picture", function(e) {
    // persistentNavbar(e);
    console.log('pageshow triggered');
    // updatePicture();
    // setInterval(updatePicture, $reloadTime);
});
$(document).ready(function() {
    // $.mobile.changePage("#mark5");
    // updateSystemTemp();
});

persistentNavbar = function(e) {
    console.log('navbar triggered');
    $("[data-role = 'header']").toolbar();
    // Each of the 4 pages in this example has a data-title attribute
    // which value is equal to the nav button's href
    // For e.g., on first page: <div data-role = "page" data-title = "Details">
    var current = $(".ui-page-active").jqmData("title");

    // Remove active class
    $("[data-role = 'navbar'] a.ui-btn-active").removeClass("ui-btn-active");

    // Add active class to current nav button
    $("[data-role = 'navbar'] a").each(function() {
        if (this.attributes["href"].value.slice(1) === current) {
            $(this).addClass("ui-btn-active");
        }
    });

}