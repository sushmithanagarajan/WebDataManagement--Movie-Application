function initialize () {
 //function to intialise the function onload
}

function Clean(){
  //function to clean the result of the page
  document.getElmentById('display').innerHTML='';
}

function sendRequest () {
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("form-input").value);
   xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          var i;
          for(i=0; i<json.results.length; i++)
          { 
            //for every result open the details from a hyperlink
            console.log(json.results[i]["id"])
            document.getElementById("output").innerHTML  += "<pre><a href='#' onclick ='myfinalresult("+json.results[i]["id"]+")'>" + json.results[i]["original_title"] +"&nbsp;"+ json.results[i]["release_date"] + "</a></pre>" ;
          }
        }
   };
   xhr.send(null);
}

function myfinalresult(id){
  //display the movie details from the click of a url 
   var xhr = new XMLHttpRequest();
   xhr.open("GET", "proxy.php?method=/3/movie/"+id);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4){
        var json = JSON.parse(this.responseText);
        var str = JSON.stringify(json,undefined,2);
        var img_url = "http://image.tmdb.org/t/p/w185/";
        var generes = json["generes"];
        var castName = fetchGenre(id, json);
        var summary = json["overview"];
        if (summary<1)
        {
          summary = "No summary found";
        }
        else
        {
          summary = json["overview"];
        }
        console.log("Cast Name");
        console.log(castName);
        document.getElementById("output1").innerHTML = "<pre><img src=" + img_url+json["poster_path"] + " alt = NoimagefoundinTMDB></pre>"+"<pre><h1>Title:" + json["original_title"]+ "</h1><pre>" + "</pre>"+"<pre><h3>Movie Summary:" + summary+ "</h3>&nbsp;<pre>"+"<pre><h3>Genre:" + castName + "</h3>&nbsp;<pre>"+"<pre><h3>Cast&Crew:"+Castinfo(id)+" </h3>";
       }
     };
  xhr.send(null);
}
function fetchGenre(id, jsonstring){
      var json = jsonstring;
      var genreName = "";
      var genre = json["genres"];
      console.log(genre);
      var k;
      if(genre.length<1)
      {
        genreName = "No value in TMDB";
      }
      else
      {
      for (k=0;k<=genre.length-1;k++)
      {
        genreName = genreName + genre[k]["name"];

        console.log(genreName);
      } 
    }
  return genreName;
}
function Castinfo(id){
   console.log("i reached");
   var xhr = new XMLHttpRequest();
   console.log("i reached");
   xhr.open("GET", "proxy.php?method=/3/movie/"+id+"/credits");
   console.log("i reached");
   xhr.setRequestHeader("Accept","application/json");
   console.log("i reached");
   xhr.onreadystatechange = function () {
   console.log("i reached");
       if (this.readyState == 4){
        var json = JSON.parse(this.responseText);
        var str = JSON.stringify(json,undefined,2);
        var cast = json["cast"];
        var len = cast.length;
        var m;
        var x;
        var res = "";
        if (cast.length>5){
        for(m=0;m<5;m++)
        {
        document.getElementById("output2").innerHTML += "<h3>"+cast[m]["name"]+"</h3>"
      }
    }
    else
    {
      for(x=0;x<len;x++)
      {
      document.getElementById("output2").innerHTML += "<h3>"+cast[x]["name"]+"</h3>"
    }
     if(cast.length<1)
     {
      document.getElementById("output2").innerHTML += "<h3>No Cast Info in TMDB</h3>"
     }
    }

        }

     };
  
  xhr.send(null);

}