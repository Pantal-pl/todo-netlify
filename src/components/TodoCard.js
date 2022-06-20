import { useMutation } from "urql";

import { useRef } from "react";

import "../css/TodoCard.css";

const DeleteTodo = `
mutation MyMutation($_eq: Int) {
  delete_todos(where: {id: {_eq: $_eq}}) {
    returning {
      id
    }
  }
}
`;

function TodoCard(props) {
  const idRef = useRef();

  const [deleteTodoResult, deleteTodo] = useMutation(DeleteTodo);

  const remove = (e) => {
    console.log(deleteTodoResult);

    e.target.className += " jello-horizontal";

    const _eq = idRef.current.id;

    const variables = { _eq };

    deleteTodo(variables).then((result) => {
      if (result.error) {
        console.error("Oh no!", result.error);
      }
    });
  };

  return (
    <div className="card" id={props.id} ref={idRef}>
      <p className="title">{props.title}</p>
      <p className="description">{props.description}</p>
      <button className="deleteButton" onClick={remove}>
        Delete
      </button>
      <div
        className="piority"
        id={
          props.piority === "Low"
            ? "Low"
            : props.piority === "Medium"
            ? "Medium"
            : "High"
        }
      >
        {props.piority}
      </div>
    </div>
  );
}

export default TodoCard;
