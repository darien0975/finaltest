import { useState , useEffect } from "react";
import AuthService from "../services/auth.service";


const ProfileComponent = ({currentUser , setCurrentUser}) => {

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>在獲取您的個人資料之前，您必須先登錄。</div>}
      {currentUser && (
        <div>
          <h2>以下是您的個人檔案：</h2>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>您的帳號：{currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您的暱稱: {currentUser.user.name}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您的聯絡方式(line或電話): {currentUser.user.contact}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您的身分: {currentUser.user.role}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您的性別: {currentUser.user.sex}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
