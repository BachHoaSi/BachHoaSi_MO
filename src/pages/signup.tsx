import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Button, Input, Page, Text } from "zmp-ui";
import useSetHeader from "../hooks/useSetHeader";
import { changeStatusBarColor } from "../services";
import { emailState, nameState, passwordState } from "../state"; // Import state

// Sửa đổi ở đây:
const Signup: React.FunctionComponent = () => {
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [name, setName] = useRecoilState(nameState);
  const navigate = useNavigate();
  const setHeader = useSetHeader();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      // Gọi API để đăng ký
      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          navigate("/"); // Chuyển hướng đến trang HomePage
        } else {
          // Xử lý lỗi
        }
      } catch (error) {
        // Xử lý lỗi
      }
    },
    [email, password, name]
  );

  useEffect(() => {
    setHeader({
      customTitle: "Đăng ký",
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
            Đăng ký
          </Text>
        </div>
      </div>
      <div className="bg-gray-100 h-3" />
      <div className="bg-white p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Tên người dùng"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="cus-input-search"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="cus-input-search"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="cus-input-search"
            />
          </div>
          <Button type="highlight" htmlType="submit" className="w-full">
            Đăng ký
          </Button>
        </form>
      </div>
    </Page>
  );
};

export default Signup;
