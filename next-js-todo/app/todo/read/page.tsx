import getUsers from "@/lib/getUsers";

const UserRead = async () => {
  const data = await getUsers();
  return <div>{JSON.stringify(data)}</div>;
};

export default UserRead;
