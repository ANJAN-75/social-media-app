import React from "react";
import "./style.scss";
import Approute from "./Approute";
import { AuthProvider } from "./features/auth/auth.contex";
const App = () => {
  return (
    <AuthProvider>
      <Approute />
    </AuthProvider>
  );
};

export default App;
