import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Userdetails from "./Userdetails";

const RepoUser = () => {
  const { id } = useParams();
  /*  const { login } = useParams(); */
  const [user, setuser] = useState([]);

  useEffect(() => {
    const fetchUserbyId = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${id}`);
        const userdata = await res.json();
        console.log("11111111111111111", userdata);
        setuser(userdata);
        console.log("22222222222", user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserbyId();
  }, []);

  return (
    <div>
      <Userdetails usrId={user.id} userlogin={user.login} />
      {/*   <h1>{id}</h1> */}
    </div>
  );
};

export default RepoUser;
