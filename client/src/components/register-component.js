import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact , setContact] = useState("");
  const [role, setRole] = useState("");
  const [sex, setSex] = useState("");
  const [message, setMessage] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleContact = (e) =>{
    setContact(e.target.value);
  }

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const handleSex = (e) => {
    setSex(e.target.value);
  };

  const handleRegister = (e) => {
    if (password !== confirmPassword) {
      setMessage("密碼不匹配");
      return;
    }

    AuthService.register(username, name, password, contact , role, sex)
      .then(() => {
        window.alert("註冊成功，您現在被導向登入頁面");
        navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">帳號(必填):</label>
          <input
            onChange={handleUsername}
            type="text"
            className="form-control"
            name="username"
            
          />
        </div>
        <br />

        <div className="form-group">
          <label htmlFor="name">暱稱(必填)：</label>
          <input
            onChange={handleName}
            type="text"
            className="form-control"
            name="name"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼(必填)：</label>
          <input
            onChange={handlePassword}
            type="password"
            className="form-control"
            name="password"
            placeholder="長度至少超過6個英文或數字"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="confirmPassword">確認密碼(必填)：</label>
          <input
            onChange={handleConfirmPassword}
            type="password"
            className="form-control"
            name="confirmPassword"
            placeholder="再次輸入密碼"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="contact">聯絡方式(必填)：</label>
          <input
            onChange={handleContact}
            type="text"
            className="form-control"
            name="contact"
            placeholder="請輸入電話或LineID"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="role">身份(必填)：</label>
          <select onChange={handleRole} className="form-control" name="role">
            <option value="">請選擇身份</option>
            <option value="玩家">玩家</option>
            <option value="主持人">主持人</option>
          </select>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="sex">性別(必填)：</label>
          <select onChange={handleSex} className="form-control" name="sex">
            <option value="">請選擇性別</option>
            <option value="男性">男性</option>
            <option value="女性">女性</option>
          </select>
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>註冊會員</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
