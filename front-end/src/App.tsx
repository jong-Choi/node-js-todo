import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");

  const onClickHandler = () => {
    fetch("http://localhost:8080", { method: "GET" })
      .then((res) => {
        //fetch의 결과물을 자바스크립트 객체로 반환한다..
        return res.json();
      })
      .then((res) => {
        //반환된 객체를 res에 저장한다.
        setData(res);
      })
      .catch((e) => console.log(e));
  };

  const onGetUser = () => {
    fetch("http://localhost:8080/user", { method: "GET" })
      .then((res) => {
        //fetch의 결과물을 자바스크립트 객체로 반환한다..
        return res.json();
      })
      .then((res) => {
        //반환된 객체를 res에 저장한다.
        setData(res);
      })
      .catch((e) => console.log(e));
  };

  const onPostUser = () => {
    const newDate = new Date();

    fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `john_doe${newDate.getSeconds()}`,
        email: `john${newDate.getSeconds()}@example.com`,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      })
      .catch((e) => console.log(e));
  };

  const onUpdateUser = () => {
    const newDate = new Date();

    fetch("http://localhost:8080/user/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `john_${newDate.getSeconds()}`,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      })
      .catch((e) => console.log(e));
  };

  const onRetriveUser = () => {
    fetch("http://localhost:8080/user/1", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <button onClick={onClickHandler}>버튼</button>
      <button onClick={onGetUser}>user-get버튼</button>
      <button onClick={onPostUser}>user-post버튼</button>
      <button onClick={onUpdateUser}>user-1-patch버튼</button>
      <button onClick={onRetriveUser}>user-1-get버튼</button>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}

export default App;
