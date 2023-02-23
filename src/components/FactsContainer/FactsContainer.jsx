import { useEffect, useState } from "react";
import "../../scss/FactsContainer.scss";

const FactsContainer = () => {
  const [fact, setFact] = useState("");

  useEffect(() => {
    // fetch("https://api.api-ninjas.com/v1/facts?limit=1", {
    //   method: "GET",
    //   headers: { "X-Api-Key": process.env.REACT_APP_APIKEY },
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => setFact(data[0].fact))
    //   .catch((error) => console.log(error));
  }, []);

  return (
    <footer>
      <div>
        <h2>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-bell-ringing"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#00abfb"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
            <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" />
            <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727" />
          </svg>{" "}
          Want to read a fun fact?
        </h2>
        <p>{fact == "" ? "Loading fact..." : fact}</p>
      </div>
    </footer>
  );
};
export default FactsContainer;
