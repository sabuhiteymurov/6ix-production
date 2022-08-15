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
  return (
    <article
      className='music'
      onClick={() => {
        setCurrentMusic(music);
        // @ts-ignore
        audioEl.current.currentTime = 0;
        setIsPlaying(true);
        audioEl.current.play();
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
        >
          <AiFillYoutube className='music-icon icon-youtube' />
        </a>

        <a
          href={music.spotify ? music.spotify : '#'}
          aria-disabled={music.spotify ? false : true}
        >
          <FaSpotify className='music-icon icon-spotify' />
        </a>
        <a
          href={music.itunes ? music.itunes : '#'}
          aria-disabled={music.itunes ? false : true}
        >
          <AiFillApple className='music-icon icon-itunes' />
        </a>
        <a
          href={music.soundcloud ? music.soundcloud : '#'}
          aria-disabled={music.soundcloud ? false : true}
        >
          <GrSoundcloud className='music-icon icon-soundcloud' />
        </a>
      </div>
      <div className='music-duration'>{music.duration}</div>
    </article>
  );
};

export default MusicList;
