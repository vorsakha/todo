import React, { useState, useEffect, Fragment } from "react";

const Todo = () => {
  const [todo, setTodo] = useState(null);
  const [loadedTodo, setLoadedTodo] = useState(null);
  const [text, setText] = useState("");
  const [d, setDate] = useState("");
  const [edit, setEdit] = useState(false);
  const [textEdit, setTextEdit] = useState("");
  const [dateEdit, setDateEdit] = useState("");
  const [completeEdit, setCompleteEdit] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTodo({
      date: new Date().toLocaleString(),
      text: text,
      complete: false,
    });

    setDate(new Date().toLocaleString());
  };

  const loadData = () => {
    const newArr = [];
    Object.entries(localStorage).forEach(([key, value]) => {
      newArr.unshift({
        id: key,
        todo: JSON.parse(value),
      });
    });
    setLoadedTodo(newArr);
  };

  // EDIT complete
  const handleChecked = (e) => {
    const nuText = e.target.value;
    const date = e.target.name;
    const complete = e.target.className === "true" ? false : true;

    setTodo({
      date: date,
      text: nuText,
      complete: complete,
    });

    setDate(date);

    loadData();
  };

  const saveData = () => {
    d !== "" && localStorage.setItem(d, JSON.stringify(todo));
  };

  // EDIT edit
  const handleSubmitEdit = (e) => {
    e.preventDefault();

    setEdit(false);
  };

  const handleEdit = () => {};

  const handleDelete = (name) => {
    localStorage.removeItem(name);

    loadData();
  };

  useEffect(() => {
    setTodo({
      date: dateEdit,
      text: textEdit,
      complete: completeEdit,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textEdit]);

  useEffect(() => {
    todo !== null && saveData();
    todo !== null && loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo]);

  useEffect(() => {
    if (dateEdit !== "") {
      if (edit) {
        document.getElementById(dateEdit).style.display = "block";
      } else {
        document.getElementById(dateEdit).style.display = "none";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1>todos</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="What needs to be done"
          value={text}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Save</button>
      </form>
      <ul>
        {loadedTodo !== null &&
          loadedTodo.map((data) => (
            <li
              className={data.todo.complete.toString()}
              name={data.todo.date}
              key={data.id}
              style={{
                textDecoration: `${
                  data.todo.complete ? "line-through" : "none"
                }`,
              }}
            >
              {!edit && (
                <input
                  type="checkbox"
                  className={data.todo.complete.toString()}
                  name={data.todo.date}
                  value={data.todo.text}
                  checked={data.todo.complete}
                  onChange={(e) => handleChecked(e)}
                />
              )}

              <form
                id={data.todo.date}
                style={{ display: "none" }}
                onSubmit={(e) => handleSubmitEdit(e)}
              >
                <input
                  type="text"
                  name={data.todo.date}
                  className={data.todo.complete.toString()}
                  value={textEdit}
                  onChange={(e) => {
                    setTextEdit(e.target.value);

                    handleEdit(e);
                  }}
                />
                <button type="submit">Save</button>
              </form>

              {!edit && (
                <Fragment>
                  {" "}
                  <label
                    htmlFor={data.todo.date}
                    onDoubleClick={() => {
                      if (!data.todo.complete) {
                        setDateEdit(data.todo.date);
                        setCompleteEdit(
                          data.todo.complete === "true" ? true : false
                        );
                        setTextEdit(data.todo.text);
                        setEdit(true);
                      }
                    }}
                  >
                    {data.todo.text}
                  </label>
                  <span>
                    {" "}
                    <button
                      type="button"
                      onClick={() => handleDelete(data.todo.date)}
                    >
                      X
                    </button>
                  </span>
                </Fragment>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todo;
