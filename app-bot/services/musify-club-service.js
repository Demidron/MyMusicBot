const axios = require('axios');
const cheerio = require('cheerio');



async function getTracks(trackName){
    
    if(trackName==undefined){ console.log('trackName undefined'); return;}
   

    var tracks = [];
    trackName = trackName.replace(' ', '%20');

    await axios.get('https://musify.club/search?searchText='+trackName)
    .then(response => {
        const html = cheerio.load(response.data);
        
        const playlistDivs = html('div.playlist__control');
        playlistDivs.each((i, el) => {
            let title=html(el).attr('data-title');
            tracks.push({
                title:title.length>21 ? title.slice(0, 18)+'...':title,
                url: 'https://musify.club/track/dl/'+decodeURIComponent(html(el).attr('data-url')).replace('/track/play/', '')
            });
        });
    })
    .catch(error => {
        console.log(error);
    });

    // console.log(urls);
    tracks = tracks.slice(0, 10); // обрезаем до 10 элементов
    return tracks
    
}

module.exports ={
    getTracks
}