"use server";
import { revalidateTag } from "next/cache";

const createUsers = async (params: { username: string; email: string }) => {
  const res = await fetch("http://localhost:8080/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: params.username,
      email: params.email,
    }),
  });
  revalidateTag("user-list");

  return res.json();
};

export default createUsers;
