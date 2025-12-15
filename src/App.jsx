import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const toggleShowFinished = () => {
    setShowFinished((prev) => !prev);
  };

  const handelAdd = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handelChange = (e) => setTodo(e.target.value);

  const handelCheckBox = (e) => {
    let id = e.target.name;
    let newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
  };

  const handelEdit = (e, id) => {
    let t = todos.find((item) => item.id === id);
    setTodo(t.todo);
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handelDelete = (e, id) => {
    if (confirm("Are you sure you want to delete?")) {
      setTodos(todos.filter((item) => item.id !== id));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handelAdd();
    }
  };

  return (
    <>
      <div className="min-h-screen w-full">
        <Navbar />
        <div className="container mx-auto my-5 rounded-2xl p-5 text-center flex flex-col items-center min-h-[80vh]">
          <h1 className="text-6xl font-bold text-[#ffe0dc]"> What To DO? </h1>

          {/* Input & Button */}
          <div className="mt-10 mb-8 flex">
            <input
              onChange={handelChange}
              value={todo}
              type="text"
              placeholder="Add a new task"
              onKeyDown={handleKeyDown}
              className="bg-[#28292a] p-3 w-[250px] text-center rounded-l-2xl placeholder:text-[#ffe0dc] text-[#ffe0dc] border-none outline-none"
            />
            <button
              onClick={handelAdd}
              className="bg-[#ffe0dc] text-[#5b5d5f] font-bold p-3 rounded-r-2xl cursor-pointer hover:font-black transition-all"
            >
              Let's Do
            </button>
          </div>
          <div className="flex flex-row gap-3 text-[#ffe0dc]">
            <input
              onChange={toggleShowFinished}
              type="checkbox"
              checked={showFinished}
            />{" "}
            Show Finished
          </div>

          {todos.length === 0 && (
            <div className="text-[#ffe0dc]">No Todos To Display.</div>
          )}

          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todos flex flex-row m-1 justify-between md:w-1/2 max-w-2xl"
                >
                  <div className="flex flex-row gap-2 bg-[#0000004c] p-3 rounded-2xl text-[#ffe0dc] border-none m-1 text-left w-3/4">
                    <input
                      onChange={handelCheckBox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      className="mt-1"
                    />

                    <div className="flex-1 overflow-hidden">
                      <div
                        className={`${
                          item.isCompleted ? "line-through" : ""
                        } break-words whitespace-pre-wrap`}
                      >
                        {item.todo}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <button
                      className="bg-[#ffe0dc] text-[#5b5d5f] rounded-full px-4 py-1 cursor-pointer hover:font-bold transition-all"
                      onClick={(e) => handelEdit(e, item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-[#ffe0dc] text-[#5b5d5f] rounded-full px-4 py-1 cursor-pointer hover:font-bold transition-all"
                      onClick={(e) => handelDelete(e, item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
