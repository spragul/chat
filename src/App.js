import { Route } from "react-router-dom";
import "./App.css";
import { AddChatNumber } from "./components/Chat/AddChatNumber";
import Chatsapp from "./components/Chat/Chatpage/chatpage";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import Frstpage from "./pages/firstpage";
import { Forgot } from "./pages/forgotpass";
import { Reset } from "./pages/resetpassword";

export const url = "https://chatapp-jarv.onrender.com";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Frstpage />
      </Route>
      <Route exact path="/dashboard">
        <Chatsapp />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/forgotpassword">
        <Forgot />
      </Route>
      <Route path="/resetpassword/:id/:token">
        <Reset />
      </Route>
      <Route path="/addnumber">
        <AddChatNumber />
      </Route>
      <Route path="/ragul">
        <Chatsapp />
      </Route>
    </div>
  );
}

export default App;
