import React from 'react'
import Play from '../UIKit/Play'
import movieVideo1 from '../../assets/moviebox.mov'
import movieVideo2 from '../../assets/moviebox2.mov'
import './Modal.css'

const MovieBox = () => {
    return (
        <div className="moviebox">
            <div className="modal__section">
                ジャンルフィルター　検索機能　ページ移動
            </div>
            <Play video={movieVideo1} />
            <div className="modal__section">
                お気に入り　リスト追加　公開通知
            </div>
            <Play video={movieVideo2} />
            <div className="modal__description">
                <h2>概要</h2>
                <p>
                typescriptを初めて使ってみましたが、まだまだ学習中なので至らない点もあるかと思いますので、
                <br/>暖かくみていただけると幸いです。
                <br/>コードは、githubにて公開しております
                <br/>youtubeでの予告、キャスト、関連映画、俳優の概要なども見れるようになっています！！               
                </p>
                <h3>主に使ったもの</h3>
                <span>react　redux material-ui　firebase(認証)　TMDB api</span>
            </div>
        </div>
    )
}

export default MovieBox
