import React, { useEffect } from 'react'
import './home.css';
function Home() {

    let token = null; 
    
    const fetchAPI = () =>{
    
        $('.search').click(function() {
    
            $('.places').empty();

 

            // Directly call places service

            fetch('https://beta.familysearch.org/service/standards/place/ws/places/request?pagesize=25&text='+encodeURI($('.name').val())+'~')

            .then(function(rsp) { return rsp.json() })

            .then(function(obj) {

                for (let i = 0; i < obj.searchResults[0].result.length; i++) {

                    // console.log(obj.searchResults[0].result[i]);

                    $('.places').append('<li class="place" data-id="'+obj.searchResults[0].result[i].rep.id+'">'+obj.searchResults[0].result[i].rep.fullDisplay.name+'</li>');

                }

            });

        });
    }

        // Place clicked
    
        $(document).on('click', '.place' ,function() {
    
            let id = $(this).attr("data-id");

 

            // Get children places

            fetch('https://beta.familysearch.org/service/standards/place/ws/places/reps/'+id+'?children=true', {

                method: "GET",

                headers: { 'Accept': 'application/json' }

            })

            .then(function(rsp) { return rsp.json() })

            .then(function(obj) {

                $('.places').empty();

                if (obj.rep.children.length == 0) $('.places').append('<li>No Children</li>');

 

                for (let i = 0; i < obj.rep.children.length; i++) {

                    console.log(obj.rep.children[i]);

                    $('.places').append('<li class="place" data-id="'+obj.rep.children[i].id+'">'+obj.rep.children[i].display.name+'</li>');

                }

            });

 

        });

            // Detect enter key
    
            $(document).on('keypress',function(e) { if (e.which == 13) $('.search').click() });

    useEffect(()=>{
   fetchAPI()
    },[])

  return (
    <div>

<div style={{width:"500px", margin:"auto"}}>

<input class="name" placeholder="Place-Name"></input>

<button class="search">Search</button>
<ul class="places"></ul>
</div>


    </div>
  )
}

export default Home