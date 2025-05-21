import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoLoginButton = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.Kakao?.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
    }
  }, []);

  const handleLogin = () => {
    window.Kakao.Auth.login({
      scope: "profile_nickname, account_email",
      success: function (authObj) {
        // 백엔드에 accessToken 전달
        fetch("http://localhost:8080/auth/kakao", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: authObj.access_token }),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("jwt", data.token);
            // 로그인 페이지로 이동
            navigate("/");
          });
      },
      fail: function (err) {
        console.error("카카오 로그인 실패", err);
      },
    });
  };

  return (
    <button className="social-button" onClick={handleLogin}>
      카카오톡으로 로그인
    </button>
  );
};

export default KakaoLoginButton;