import { useState, useRef, useEffect } from "react";
import "./styles.css";
import { Timer } from "./components/Timer";
import { StopWatch } from "./components/StopWatch";

export default function App() {
  const [second, setSecond] = useState(0);
  const [miliSecond, setMiliSecond] = useState(0);
  const [state, setState] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const timerMiliRef = useRef();
  const [show, setShow] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    if (state === true) {
      if (miliSecond % 60 === 0 && second >= 1) {
        setSecond((prev) => prev - 1);
      } else if (miliSecond === 0) {
        clearInterval(timerMiliRef.current);
      }
    } else {
      if (miliSecond === 60) {
        setSecond((prev) => prev + 1);
        setMiliSecond(0);
      }
    }
  }, [miliSecond]);

  const handleClick = (e) => {
    if (state === true) {
      setShow(true);
      if (!isRunning && miliSecond !== 0) {
        inputRef.current.value = "";
        const id = setInterval(() => {
          setMiliSecond(function (prev) {
            return prev - 1;
          });
        }, 100);
        timerMiliRef.current = id;
        setIsRunning(true);
      } else {
        clearInterval(timerMiliRef.current);
        setIsRunning(false);
      }
    } else {
      if (!isRunning) {
        const id = setInterval(() => {
          setMiliSecond(function (prev) {
            return prev + 1;
          });
        }, 100);
        timerMiliRef.current = id;
        setIsRunning(true);
      } else {
        clearInterval(timerMiliRef.current);
        setIsRunning(false);
      }
    }
  };

  const handleReset = () => {
    clearInterval(timerMiliRef.current);
    setSecond(0);
    setMiliSecond(0);
    setIsRunning(false);
  };

  const handleOnChange = (e) => {
    setSecond(Number(e.target.value));
    setMiliSecond(Number(e.target.value) * 60);
  };
  return (
    <div className="App">
      <div>
        <button
          onClick={() => {
            setState(true);
          }}
        >
          Timer
        </button>
        <button
          onClick={() => {
            setState(false);
          }}
        >
          Stop Watch
        </button>
      </div>
      {state ? (
        <>
          <input
            ref={inputRef}
            type="text"
            onChange={handleOnChange}
            placeholder="Enter Seconds"
          />
          <Timer second={second} miliSecond={miliSecond % 60} show={show} />
        </>
      ) : (
        <StopWatch second={second} miliSecond={miliSecond} />
      )}
      <div>
        <button onClick={handleClick}>{!isRunning ? "Start" : "Pause"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
