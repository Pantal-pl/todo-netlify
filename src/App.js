import "./css/App.css";
import TodoCardsLayout from "./layout/TodoCardsLayout";

import { createClient, Provider } from "urql";

import { useState, useEffect } from "react";
import { CreateNewUser } from "./helpers/createNewUser";
import Loading from "./components/Loading";

const client = createClient({
  fetchOptions: () => {
    return {
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "",
      },
    };
  },
});

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function userCheckerWrapper() {
      if (!localStorage.getItem("user_id")) {
        const userId = await CreateNewUser(client);
        localStorage.setItem("user_id", userId);
      }
      client.fetchOptions = () => {
        return {
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret":
              "",
            "X-Hasura-Role": "user",
            "X-Hasura-User-Id": localStorage.getItem("user_id"),
          },
        };
      };
      setLoading(false);
    }
    userCheckerWrapper();
  }, []);

  if (loading) return <Loading/>;
  return (
    <Provider value={client}>
      <div className="app">
        <TodoCardsLayout />
      </div>
    </Provider>
  );
}

export default App;
