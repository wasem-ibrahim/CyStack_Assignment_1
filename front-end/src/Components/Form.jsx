import { useState } from "react";
import { fetchCertificates } from "../API/api";
import CertificateList from "./CertificateList";
import LoadingScreen from "./LoadingScreen";
import { RiMoonClearLine, RiSunFill } from "react-icons/ri";

function Form() {
  const [domain, setDomain] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    fetchCertificates(domain)
      .then((data) => {
        let cleanedData = cleanData(data);
        setCertificates(cleanedData);
        setIsTableVisible(true);
        setLoading(false);
      })
      .catch((error) => {
        throw error("no data avaialble");
      });
  }

  function cleanData(data) {
    data.map((item) => {
      item.valid_from = item.valid_from.slice(0, 10);
      item.valid_to = item.valid_to.slice(0, 10);
    });

    return data;
  }

  function handleResetTable(event) {
    setCertificates([]);
    setIsTableVisible(false);
    handleSubmit(event);
  }

  function renderLoadingScreen() {
    return loading && <LoadingScreen />;
  }

  return (
    <div
      className={`${lightTheme ? "bg-white" : "bg-gray-800"} w-full  ${
        isTableVisible ? "h-full" : "h-screen"
      }`}>
      <div className=" flex items-center flex-col container mx-auto py-10 ">
        <div className="flex items-center  w-[70%]">
          <form
            onSubmit={handleResetTable}
            className="justify-between items-end w-[80%] py-4 flex mx-auto gap-4">
            <label
              htmlFor="domain"
              className={`${
                lightTheme ? "text-black" : "text-white"
              } block font-bold text-xl mb-2`}>
              Domain:
            </label>
            <input
              placeholder="Search for any domain ... "
              type="text"
              id="domain"
              name="domain"
              value={domain}
              onChange={(event) => setDomain(event.target.value)}
              className={`border rounded w-full py-2 px-3 ${
                lightTheme ? "bg-white" : "bg-gray-800 text-white"
              }`}
            />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Search
            </button>
          </form>
          <button
            className={`${
              lightTheme ? "text-black border-black" : "text-white border-white"
            } justify-self-end flex gap-2 items-center text-xl border-solid border-2 rounded-full p-2 px-4 `}
            onClick={() => setLightTheme(!lightTheme)}>
            {!lightTheme ? <RiMoonClearLine size={25} /> : <RiSunFill size={25} />}
            {!lightTheme ? "Dark" : "Light"}
          </button>
        </div>

        <div className={` ${loading ? "my-4 scale-150" : "my-0"}`}>{renderLoadingScreen()}</div>
      </div>

      {isTableVisible && <CertificateList certificates={certificates} lightTheme={lightTheme} />}
    </div>
  );
}

export default Form;
