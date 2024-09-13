import styled, { createGlobalStyle } from 'styled-components';
import backgroundImage from './assets/bg.jpg';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'CustomFont', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: url(${backgroundImage.src}) #1E1E1E;
    background-size: cover;
    background-position: center;
    color: white;
  }
`;

export const Container = styled.div`

  height: 97vh;
  width: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export const Section = styled.div`
  flex: 1;
  margin: 0 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  background-color: #323232;
  display: grid;
  justify-content: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  color: white;
  text-align: center;
`;

export const ArrowsContainer = styled.div`
  margin: 0 20px;
  position: relative;
  text-align: center;
`;

export const Arrow = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const InfoContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InfoText = styled.p`
  text-align: center;
  margin: 5px 0;
`;

export const Loader = styled.div`
  position: absolute;
  top: -45px;
  transform: translateX(-50%);
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface LoadingProps {
  isLoading: boolean;
}

export const Input = styled.input<LoadingProps>`
  height: 30px;
  margin-top: 15px;
  text-align: center;
  opacity: ${(props) => (props.isLoading ? 0.5 : 1)};
`;

export const StakeButton = styled.button<LoadingProps>`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: #8b8bcd;
  opacity: ${(props) => (props.isLoading ? 0.5 : 1)};
`;

export const UnstakeButton = styled.button<LoadingProps>`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: #c85da9;
  opacity: ${(props) => (props.isLoading ? 0.5 : 1)};
`;

export const SuccessMessage = styled.p`
  color: green;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 255, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
`;
