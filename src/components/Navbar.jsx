import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between text-center text-[#ffe0dc]  py-2">
        <div className="logo"><span className="font-bold text-2xl mx-9">
            TodoList
            </span></div>
      <ul className="flex gap-5 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all ">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all ">Your Task</li>
      </ul>
    </nav>
  );
};

export default Navbar;
