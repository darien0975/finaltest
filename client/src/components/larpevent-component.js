import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import larpEventService from "../services/larpevent.service";

const LarpEventcomponent = ({ currentUser, setCurrentUser }) => {
  const API_URL = "http://localhost:8080/api/larpevent";
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const [larpData, setLarpData] = useState(null);

  useEffect(() => {
    let _id;

    if (currentUser && currentUser.user) {
      _id = currentUser.user._id;

      if (currentUser.user.role === "主持人") {
        larpEventService
          .get(_id)
          .then((data) => {
            setLarpData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role === "玩家") {
        larpEventService
          .getJoinedLarpEvent(_id)
          .then((data) => {
            console.log(data);
            setLarpData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [currentUser]);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能看到劇本資訊</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            返回登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "主持人" && (
        <div>
          <h1>歡迎來到{currentUser.user.name}的頁面</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === "玩家" && (
        <div>
          <h1>歡迎來到{currentUser.user.name}的頁面</h1>
        </div>
      )}
      {currentUser && larpData && larpData.length !== 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {larpData.map((larp) => {
            return (
              <div className="card" style={{ width: "21rem", margin: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">劇本名稱:{larp.name}</h5>
                  {larp.type && (
                    <p style={{ margin: "0.5rem 0rem" }}>類型:{larp.type}</p>
                  )}
                  <p style={{ margin: "0.5rem 0rem" }}>時間:{larp.time}</p>
                  <p style={{ margin: "0.5rem 0rem" }}>地點:{larp.place}</p>
                  {larp.price !== 0 && (
                    <p style={{ margin: "0.5rem 0rem" }}>費用:{larp.price}元</p>
                  )}
                  {larp.gamemaster.name && (
                    <p style={{ margin: "0.5rem 0rem" }}>
                      主持人:{larp.gamemaster.name}
                    </p>
                  )}
                  缺{" "}
                  {larp.male !== 0 && (
                    <span style={{ margin: "0.5rem 0rem" }}>
                      {larp.male - larp.maleplayer.length}男
                    </span>
                  )}
                  {larp.female != 0 && (
                    <span style={{ margin: "0.5rem 0rem" }}>
                      {larp.female - larp.femaleplayer.length}女
                    </span>
                  )}
                  <p style={{ margin: "0.5rem 0rem" }}>
                    聯絡方式(line或電話):{larp.contact}
                  </p>
                  {larp.note && (
                    <p style={{ margin: "0.5rem 0rem" }}>備註:{larp.note}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LarpEventcomponent;
