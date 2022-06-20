import { useQuery } from "urql";
import TodoInformationLayout from "./TodoInformationLayout";
import TodoCard from "../components/TodoCard";
import Loading from "../components/Loading";
import "../css/TodoCardsLayout.css";

const TodosQuery = `
query {
  todos {
    title
    piority
    id
    description
  }
}`;

function TodoCardsLayout() {
  const [result, reexecuteQuery] = useQuery({
    query: TodosQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loading />;
  if (error) return <p>Oh no... {error.message}</p>;

  if (data.todos.length === 0) {
    localStorage.removeItem("first_todo");
  }

  return (
    <>
      <TodoInformationLayout refresh={reexecuteQuery} />
      <div className="todoCards">
        {data.todos.map((card) => (
          <TodoCard
            title={card.title}
            description={card.description}
            piority={card.piority}
            id={card.id}
            key={card.id}
          />
        ))}
      </div>
    </>
  );
}

export default TodoCardsLayout;
