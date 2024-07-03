import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Button, Input, Page, Text } from "zmp-ui";
import useSetHeader from "../hooks/useSetHeader";
import { changeStatusBarColor } from "../services";
import { emailState, passwordState } from "../state"; // Import state
import { getAccessToken, getPhoneNumber } from "zmp-sdk/apis";
import bcrypt from "bcryptjs";

const Signin: React.FunctionComponent = () => {
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);
  const navigate = useNavigate();
  const setHeader = useSetHeader();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      // Gọi API để đăng nhập
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          sessionStorage.setItem("token", data.token);
          navigate("/"); // Chuyển hướng đến trang HomePage
        } else {
          // Xử lý lỗi
        }
      } catch (error) {
        // Xử lý lỗi
      }
    },
    [email, password]
  );

  const handleLoginWithPhone = useCallback(async () => {
    try {
      const { token } = await new Promise((resolve, reject) => {
        getPhoneNumber({
          success: (data) => {
            resolve(data);
          },
          fail: (error) => reject(error),
        });
      });

      // Lưu access_token vào sessionStorage
      const accessToken = await new Promise((resolve, reject) => {
        getAccessToken({
          success: (data) => {
            sessionStorage.setItem("access_token", data);
            console.log("access_token:", data);
            resolve(data);
          },
          fail: (error) => reject(error),
        });
      });

      // Trích xuất số điện thoại từ token
      const phoneNumber = await fetch(`https://graph.zalo.me/v2.0/me/info`, {
        headers: {
          access_token: accessToken,
          code: token,
          secret_key: "0TR1rUOW664SjBe84Y4m",
        },
      })
        .then((response) => response.json())
        .then((data) => data.data.number);

      // Hash số điện thoại bằng bcryptjs
      const hashedPhoneNumber = await bcrypt.hash(phoneNumber, 3);
      console.log("Hashed phone number:", hashedPhoneNumber);

      navigate("/shop");

      // // Gọi API để đăng nhập bằng số điện thoại
      // const loginResponse = await fetch("/api/login-with-phone", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ phoneNumber: hashedPhoneNumber }),
      // });

      // if (loginResponse.ok) {
      //   const data = await loginResponse.json();
      //   sessionStorage.setItem("token", data.token);
      //   navigate("/"); // Chuyển hướng đến trang HomePage
      // } else {
      //   // Xử lý lỗi
      // }
    } catch (error) {
      console.log("error:", error);
    }
  }, []);

  useEffect(() => {
    setHeader({
      customTitle: "Đăng nhập",
      hasLeftIcon: false,
      type: "secondary",
    });
    changeStatusBarColor("secondary");
  }, []);

  return (
    <Page>
      <div className="bg-primary">
        <div className="p-4">
          <Text type="h2" className="text-center text-white font-bold">
            Đăng nhập
          </Text>
        </div>
      </div>
      <div className="bg-gray-100 h-3" />
      <div className="bg-white p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Email"
              value={email as string} // Specify the type of 'email' as string
              onChange={(e) => setEmail(e.target.value)}
              className="cus-input-search"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Mật khẩu"
              value={password as string} // Specify the type of 'password' as string
              onChange={(e) => setPassword(e.target.value)}
              className="cus-input-search"
            />
          </div>
          <Button
            onClick={handleSubmit}
            type="highlight"
            htmlType="submit"
            className="w-full"
          >
            {"Đăng nhập"}
          </Button>
          <div className="mt-4 text-center">
            <Button
              type="link"
              onClick={handleLoginWithPhone}
              className="text-primary"
            >
              Đăng nhập bằng số điện thoại
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
};

export default Signin;
