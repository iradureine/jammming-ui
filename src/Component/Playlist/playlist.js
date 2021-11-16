import React from 'react';
import './Playlist.css'
import TrackList from "../TrackList/TrackList";
class Playlist extends React.Component{
  constructor (props){
    super(props);
    this.handleNameChange=this.handleNameChange.bind(this);

  }
  handleKeyPress(event) {
    if (event.key === 'Enter' && event.target.value) {
      this.props.onSave();
    }
  }

  handleNameChange(event){
this.props.onNameChange(event.target.value);
  }
    render(){
      
        return(
        <div className="Playlist">
        <input defaultValue={"New Playlist"}
         onChange={this.handleNameChange}
         onKeyPress={this.handleKeyPress}/>
          <TrackList tracks={this.props.playlistTracks}
                     onRemove={this.props.onRemove}
                     isRemoval={true}/>   
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO DEEZER</button>
      </div>

        )
    }
}
//spotify:track:6rqhFgbbKwnb9MLmUQDhG6

export default Playlist;