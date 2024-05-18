import { useReducer, /* useState */ } from "react";


const initalState = { count: 0, step: 1 };

function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "inc":
      return { count: state.count + state.step, ...state };
    case "dec":
      return { count: state.count - state.step, ...state };;
    case "setCount":
      return { count: action.data, ...state };
    case "setStep":
      return { step: action.data, ...state };
    case "reset":
      return initalState;

    default:
      throw new Error("Unknown action");
  }

}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  const [state, dispatch] = useReducer(reducer, initalState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: 'dec', data: 1 })
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: 'inc', data: 1 })
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({ type: 'setCount', data: Number(e.target.value) })
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({ type: 'setStep', data: Number(e.target.value) });
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: 'reset' });
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
