import React, {useState, useRef} from 'react';
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';
import Nav from './components/Nav'

import './styles/app.scss';
import data from './data'

function App() {

  const audioRef = useRef(null);

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
})

const [libraryStatus, setLibraryStatus] = useState(false);

const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  setSongInfo({...songInfo, currentTime: current, duration})
}

const songEndHandler = async () => {
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id
  );
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
  if (isPlaying) audioRef.current.play();
}

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}/>
      <Player 
        audioRef={audioRef} 
        setIsPlaying={setIsPlaying} 
        isPlaying={isPlaying} 
        currentSong={currentSong} 
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library 
        audioRef={audioRef} 
        songs={songs} 
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus} />
      <audio 
        onLoadedMetadata={timeUpdateHandler} 
        onTimeUpdate={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}
        onEnded={songEndHandler} >
      </audio>
    </div>
  );
}

export default App;
