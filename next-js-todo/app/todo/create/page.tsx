import CreateForm from "@/components/create/CreateForm";
import getUsers from "@/lib/getUsers";

const UserCreate = async () => {
  const users = await getUsers();

  return (
    <div>
      <CreateForm />
      {JSON.stringify(users)}
    </div>
  );
};

export default UserCreate;
