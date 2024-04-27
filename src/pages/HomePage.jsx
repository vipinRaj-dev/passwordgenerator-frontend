import "../styles.css";
import { useState } from "react";
import usePasswordGenerator from "../hooks/use-password-generator";
import PasswordStrengthIndicator from "../components/StrengthChecker";
import Checkbox from "../components/Checkbox";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";
import PasswordList from "../components/PasswordList";
import { useNavigate } from "react-router-dom";
import { base_url } from "../utils/PortDetails";

const HomePage = () => {
  const [refresh, setRefresh] = useState(false);

  const nav = useNavigate();

  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  const setWebsite = () => {
    Swal.fire({
      title: "Add a website",
      input: "text",
      inputPlaceholder: "Enter the website name",
      showCancelButton: true,
      confirmButtonText: "Add",
    }).then((result) => {
      if (result.isConfirmed) {
        let website = result.value;

        // console.log(website, password);
        const headers = {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("jwttoken")}`,
        };

        axios
          .post(
            `${base_url}/user/addWebsite`,
            {
              website,
              password,
            },
            {
              headers: headers,
            }
          )
          .then((res) => {
            // console.log(res);
            setRefresh(!refresh);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const logOut = () => {
    Cookies.remove("jwttoken");
    nav("/signup");
  };
  return (
    <div>
      <div className="bg-slate-200 h-16 flex items-center justify-around">
        <h1 className="text-3xl font-bold">Password Generator</h1>
        <button
          className="bg-slate-300 p-3 rounded-xl"
          onClick={() => logOut()}
        >
          Logout
        </button>
      </div>
      <div className="flex justify-center p-5">
        <div className="font-sans bg-gray-600 p-6 w-5/6 rounded-2xl">
          {password && (
            <div className="text-white flex justify-between text-lg font-bold pb-5">
              <div className="text-2xl tracking-wider space-x-6">
                <span> {password}</span>

                <button
                  className="p-2 rounded bg-slate-400 text-white font-bold cursor-pointer h-7 text-xs"
                  onClick={handleCopy}
                >
                  {copied ? "Copied" : "copy"}
                </button>
              </div>
              <button
                className="p-2 rounded bg-slate-400 text-white font-bold cursor-pointer"
                onClick={() => setWebsite()}
              >
                Add website
              </button>
            </div>
          )}
          <div className="text-white text-lg font-bold pb-6 flex flex-col">
            <span className="w-full flex justify-between pb-6">
              <label>Character Length</label>
              <label>{length}</label>
            </span>
            <input
              type="range"
              min="4"
              max="20"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 text-lg font-bold text-white">
            {checkboxData.map((checkbox, index) => {
              return (
                <div className="flex pb-6" key={index}>
                  <Checkbox
                    title={checkbox.title}
                    onChange={() => handleCheckboxChange(index)}
                    state={checkbox.state}
                  />
                </div>
              );
            })}
          </div>
          <PasswordStrengthIndicator password={password} />
          {errorMessage && (
            <div className="text-red-500 pb-1">{errorMessage}</div>
          )}
          <button
            className="w-full text-lg p-5 rounded bg-slate-400 text-white font-bold cursor-pointer"
            onClick={() => generatePassword(checkboxData, length)}
          >
            Generate Password
          </button>
        </div>
      </div>
      <div>
        <PasswordList refresh={refresh} setRefresh={setRefresh} />
      </div>
    </div>
  );
};

export default HomePage;
