import React from "react";
import { Marginer } from "../components/marginer/index";
import {
  PageContainer,
  BoxContainer,
  Title,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  LineText,
  BoldLink,
} from "../styles/LoginPageStyles";

const LoginPage = () => {
  return (
    <PageContainer>
      <BoxContainer>
        <Title>Đăng Nhập</Title>
        <FormContainer>
          <Input type="email" placeholder="Tên đăng nhập" />
          <Input type="password" placeholder="Mật khẩu" />
        </FormContainer>
        <Marginer direction="vertical" margin={15} />
        <MutedLink href="#">Quên mật khẩu?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit">Đăng Nhập</SubmitButton>
        <Marginer direction="vertical" margin="10px" />
        <LineText>
          Bạn chưa có tài khoản?
          <BoldLink href="#"> Đăng ký ngay</BoldLink>
        </LineText>
      </BoxContainer>
    </PageContainer>
  );
};

export default LoginPage;
