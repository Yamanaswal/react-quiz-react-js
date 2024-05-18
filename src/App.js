import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";


const initialState = {
  questions: [],

  //'loading','error','ready','active','finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0
}

function reducer(state, action) {

  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      }

    case "dataFailed":
      return {
        ...state,
        status: "error"
      }

    case "start":
      return {
        ...state,
        status: "active"
      }

    case "newAnswer":

      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + 1 : state.points,
      }

    default:
      throw new Error("Unknown action");
  }
}


export default function App() {

  const [{ questions, status, index, answer }, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then(function (response) {
        response.json()
          .then(function (data) {
            console.log(data);
            dispatch({ type: "dataReceived", payload: data });
          });
      }).catch(function (err) {
        console.log(err);
        dispatch({ type: "dataFailed" });
      });
  }, []);


  const numQuestions = questions.length;

  return (<div className="app">
    <Header />

    <Main>

      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
      {status === "active" && <Question question={questions[index]} answer={answer} dispatch={dispatch} />}


      {/* <p>1/15</p>
      <p>Question?</p> */}
    </Main>
  </div>)
}