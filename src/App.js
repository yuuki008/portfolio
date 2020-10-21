import React from 'react';
import './App.css';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import GitHubIcon from '@material-ui/icons/GitHub';
import {makeStyles} from '@material-ui/styles'
import Contact from './components/Contact/Contact';
import Card from './components/Card/Card';
import Play from './components/UIKit/Play'



const useStyles = makeStyles({
  icon: {
    height: "24px",
    width: "24px",
    top: '15px',
  }
})


function App() {
  const classes = useStyles()
  return (
    <>
    <div className="navbar">
      <div className="navbar__wrapper">
        <div className="navbar__brand">PORTFOLIO
        <a className="sns" target="_brank" href="https://twitter.com/ax0kQcEB93ntx6X">
          <TwitterIcon/>
        </a>
        <a className="sns" target="_brank" href="https://github.com/yuuki008">
          <GitHubIcon/>
        </a>
        </div>
        <div className="navbar__collapse">
          <ul className="navbar__nav ml-auto">
            <li><a href="https://qiita.com/nomu-008"target="_brank" className="qiita">qiita</a></li>
            <li><a className="active">home</a></li>
            <li><a href="#about">about</a></li>
            <li><a href="#works">works</a></li>
            <li><a href="#contact">contact</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="about" id="about">
        <div className="title">
          ABOUT
        </div>
        <div className="about__user"> 
          <h4>西南学院大学3年　能村優希</h4>
        </div>
        <div className="about__description">
          <p>広島新庄高校→西南学院大学へ
          <br/>大学3年生まで野球一筋でしたが、コロナ期間で自分を見つめ直し、フロントエンドエンジニアになろうと思い学習中です。
          <br/>自分にとって引退は、大きな決断でしたが、それが今の勉強の１番のモチベーションになっています。
          <br/><br/>言語選択として中心に勉強しているのは、javascriptです。そしてライブラリのreactを使って制作物を作っています。
          <br/>github上にていくつか制作物のコードを載せておりますのでみていただけると幸いです！
          <br/>Qiitaでも勉強のアウトプットとして記事もいくつかアップしておりますのでみていただけるとありがたいです！
          <br/><br/>最後に西南学院野球部の応援もしていただくと嬉しいです！以下が野球部のSNSのアカウントですので是非覗いてみてください！
          <br/><br/>
          <a target="_brank" className="seinan" href="https://www.youtube.com/channel/UCFMxIgcRu1mbjMg3LnvNHaw">
            <YouTubeIcon className={classes.icon}/>
          </a>
          <a target="_brank" className="seinan" href="https://www.instagram.com/seinanbaseball/?hl=ja">
            <InstagramIcon className={classes.icon}/>
          </a>
          </p>
        </div>
        <div className="about__images">
        </div>
      </div>
      <div className="works" id="works">
        <div className="title">
          WORKS
        </div> 
        <div className="works__work">
          <Card/>
        </div>
      </div>
      <div className="contact" id="contact">
        <div className="title">
          CONTACT
        </div>
        <div className="contact__post">
          <Contact/>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
