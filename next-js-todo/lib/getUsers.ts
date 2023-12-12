const getUsers = async () => {
  const res = await fetch("http://localhost:8080/user", {
    next: { tags: ["user-list"] },
  });
  const datas = await res.json();
  console.log(datas);
  return datas;
};

export default getUsers;
