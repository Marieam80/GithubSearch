import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useRef } from "react";
import Loading from "./Loading";

const Search = () => {
  const [userss, setuserss] = useState([]);
  const [loading, setloading] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [users1, setUsers1] = useState([]);
  /*  const [filterd, setfilterd] = useState([]); */
  const userref = useRef("");

  console.log("search", searchTerm);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    searchUsers();
  }, [searchTerm]);

  const fetchUsers = async () => {
    if (userref.current.value === "") {
      setloading(true);
      try {
        const res = await fetch("https://api.github.com/users");

        if (res.ok) {
          const data = await res.json();
          console.log("getalldata*****", data);
          setuserss(data);
          setloading(null);
          console.log(data); // يمكنك استخدام البيانات المسترجعة هنا
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };

  async function FindUser() {
    setloading(true);
    console.log("reffffffffffffff", userref.current.value);
    if (userref.current.value !== "") {
      setuserss("");
      const res = await fetch(
        `https://api.github.com/users/${userref.current.value}`
      );
      const data = await res.json();
      console.log("dataaa", data);
      setuserss(() => [data]);
      userref.current.value = "";
      console.log("data222", userss);
    } else {
      fetchUsers();
    }
    setloading(null);
  }

  /*   const filterUsers = () => {
    console.log("before", userss);
    const filtered = userss.filter((user) =>
      user.login.toLowerCase().includes(searchTerm)
    );

    setfilterd(filtered);
    console.log(
      "after",
      filterd.map((elm) => elm.login)
    );
  }; */

  /*  const handleSearchClick = () => {
    filterUsers();
    // or searchUsers() depending on your logic
  };
 */
  const searchUsers = async () => {
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}`
      );

      if (res.ok) {
        const { items } = await res.json();
        console.log("itemsssssssssss", items);
        setUsers1(items);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error1) {
      console.error("Error fetching users:", error1);
    }
  };

  return (
    <div>
      <div className="container py-3">
        <div className="flex justify-center items-center ">
          <div className="form-control w-full max-w-xs  flex items-center ...">
            <label className="label">
              <span className="label-text">Type GitHub User?</span>
            </label>
            <div className="flex justify-center items-center h-11 my-5 ">
              <input
                type="text"
                placeholder="Search here ...⌛"
                className="input input-bordered input-info h-full max-w-xs margin-bottom:40px px-12"
                onChange={(e) => setSearchTerm(e.target.value)}
                ref={userref}
              />

              <button
                onClick={FindUser}
                className="bg-teal-500 font-semibold px-4 h-full"
                /*    onClick={filterUsers} */
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="  space-y-6 grid grid-cols-8 gap-8  place-items-center h-56 ...">
        {loading ? (
          <Loading />
        ) : (
          userss &&
          userss.map(
            (user) =>
              user?.login && (
                /*  <Link key={user.id} to={`${user.id}`}> */
                <Link to={`${user?.login}`}>
                  {" "}
                  <img
                    src={user?.avatar_url}
                    className="w-24 mb-4 border-4 border-teal-400 rounded-full"
                    alt={`${user.login} Avatar`}
                  />
                  <h1 className="text-m">{user?.login}</h1>
                  <h1 className="text-xs text-teal-400">{user?.name}</h1>
                </Link>
              )
          )
        )}
      </div>
      )
    </div>
  );
};

export default Search;
