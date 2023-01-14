import "./App.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./hooks/trpc";
import reactLogo from "./assets/react.svg";
import User from "./pages/User/User";

function App() {
  const userList = [{ id: 1, name: "jiman" }];
  type User<T> = T extends Array<infer R> ? R : string;
  const findUser = (user: User<typeof userList>) => user.id === 1;
  const someUser = userList.map(findUser);

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",
          // // optional
          // headers() {
          //   return {
          //     authorization: getAuthCookie(),
          //   };
          // },
        }),
      ],
    }),
  );

  const [count, setCount] = useState(0);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <div>
            <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
              <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank" rel="noreferrer">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>합계는 {count}</button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </div>
        {userList.map((userListItem, index) => (
          <div key={index}>{userListItem.name}</div>
        ))}
        <User />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
