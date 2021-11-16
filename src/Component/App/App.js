import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/playlist';
import Deezer from '../../util/deezer';


let api;
if (process.env.NODE_ENV === 'development') {
  api = 'http://localhost:3030';
} else {
  api = 'https://jamming-api.herokuapp.com';
}
class App extends React.Component{
  constructor(props){
    super(props);

  this.state = {
      searchResults:[],
       playlistName:'My Playlist',
      playlistTracks:[]
    };


    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);

  }
  
  
  savePlaylist() {
    let tracks = this.state.playlistTracks;
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
    if (tracks.length && this.state.playlistName && token && user_id) {
      let trackIDs = tracks.map((track) => track.id);
      Deezer.savePlaylist(
        this.state.playlistName,
        trackIDs,
        token,
        user_id
      ).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: [],
        });
        document.getElementById('Playlist-name').value = this.state.playlistName;
      });
    }
  }

  search(term) {
    Deezer.search(term).then((result) => {
      this.setState({ searchResults: result });
    });
  }

  componentDidMount() {
    const newAccessToken = window.location.href.match(/token=([^&]*)/);
    if (newAccessToken) {
      localStorage.setItem('token', newAccessToken[1]);
      fetch(`${api}/profile?token=${newAccessToken[1]}`)
        .then((response) => response.json())
        .then((json) => {
          localStorage.setItem('user_id', json.id);
        });
    } else {
      let url = `${api}/auth`;
      window.location.href = url;
    }
  }

  // search(term){
  //   Spotify.search(term).then(searchResults =>{
  //     this.setState({searchResults: searchResults})
  //   })


  // }
  // savePlaylistName(){
    
  //   const trackUrls=this.state.playlistTracks.map(track => track.url)
  // Spotify.savePlayList(this.state.playlistName,trackUrls).then(()=>{
  //   this.setState({
  //     playlistName:"new Playlist",
  //     playlistTracks:[]
  //   })
  // })
  
  // }
  updatePlaylistName(name){
this.setState({playlistName:name})
  }
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (!tracks.find((trackIndex) => trackIndex.id === track.id)) {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    }
  }

  removeTrack(track){
    let tracks=this.state.playlistTracks;
    tracks = tracks.filter(currentTrack=> currentTrack.id!==track.id);
    this.setState({playlistTracks:tracks});

  }
  render(){
    return(
      <div>
         <h1>Ja<span className="highlight">mmm</span>ing</h1>
               <div className="App">
               <SearchBar onSearch={this.search}/> 
                  <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults} 
                    onAdd={this.addTrack}/>

                    < Playlist playlistName={this.state.playlistName}
                   playlistTracks={this.state.playlistTracks} 
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylistName}/> 
            
    </div>
  </div>
</div>
    )
  }
}
export default App;
