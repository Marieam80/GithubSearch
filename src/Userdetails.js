import React from "react";

import { useState, useEffect } from "react";

const Userdetails = ({ usrId, userlogin }) => {
  const [repousr, setrepousr] = useState([]);

  useEffect(() => {
    const fetchUserrepo = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${userlogin}/repos`
        );
        const reposdata = await res.json();
        setrepousr(reposdata);
        console.log("11111111111111111hallo", reposdata);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserrepo();
  }, [userlogin]);

  return (
    <div>
      {console.log("idddddddchild componnn", usrId)}
      <table class="table-fixed">
        <thead>
          <tr>
            <th>Name</th>
            <th>FullName</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {console.log(repousr.map((ee) => ee))}
          {repousr &&
            repousr.map((elm) => (
              <div className="flex grapx-5">
                <tr key={elm.id}>
                  <td className="text-sm font-semibold}>forks">
                    {" "}
                    forks :{elm.forks}
                  </td>
                  <td className="text-sm font-semibold}>forks">
                    stars : {elm.stargazers_count}
                  </td>
                  <td className="text-sm font-semibold}>forks">
                    {elm.description}
                  </td>
                </tr>
              </div>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userdetails;
