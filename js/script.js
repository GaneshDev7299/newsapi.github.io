// Global Variables
var i= 0;
var author = null;
var title = null;
var description = null;
var artUrl = null;
var imgUrl = null;          
var artDate = null; 
var $article = null;
var scroll = 1;
var query = "reactjs";
var pageSize = 10;

$(document).ready(function(){
    // Timer
    var timer = 30;

    setInterval(function(){ 
        timer--;
        $(".timer").text(timer);
        if(timer == 0){
            timer = 30; 
        }
    }, 1000);

    // Check URL
    query  = getSearchParams("query");
    if((query != "") && (query != undefined) && (query != null)){
       
        $(".search-input").val(query);
       
        $.ajax({
            url:"https://newsapi.org/v2/everything?q="+query+"&apiKey=363d26dd3d664d199ca63adc371e22aa&pageSize="+pageSize+"&page=1",
            method: "GET",
            error: function() {
                console.log("error in connection");
            },
            success: function(data) {
                if(data.articles.length == 0){
                    $(".item-loader").hide();
                    $(".news-wrapper").html("<p class='error'>Sorry! Related articles are not found!!<p>");
                }else{
                    processData(data);
                }
            }
        });
    }
    else{
        // Get common Data From API
        $.ajax({
            url:"https://newsapi.org/v2/everything?q="+query+"&apiKey=363d26dd3d664d199ca63adc371e22aa&pageSize="+pageSize+"&page=1",
            method: "GET",
            error: function() {
                console.log("error in connection");
            },
            success: function(data) {
                if(data.articles.length == 0){
                    $(".item-loader").hide();
                }else{
                    processData(data);
                }
            }
        });
    }
});


// API Function
function processData(data) { 

    for (i = 0; i < data.articles.length; i++) {

        author = data.articles[i].author;
        title = data.articles[i].title;
        description = data.articles[i].description;
        artUrl = data.articles[i].url;
        imgUrl = data.articles[i].urlToImage;          
        artDate = data.articles[i].publishedAt;       

        $article = $('<div class="news-item"><div class="news-inner-container"><div class="news-image-container"><img src="'+imgUrl+'" alt="news-images"></div><div class="news-content-container lazy"><h3 class="news-title news-title-'+i+'">'+title +'</h3><div class="news-source-date"><span class="news-author"> By '+ author + '</span> | <span class="news-date">'+ artDate+'</span></div><div class="title-description"><p>'+description+'</p></div><a href="'+artUrl+'" target="_blank" class="goto-button">Continue Reading</a></div></div></div>');

        $(".news-wrapper").append($article);
    }

}

//URL get value
function getSearchParams(k){
    var p={};
    location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
    return k?p[k]:p;
}

//Lazy load
$(window).scroll(function()
{
    if($(window).scrollTop() == $(document).height() - $(window).height())
    {
        scroll++;
        console.log("Query "+ query +" Page " + scroll);
        $.ajax({
            url:"https://newsapi.org/v2/everything?q="+query+"&apiKey=363d26dd3d664d199ca63adc371e22aa&pageSize="+pageSize+"&page="+scroll,
            method: "GET",
            error: function() {
                console.log("error in connection");
            },
            success: function(data) {
                if(data.articles.length == 0){
                    $(".item-loader").hide();
                }else{
                    processData(data);
                }
            }
        });
    }
        
});