import styled from "styled-components";

export const AuthWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

export const AuthTitle = styled.h1`
  font-size: 38px;
  font-weight: 600;
  opacity: 0.6;
  color: #3978ff;
`;

export const AuthLoginTitle = styled.h1`
  font-size: 26px;
  color: #3978ff;
  padding-top: 20px;
`;

export const AuthSignUpTitle = styled.h1`
  font-size: 26px;
  color: #3978ff;
  padding-top: 20px;
`;

export const AuthForm = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const AuthInput = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  &[type="submit"] {
    cursor: pointer;
    background-color: #3978ff;
    color: white;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const AuthError = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const AuthSwitcher = styled.span`
  margin-top: 20px;
  a {
    color: #3978ff;
  }
`;
