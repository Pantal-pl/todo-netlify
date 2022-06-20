import { useRef } from "react";

import { useMutation } from "urql";

import "../css/TodoDescription.css";
import "../css/TodoPiority.css";
import "../css/TodoTitle.css";

import "../css/TodoInformationLayout.css";


const UpdateTodo = `
mutation MyMutation($user_id: uuid, $piority: String, $description: String, $title: String) {
  insert_todos_one(object: {description: $description, piority: $piority, title: $title, user_id: $user_id}) {
    description
  }
}`;

function TodoInformationLayout(props) {
  const titleRef = useRef();
  const piorityRef = useRef();
  const descriptionRef = useRef();

  function changeSelectColor() {
    piorityRef.current.value === "Low"
      ? (piorityRef.current.id = "LowSelect")
      : piorityRef.current.value === "Medium"
      ? (piorityRef.current.id = "MediumSelect")
      : (piorityRef.current.id = "HighSelect");
  }


  const [updateTodoResult, updateTodo] = useMutation(UpdateTodo);



  const submit = (e) => {
    e.preventDefault();

    console.log(updateTodoResult);

    const piority = piorityRef.current.value;
    const description = descriptionRef.current.value;
    const title = titleRef.current.value;
    const user_id = localStorage.getItem("user_id");

    const variables = { description, piority, title, user_id };
    updateTodo(variables).then((result) => {
      console.log(result);
      if (result.error) {
        console.error("Oh no!", result.error);
      }
    });

    descriptionRef.current.value = "";
    titleRef.current.value = "";

    if(!localStorage.getItem("first_todo")) {
      localStorage.setItem("first_todo",true)
        setTimeout(()=>{
          props.refresh({ requestPolicy: 'cache-and-network' })
        },1500)
    }

  };

  return (
    <form className="todoInformation" onSubmit={submit}>
      <div className="todoTitleContainer">
        <div className="todoTitle">
          <input
            className="todoTitleInput"
            placeholder="Enter title here..."
            ref={titleRef}
          ></input>
        </div>
        <button className="addButton">+</button>
      </div>
      <div className="todoPiorityContainer">
        <div className="piorityText">
          <p>Piority:</p>
        </div>
        <select onChange={changeSelectColor} ref={piorityRef}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="todoDescriptionContainer">
        <div className="descriptionText">
          <p>Description:</p>
        </div>
        <textarea
          className="descriptionInput"
          rows="2"
          placeholder="Enter description here..."
          ref={descriptionRef}
        ></textarea>
      </div>
    </form>
  );
}

export default TodoInformationLayout;
