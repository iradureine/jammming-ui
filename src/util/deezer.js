let api;
if (process.env.NODE_ENV === 'development') {
  api = 'https://jamming-api.herokuapp.com/';
} else {
  api = 'https://jamming-api.herokuapp.com/';
}

const Deezer = {
  search(term) {
    return fetch(`${api}/search?term=${term}`)
      .then((res) => {
        return res.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.data) {
          return [];
        }
        return jsonResponse.data.map((track) => ({
          id: track.id,
          name: track.title,
          artist: track.artist.name,
          album: track.album.title,
          uri: track.link,
        }));
      });
  },
  savePlaylist(playlistName, songs, token, userid) {
    return fetch(
      `${api}/playlist?userid=${userid}&name=${playlistName}&songs=${songs}&token=${token}`,
      {
        method: 'POST',
      }
    );
  },
};

export default Deezer;













// const clientId=' 31458e1bac774125bd32d7a1eaa070bb';
// const redirectUrl='http://localhost:3000'
// let accessToken;

// const Spotify ={
// getAccessToken(){
//     if(accessToken){
//         return accessToken;
//     }
//     const accessTokenMatch = window.location.href.match(/access_token([^&]*)/);
//     const expiresIn = window.location.href.match(/expires_in([^&]*)/);


//     if(accessTokenMatch && expiresIn){
//         accessToken=accessTokenMatch[1]
//         const expireIn=Number(expiresIn[1]);

//         window.setTimeout(() => accessToken = '', expiresIn * 1000);
// window.history.pushState('Access Token', null, '/');
// return accessToken
//     }
//     else{
       
//      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
//    window.location=accessUrl;
   
//     }

// },
// search(term){
//     const accessToken = Spotify.getAccessToken();
//     return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
//         headers:{
//             Authorization:`Bearer${accessToken}`
//         }

//     }).then(response =>{
//         return response.json();
//     }).then(jsonrResponse => {
//         if (!jsonrResponse.tracks){
//             return [];
//         }
//         return jsonrResponse.tracks.items.map(track =>({
//             id:track.id,
//             name:track.name,
//             artist:track.artist[0].name,
//             album:track.album.name,
//             url:track.url
//         }))
        
//     })
// },
// savePlayList(name,trackUls ){
// if(!name || trackUls.length){
//     return;

// }
// const accessToken = Spotify .getAccessToken();
// const headers = {Authorization:`Bearer${accessToken}`};

// let userId;

// return fetch('https://api.spotify.com/v1/me', {headers: headers}
// ).then(response => response.json()
// ).then(jsonResponse=>{
//     userId=jsonResponse.id;
//     return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
//         headers:headers,
//         method:'POST',
//         body: JSON.stringify({ name: name})
//     }).then(response =>response.json()
//     ).then(jsonResponse =>{
//           const playlistId= jsonResponse.id;
//           return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
//           {headers : headers,
//             method:'POST',
//             body:JSON.stringify({urls:trackUls})
        
//         }

//           )

//     })
// })
// }

// }
// export default Spotify;
