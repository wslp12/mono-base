// import { trpc } from "../../hooks/trpc";
import { trpc } from "hooks/trpc";

function User() {
  const hello = trpc.getUserById.useQuery("1");
  const { data } = hello;
  if (!data) return <div>Loading...</div>;
  return (
    <div className="bg-red-500 p-4 pt-2 text-blue-400">
      <p>{data.name}</p>
    </div>
  );
}

export default User;
