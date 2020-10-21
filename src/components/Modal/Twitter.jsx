import React from 'react'
import Play from '../UIKit/Play'
import twitter1 from '../../assets/twitter1.mov'
import twitter2 from '../../assets/twitter2.mov'
import './Modal.css'

const Twitter = () => {
    return (
        <div className="moviebox">
            <div className="modal__section">
                ツイート　コメント　いいね
            </div>
            <Play video={twitter1} />
            <div className="modal__section">
                プロフィール編集　フォロー　ダイレクトメッセージ
            </div>
            <Play video={twitter2} />
            <div className="modal__description">
                <h2>概要</h2>
                <p>
                demo twitterを勉強の一環で作りました。
                <br/>twitterの主な機能のみ実装しました。
                <br/>コードは、githubにて公開しております。
                </p>
                <h3>主に使ったもの</h3>
                <span>react　redux　firebase(認証)　material-ui</span>
            </div>
        </div>
    )
}

export default Twitter
