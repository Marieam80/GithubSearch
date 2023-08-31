import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
/* import RepoUser from "./ReopUser";
import Userdetails from "./Userdetails"; */
import { useParams } from "react-router-dom";
import UserRepos from "./UserRepos";

const UserInfo = () => {
  const [userInfo, setuserInfo] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const usrlogin = useParams();
  console.log("pathnameee", pathname);
  console.log("userparams", usrlogin);
  console.log("navigateee", navigate);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`https://api.github.com/users${pathname}`);
        const data = await res.json();
        console.log("userinf", data);
        setuserInfo(() => [data]);
        console.log("userinf*******************", userInfo);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserInfo();
    console.log("Userinfo11111111", userInfo);
  }, [pathname]);

  return (
    <div className="py-5">
      <button
        className="px-5 py-1 font-medium mx-1 my-4 bg-teal-600 rounded"
        onClick={() => navigate("/")}
      >
        Zurück
      </button>

      {userInfo &&
        userInfo?.map((usr, i) => (
          <div
            key={i}
            className="flex justify-center md:flex-row md:px-0 px-4 flex-col gap-10 overflow-visible ..."
          >
            <div>
              <img
                src={usr.avatar_url}
                className="w-[350px] border-4 border-teal-400 md:mx-0 mx-auto rounded-full"
              ></img>
            </div>

            <div className="text-lg px-3 leading-10 ">
              <h1 className="text-2xl pb-4">{usr.name}</h1>
              <h1>
                <span className="text-teal-400">Login Name : {usr?.login}</span>
              </h1>
              <h1>
                <span className="text-teal-400">
                  folowers : {usr?.followers}
                </span>
              </h1>

              <h1>
                <span className="text-teal-400">
                  Repository : {usr?.public_repos}
                </span>
              </h1>

              <h1>
                <span className="text-teal-400">
                  Created at : {new Date(usr?.created_at).toDateString()}
                </span>
              </h1>

              <h1>
                <span className="text-teal-400">
                  Join : {usr?.public_repos}
                </span>
              </h1>

              <h1>
                <span className="text-teal-400">
                  <button>
                    Repositories :{<UserRepos userLogin={usrlogin.name} />}
                  </button>
                </span>
              </h1>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserInfo;
