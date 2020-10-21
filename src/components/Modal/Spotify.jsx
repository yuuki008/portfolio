import React from 'react'
import Play from '../UIKit/Play'
import spotify from '../../assets/spotify.mov'
import './Modal.css'

const Spotify = () => {
    return (
        <div className="spotify">
            <div className="modal__section">
                アーティスト　トラック　アルバム検索
            </div>
            <Play video={spotify} />
            <div className="modal__description">
                <h2>概要</h2>
                <p>初めて自分で実装したアプリケーションになります。
                <br/>検索機能のみの実装ですが、reduxも使って実装しました。
                <br/>コードは、githubにて公開しております。
                </p>
                <h3>主に使ったもの</h3>
                <span>react material-ui　spotify-api</span>
            </div>
        </div>
    )
}

export default Spotify
