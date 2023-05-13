import { useState } from "react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";

const Authentication = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      {toggle ? (
        <SignUp setToggle={setToggle} />
      ) : (
        <Login setToggle={setToggle} />
      )}
    </div>
  );
};

export default Authentication;
