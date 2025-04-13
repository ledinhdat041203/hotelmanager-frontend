import "./App.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import AppRoutes from "./routes";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  // display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <AppContainer>
      <ToastContainer />
      <AppRoutes />
    </AppContainer>
  );
}

export default App;
