import "./App.css";
import { react, useState, useEffect } from "react";
import like from "./assest/like.gif";
import love from "./assest/love.gif";
import haha from "./assest/haha.gif";
import sad from "./assest/sad.gif";
import wow from "./assest/wow2.gif";
import angry from "./assest/angry.gif";
import care from "./assest/care.png";
import scr from "./assest/scr.png";
import hpny from "./assest/hpny.mp4"
import wait from "./assest/wait.mp4"
import axios from "axios";
import { wobble } from "react-animations";
import Radium, { StyleRoot } from "radium";
import ReactPlayer from "react-player";
const styles = {
  animation:
    "1s ease 0s 1 normal none running wobble-radium-animation-79728c0b",
};

function App() {
  const [link, setLink] = useState(
    "https://www.youtube.com/watch?v=25efj4hluVQ&ab_channel=POPSMUSIC"
  );
  const [countLike, setCountLike] = useState(0);
  const [countLove, setCountLove] = useState(0);
  const [countHaha, setCountHaha] = useState(0);
  const [countSad, setCountSad] = useState(0);
  const [countWow, setCountWow] = useState(0);
  const [flag, setFlag] = useState(false);
  const [countAngry, setCountAngry] = useState(0);
  const [countSupport, setCountSupport] = useState(0);
  const [listComment, setListComment] = useState([]);
  const idPost = "2750100398588128";
  const token =
    "EAAAAZAw4FxQIBAOWZBR2PnYLQcaGB6g1ziBC5CGXnkbvmHc2O4KFWfJhG5wlbvO0wyWyXhVu1QqRMpeAWN5phR0QZB3z0N3DZCE3bueinUzBzRxZC6ZChloXX8nUwY7kxfdmBtsjKCGd054J92gln0KpFyxb4sdbIIqg0ZC1Wgq5wZDZD";

  const [time, setTime] = useState({
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  function countDown() {
    var countDownDate = new Date("Jan 1, 2021 00:00:00").getTime();
    // var countDownDate = new Date("Dec 31, 2021 00:00:00").getTime();
    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var day = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hour = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var second = Math.floor((distance % (1000 * 60)) / 1000);

      setTime({ days: day, hours: hour, minutes: minute, seconds: second });
      // Display the result in the element with id="demo"
      // If the count down is finished, write some text
      console.log(distance)
      if (Math.floor(distance/1000) == 0) {
        setFlag(true);
        setLink(hpny);
        clearInterval(x);
      }
    }, 1000);
  }

  async function getComments() {
    try {
      let result = await axios.get(
        `https://fbtoolsvn.herokuapp.com/api/v1/comments?postId=${idPost}&limit=20`
      );
      if (result.data) {
        setListComment(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getReactions() {
    try {
      let result = await axios.get(
        `https://fbtoolsvn.herokuapp.com/api/v1/reactions?postId=${idPost}`
      );
      if (result) {
        let counts = result.data.data.reduce((p, c) => {
          let type = c.type;
          if (!p.hasOwnProperty(type)) {
            p[type] = 0;
          }
          p[type]++;
          return p;
        }, {});
        setCountAngry(counts["ANGER"]);
        setCountHaha(counts["HAHA"]);
        setCountLike(counts["LIKE"]);
        setCountLove(counts["LOVE"]);
        setCountSad(counts["SORRY"]);
        setCountWow(counts["WOW"]);
        setCountSupport(counts["SUPPORT"]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // const getComment = async () => {
  //   await fetch(
  //     "https://fbtoolsvn.herokuapp.com/api/v1/comments?postId=860223191479409&limit=20"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let listData = data.data;

  //       let soSanh = listComment.length==0 ? 0 : listComment[listComment.length - 1].created_time ;
  //       // if (listComment.length == undefined || soSanh < listData[0].created_time)
  //       //   tempListData = listData.filter(i => {
  //       //     if(i.created_time>soSanh)
  //       //   })
  //       for (let i = 0; i < listData.length; i++){
  //         if (listComment.length < 15) {
  //           console.log(i + "==>"+ listComment)
  //           let avt;
  //           fetch(
  //             `https://graph.facebook.com/${listData[i].user.id}/picture?width=50&height=50&redirect=false&access_token=${token}`
  //           )
  //             .then((res) => res.json())
  //             .then((x) => {
  //               let tempListData = {
  //                 msg: listData[i].message,
  //                 avatar: x.data.url,
  //                 name: listData[i].user.name,
  //                 created_time: listData[i].created_time,
  //               };
  //               // setListComment((preState) => ({
  //               //   ...preState,
  //               //   tempListData,
  //               // }));
  //               setListComment(listComment.concat(tempListData))
  //             });

  //           console.log("done"+i)

  //         }
  //       }
  //     });
  // }

  useEffect(() => {
    countDown();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getComments();
      getReactions();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const showComment = listComment.map((i) => (
    <div className="comment__item">
      <img
        src={`https://graph.facebook.com/${i.user.id}/picture?width=50&height=50&access_token=${token}`}
        // src={`https://graph.facebook.com/${i.user.id}/picture?width=50&height=50`}
      ></img>
      <label>{i.user.name}</label>
      <p>{i.message}</p>
    </div>
  ));

  return (
    <div className="App">
      <div className="comments">
        <div className="comments__show">{showComment}</div>
      </div>
      <div className="container">
        <div className="screen">
          <div>
            {/* <div id="countdown">
              <ul>
                <li>
                  <span id="days">{time.days}</span>days
                </li>
                <li>
                  <span id="hours">{time.hours}</span>Hours
                </li>
                <li>
                  <span id="minutes">{time.minutes}</span>Minutes
                </li>
                <li>
                  <span id="seconds">{time.seconds}</span>Seconds
                </li>
              </ul>
            </div> */}
            (
            {!flag ? (
              <div className="count_down">
                <div className="scg-nyc-digits-wrapper">
                  <div className="scg-nyc-digits-type">Days</div>
                  <div className="scg-nyc-digit">
                    <span>0</span>
                    <span>0</span>
                    <span>0</span>
                  </div>
                </div>
                <div className="scg-nyc-digits-wrapper scg-nyc-sep">: </div>
                <div className="scg-nyc-digits-wrapper">
                  <div className="scg-nyc-digits-type">Hours</div>
                  <div className="scg-nyc-digit">
                    <span>0</span>
                    <span>{time.hours}</span>
                  </div>
                </div>
                <div className="scg-nyc-digits-wrapper scg-nyc-sep">: </div>
                <div className="scg-nyc-digits-wrapper">
                  <div className="scg-nyc-digits-type">Minutes</div>
                  <div className="scg-nyc-digit">
                    <span>{Math.floor(time.minutes / 10)}</span>
                    <span>{time.minutes % 10}</span>
                  </div>
                </div>
                <div className="scg-nyc-digits-wrapper scg-nyc-sep">: </div>
                <div className="scg-nyc-digits-wrapper">
                  <div className="scg-nyc-digits-type">Seconds</div>
                  <div className="scg-nyc-digit">
                    <span>{Math.floor(time.seconds / 10)}</span>
                    <span>{time.seconds % 10}</span>
                  </div>
                </div>
              </div>
            ) : (
              <h3 className="hpny">Happy New Year</h3>
            )}
          </div>
          <img src={scr} className="config_img"></img>
          <ReactPlayer
            className="bg"
            url={link}
            playing="true"
            loop="true"
            width="857px"
            height="455px"
          />
        </div>
        <div className="emoji">
          <div>
            <h3>Reactions</h3>
          </div>
          <div className="emoji__item">
            <div className="emoji__item-type">
              <img src={like} style={{ width: "100%" }} />
              <span>{countLike}</span>
            </div>
            <div className="emoji__item-type">
              <img src={love} style={{ width: "100%" }} />
              <span>{countLove}</span>
            </div>
            <div className="emoji__item-type">
              <img src={care} style={{ width: "100%" }} />
              <span>{countSupport}</span>
            </div>
            <div className="emoji__item-type">
              <img src={haha} style={{ width: "100%" }} />
              <span>{countHaha}</span>
            </div>
            <div className="emoji__item-type">
              <img src={sad} style={{ width: "100%" }} />
              <span>{countSad}</span>
            </div>
            <div className="emoji__item-type">
              <img src={wow} style={{ width: "100%" }} />
              <span>{countWow}</span>
            </div>
            <div className="emoji__item-type">
              <img src={angry} style={{ width: "100%" }} />
              <span>{countAngry}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
