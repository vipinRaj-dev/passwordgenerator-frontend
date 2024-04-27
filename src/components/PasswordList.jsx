import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Copy, Eye, Trash2 } from "lucide-react";
import { base_url } from "../utils/PortDetails";
const PasswordList = (props) => {
  const [passwordList, setPasswordList] = useState([]);

  const nav = useNavigate();
  const token = Cookies.get("jwttoken");

  useEffect(() => {

    console.log('i am inside the password list component');
    if (!token) {
      nav("/signup");
    } else {
      axios
        .get(`${base_url}/user/passwordList`, {
          headers: {
            authorization: `Bearer ${Cookies.get("jwttoken")}`,
          },
        })
        .then((res) => {
          // console.log(res.data);

          const passwordsWithVisibility = res.data.passwordList.map(
            (password) => ({
              ...password,
              isVisible: false,
            })
          );
          setPasswordList(passwordsWithVisibility);
        });
    }
  }, [props.refresh]);

  const handleDelete = (id) => {
    // console.log(id);
    axios
      .delete(`${base_url}/user/deletePassword/${id}`, {
        headers: {
          authorization: `Bearer ${Cookies.get("jwttoken")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        props.setRefresh(!props.refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleVisibility = (index) => {
    setPasswordList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, isVisible: !item.isVisible } : item
      )
    );
  };

  const handleCopy = (password) => {
    navigator.clipboard.writeText(password);
  };
  return (
    <div className="p-10">
      <table className=" w-full">
        <thead>
          <tr>
            <th scope="col">Website</th>
            <th scope="col">Password</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {passwordList.map((item, index) => (
            <tr className="h-16" key={index}>
              <td>
                <div className="flex justify-center">{item.website}</div>
              </td>
              <td>
                <div className="flex justify-center gap-1">
                  {item.isVisible ? item.password : "******************"}
                  <div className="flex gap-1">
                    <Eye
                      className="cursor-pointer"
                      onClick={() => toggleVisibility(index)}
                      color="#9c9c9c"
                    />
                    <Copy
                      className="cursor-pointer"
                      onClick={() => handleCopy(item.password)}
                      color="#9c9c9c"
                    />
                  </div>
                </div>
              </td>
              <td>
                <div className="flex justify-center">
                  <Trash2
                    className="cursor-pointer"
                    onClick={() => handleDelete(item._id)}
                    size={26}
                    color="#ff0000"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PasswordList;
