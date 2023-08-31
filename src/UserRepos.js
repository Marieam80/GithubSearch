import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UserRepos = ({ userLogin }) => {
  const [repousr, setrepousr] = useState([]);
  /* const repopath = useParams();
  const { pathname1 } = useLocation();
  console.log("pathhhhhhhhj123555555", pathname1);
 */
  useEffect(() => {
    const fetchUserrepo = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${userLogin}/repos`
        );
        const reposdata = await res.json();
        console.log("REPODATA§§§§§§§§§", reposdata);
        setrepousr(reposdata);
        console.log("11111111111111111hallo", reposdata);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserrepo();
  }, [userLogin]);

  return (
    <>
      {repousr &&
        repousr?.map((elm) => (
          <div className="bg-gray-900 p-3 leading-8">
            <a
              href={elm.html_url}
              className="text-teal-100 break-word font-semibold  hover:underline font-weight: bold"
            >
              Link :{elm.full_name}
            </a>
            <div className="flex gap-x-5">
              <h1 className="text-sm font-semibold"> forks :{elm.forks}</h1>

              <h1 className="text-sm font-semibold">
                stars : {elm.stargazers_count}
              </h1>

              <h1 className="text-sm font-semibold">
                {" "}
                Language : {"🟡" + elm.language}
              </h1>
              {/*  <h1 className="text-sm font-semibold">
                Descp : {elm.description}
              </h1> */}
            </div>
          </div>
        ))}
    </>
  );
};
export default UserRepos;
