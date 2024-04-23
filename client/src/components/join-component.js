import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import larpEventService from "../services/larpevent.service";

const JoinComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    larpEventService
      .getLarpByName(searchInput)
      .then((data) => {
        console.log(data.data);
        setSearchResult(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleJoin = (e) => {
    console.log(e.target);
    larpEventService
      .join(e.target.id)
      .then(() => {
        window.alert("報名成功");
        navigate("/larpevent");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能參加劇本團</p>
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
          <h1>只有玩家才能參加劇本團</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === "玩家" && (
        <div className="search input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={handleChangeInput}
          />
          <button onClick={handleSearch} className="btn btn-primary">
            搜尋劇本
          </button>
        </div>
      )}

      {currentUser && searchResult && searchResult.length != 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {searchResult.map((larp) => {
            return (
              <div
                key={larp._id}
                className="card"
                style={{ width: "21rem", margin: "1rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">劇本名稱:{larp.name}</h5>
                  {larp.type && (
                    <p style={{ margin: "0.5rem 0rem" }}>類型:{larp.type}</p>
                  )}
                  <p style={{ margin: "0.5rem 0rem" }}>時間:{larp.time}</p>
                  <p style={{ margin: "0.5rem 0rem" }}>地點:{larp.place}</p>
                  {larp.price != 0 && (
                    <p style={{ margin: "0.5rem 0rem" }}>費用:{larp.price}元</p>
                  )}
                  {larp.gamemaster.name && (
                    <p style={{ margin: "0.5rem 0rem" }}>
                      主持人:{larp.gamemaster.name}
                    </p>
                  )}
                  缺{" "}
                  {larp.male != 0 && (
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
                  <a
                    href="#"
                    id={larp._id}
                    className="card-text btn btn-primary"
                    onClick={handleJoin}
                  >
                    參加
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JoinComponent;
