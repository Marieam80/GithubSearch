import React from "react";
import Search from "./Search";
import RepoUser from "./ReopUser";
import Userdetails from "./Userdetails";
import Logo from "./Components/Logo";
import UserInfo from "./UserInfo";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <div className="container text-gray-200 py-3">
          <Logo />
          <Routes>
            <Route path="/" element={<Search />} />
            {/*  <Route path="/:id" element={<RepoUser />} /> */}
            <Route path="*" element={<NotFound />} />
            {/*   <Route path="/users/:login" element={<Userdetails />} /> */}
            <Route path="/:name" element={<UserInfo />} />
            {/*     <Route path="/:id/userdetail" element={<userdetails />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
