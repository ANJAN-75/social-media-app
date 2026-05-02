import React from "react";
import "./style.scss";
import Approute from "./Approute";
import { AuthProvider } from "./features/auth/auth.contex";
import {PostProvider} from "./features/post/post.contex"
const App = () => {
  return (
    <PostProvider>
    <AuthProvider>
      <Approute />
    </AuthProvider>
    </PostProvider>
  );
};

export default App;
