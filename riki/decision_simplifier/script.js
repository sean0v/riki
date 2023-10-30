/**
 * JavaScript file for home page of the tool
*/


$('#get-started-btn').on('click', function()
{
    $('.main-page-text').addClass('fading');
    $('#get-started-btn').addClass('fading');
});


$("#get-started-btn").click(function() 
{
    setTimeout(function()
    {
        $(".left-section").addClass("fill-color");
    }, 400);

    setTimeout(function() 
    {
        window.location.href = './Tool/index.html';
    }, 1400);
});
