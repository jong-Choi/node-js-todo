"use client";
import createUsers from "@/lib/createUsers";
import { FormEvent, useState } from "react";

const UserCreate = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUsers({ username, email }).then((res) => {
      setUsername("");
      setEmail("");
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="이름"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">사용자 생성하기</button>
      </form>
    </div>
  );
};

export default UserCreate;
