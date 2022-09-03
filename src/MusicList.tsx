import { useReducer } from 'react';
import { AiFillYoutube, AiFillApple } from 'react-icons/ai';
import { FaSpotify } from 'react-icons/fa';
import { GrSoundcloud } from 'react-icons/gr';

const MusicList: React.FC<{
  music: any;
  setCurrentMusic: any;
  audioEl: any;
  setIsPlaying: any;
  isPlaying: any;
}> = ({ music, setCurrentMusic, audioEl, setIsPlaying, isPlaying }) => {
  const initialState = {
    showYoutubeModal: false,
    showSpotifyModal: false,
    showItunesModal: false,
    showSoundCloudModal: false,
  };

  const reducer: (state: any, action: any) => any = (state, action) => {
    let newState;

    switch (action.type) {
      case 'showYoutubeModal':
        newState = { ...state, showYoutubeModal: true };
        break;
      case 'showSpotifyModal':
        newState = { ...state, showSpotifyModal: true };
        break;
      case 'showItunesModal':
        newState = { ...state, showItunesModal: true };
        break;
      case 'showSoundCloudModal':
        newState = { ...state, showSoundCloudModal: true };
        break;
      case 'closeYoutubeModal':
        newState = { ...state, showYoutubeModal: false };
        break;
      case 'closeSpotifyModal':
        newState = { ...state, showSpotifyModal: false };
        break;
      case 'closeItunesModal':
        newState = { ...state, showItunesModal: false };
        break;
      case 'closeSoundCloudModal':
        newState = { ...state, showSoundCloudModal: false };
        break;
    }
    return newState;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <article
      className='music'
      onClick={() => {
        setCurrentMusic(music);
        // @ts-ignore
        setIsPlaying(true);
        audioEl.current.currentTime = 0;
        setTimeout(() => {
          // @ts-ignore
          audioEl.current.play();
        }, 1000);
      }}
    >
      <div className='music-title-container'>
        <div className='music-title'>{music.title}</div>
        <div className='music-artist'>{music.artist}</div>
      </div>
      <div className='music-icon-container'>
        <a
          href={music.youtube ? music.youtube : '#'}
          aria-disabled={music.youtube ? false : true}
          onMouseOver={() => {
            if (music.youtube) return;
            dispatch({ type: 'showYoutubeModal' });
          }}
          onMouseLeave={() => dispatch({ type: 'closeYoutubeModal' })}
        >
          <AiFillYoutube className='music-icon icon-youtube' />
          {state.showYoutubeModal && (
            <span className='not-available-modal'>Not available</span>
          )}
        </a>

        <a
          href={music.spotify ? music.spotify : '#'}
          aria-disabled={music.spotify ? false : true}
          onMouseOver={() => {
            if (music.spotify) return;
            dispatch({ type: 'showSpotifyModal' });
          }}
          onMouseLeave={() => dispatch({ type: 'closeSpotifyModal' })}
        >
          <FaSpotify className='music-icon icon-spotify' />
          {state.showSpotifyModal && (
            <span className='not-available-modal'>Not available</span>
          )}
        </a>
        <a
          href={music.itunes ? music.itunes : '#'}
          aria-disabled={music.itunes ? false : true}
          onMouseOver={() => {
            if (music.itunes) return;
            dispatch({ type: 'showItunesModal' });
          }}
          onMouseLeave={() => dispatch({ type: 'closeItunesModal' })}
        >
          <AiFillApple className='music-icon icon-itunes' />
          {state.showItunesModal && (
            <span className='not-available-modal'>Not available</span>
          )}
        </a>
        <a
          href={music.soundcloud ? music.soundcloud : '#'}
          aria-disabled={music.soundcloud ? false : true}
          onMouseOver={() => {
            if (music.soundcloud) return;
            dispatch({ type: 'showSoundCloudModal' });
          }}
          onMouseLeave={() => dispatch({ type: 'closeSoundCloudModal' })}
        >
          <GrSoundcloud className='music-icon icon-soundcloud' />
          {state.showSoundCloudModal && (
            <span className='not-available-modal'>Not available</span>
          )}
        </a>
      </div>
      <div className='music-duration'>{music.duration}</div>
    </article>
  );
};

export default MusicList;
