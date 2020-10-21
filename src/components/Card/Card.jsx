import React, {useState} from 'react'
import movieBox from '../../assets/moviebox.png';
import twitter from '../../assets/twitter.png';
import spotify from '../../assets/spotify.png'
import styled from 'styled-components'
import ModalWrapper from '../ModalWrapper';
import MovieBox from '../Modal/MovieBox';
import Spotify from '../Modal/Spotify';
import Twitter from '../Modal/Twitter';

const Div = styled.div({
    position: 'relative',
    backgroundImage: `url(${twitter})`,
    height: '350px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    margin: '0 auto',
  })

const Card = () => {
    const [movieOpen, setMovieOpen] = useState(false),
          [twitterOpen, setTwitterOpen] = useState(false),
          [spotifyOpen, setSpotifyOpen] = useState(false);

    const movieClose = () => {
        setMovieOpen(false)
    }

    const handleMovieOpen = () => {
        setMovieOpen(true)
    }
    const twitterClose = () => {
        setTwitterOpen(false)
    }

    const handleTwitterOpen = () => {
        setTwitterOpen(true)
    }
    const spotifyClose = () => {
        setSpotifyOpen(false)
    }

    const handleSpotifyOpen = () => {
        setSpotifyOpen(true)
    }

    const movieBoxURL = "https://github.com/yuuki008/movie-box";
    const twitterURL = 'https://github.com/yuuki008/demo-twitter';
    const spotifyURL = 'https://github.com/yuuki008/demospotify';

    const cards = [
        {image: spotify, title:'DEMO SPOTIFY', text: 'spotify検索機能', func: handleSpotifyOpen},
        {image: twitter, title:'DEMO TWITTER', text: '投稿、メッセージ、フォロー、いいね機能', func: handleTwitterOpen},
        {image: movieBox,title: 'TMDB API', text:'検索、リスト、ジャンルフィルター機能', func: handleMovieOpen},
    ]
    return (
        <div className="works__list">
        {cards.map(card => 
        <div className="works__card" key={card.title}>
            <div
            style={{
                position: 'relative',
                backgroundImage: `url(${card.image})`,
                height: '350px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: '100%',
                margin: '0 auto',    
            }}
            onClick={() => card.func()}
            >
            <div className="card">
                <div className="card__detail">
                    <h2>{card.title}</h2>
                    <p>{card.text}</p>
                 </div>
             </div>
             </div>
        </div>
        )}
        <ModalWrapper open={movieOpen} handleClose={movieClose} title="MOVIE BOX" url={movieBoxURL} >
            <MovieBox/>
        </ModalWrapper>
        <ModalWrapper open={twitterOpen} handleClose={twitterClose} title="DEMO TWITTER" url={twitterURL}>
            <Twitter/>
        </ModalWrapper>
        <ModalWrapper open={spotifyOpen} handleClose={spotifyClose} title="DEMO SPOTIFY" url={spotifyURL}>
            <Spotify/>
        </ModalWrapper>
      </div>
    )
}

export default Card
