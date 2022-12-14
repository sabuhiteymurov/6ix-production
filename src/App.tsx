import React from 'react';
import './style/main.scss';
import backgroundImage from './img/hero-background.jpg';
import { useEffect, useRef, useState } from 'react';
import { FiSkipForward } from 'react-icons/fi';
import playIcon from './img/icons-play-button.svg';
import pauseIcon from './img/icons-pause-button.svg';
import { Musics } from './Musics';
import MusicList from './MusicList';
// @ts-ignore
import uuid from 'react-uuid';

const App = React.memo(() => {
  const audioEl = useRef(null)!;
  const currentYear = new Date().getFullYear();
  const [musics, setMusics] = useState(Musics);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMusic, setCurrentMusic] = useState(Musics[0]);
  const clickRef = useRef(null)!;
  const [currentTime, setCurrentTime] = useState(0);
  const [musicDuration, setMusicDuration] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      // @ts-ignore
      audioEl.current.play();
    } else {
      // @ts-ignore
      audioEl.current.pause();
    }
  }, [isPlaying, audioEl]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const onPlaying = () => {
    // @ts-ignore
    const duration = audioEl.current.duration;
    // @ts-ignore
    const ct = audioEl.current.currentTime;
    if (duration !== musicDuration) setMusicDuration(duration);
    setCurrentTime(ct);
    setCurrentMusic({
      ...currentMusic,
      //@ts-ignore
      progress: (ct / duration) * 100 ? (ct / duration) * 100 : 0,
      length: duration,
    });
  };

  const checkWidth = (e: any) => {
    // @ts-ignore
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divProgress = (offset / width) * 100;
    // @ts-ignore
    audioEl.current.currentTime = (divProgress / 100) * currentMusic.length;
  };

  const skipBack = () => {
    const index = musics.findIndex((m) => m.title === currentMusic.title);
    if (index === 0) {
      setCurrentMusic(musics[musics.length - 1]);
    } else {
      setCurrentMusic(musics[index - 1]);
    }
    setIsPlaying(true);
    // @ts-ignore
    audioEl.current.currentTime = 0;
    // @ts-ignore
    setTimeout(() => {
      // @ts-ignore
      audioEl.current.play();
    }, 500);
  };

  const skipNext = () => {
    const index = musics.findIndex((m) => m.title === currentMusic.title);
    if (index === musics.length - 1) {
      setCurrentMusic(musics[0]);
    } else {
      setCurrentMusic(musics[index + 1]);
    }
    setIsPlaying(true);
    // @ts-ignore
    audioEl.current.currentTime = 0;

    setTimeout(() => {
      // @ts-ignore
      audioEl.current.play();
    }, 500);
  };

  const musicDurationMinutes = '0' + Math.floor(currentTime / 60) + ':';
  let musicDurationSeconds;
  if (Math.floor(currentTime % 60) < 10)
    musicDurationSeconds = '0' + Math.floor(currentTime % 60);
  else {
    musicDurationSeconds = Math.floor(currentTime % 60);
  }

  return (
    <>
      <main className='home'>
        <audio
          className='audio'
          src={currentMusic.src}
          ref={audioEl}
          onTimeUpdate={onPlaying}
        />
        <img
          className='home-background-image'
          src={backgroundImage}
          alt='background'
        />

        <h2 className='home-title'>Projects</h2>
        {/* <p className='warning'>
          If the player doesn't download any songs, please visit{' '}
          <a
            target='_blank'
            rel='noreferrer'
            href='https://www.mediafire.com/folder/rwpasprfq9fl3/6ix.netlify.app'
          >
            here
          </a>{' '}
          for projects. We apologize for the inconvenience.
        </p> */}
        <div className='home-player-container'>
          <div className='music-player-container'>
            <button
              className='music-player-container_play'
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <img className='play-icon' src={pauseIcon} alt='pause icon' />
              ) : (
                <img className='play-icon' src={playIcon} alt='play icon' />
              )}
            </button>
            <div className='music-player-container-main'>
              <p className='music-artist'>{currentMusic.artist}</p>
              <p className='music-title'>{currentMusic.title}</p>
              <div className='music-forward-backward_button'>
                <FiSkipForward className='backward' onClick={skipBack} />
                <FiSkipForward className='forward' onClick={skipNext} />
              </div>
              <div className='music-player-container_time'>
                <span className='music-player-container_currenttime'>
                  {musicDurationMinutes + musicDurationSeconds}
                </span>
                <span className='music-player-container_separator'> / </span>
                <span className='music-player-container_duration'>
                  {currentMusic.duration}
                </span>
              </div>
            </div>
            <div className='navigation'>
              <div
                className='navigation_wrapper'
                onClick={checkWidth}
                ref={clickRef}
              >
                <div
                  className='seek_bar'
                  style={{ width: `${currentMusic.progress + '%'}` }}
                ></div>
              </div>
            </div>
          </div>
          <div className='music-container'>
            {musics.map((music) => (
              <MusicList
                key={uuid()}
                music={music}
                setCurrentMusic={setCurrentMusic}
                currentMusic={currentMusic}
                audioEl={audioEl}
                setIsPlaying={setIsPlaying}
              />
            ))}
          </div>
        </div>
        <h2 className='footer-title'>
          All rights reserved ?? {currentYear} 6ix production
        </h2>
      </main>
    </>
  );
});

export default App;
