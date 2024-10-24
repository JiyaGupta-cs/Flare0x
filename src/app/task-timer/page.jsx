"use client"; // Ensure this page is rendered on the client side
import React from "react";
import { TaskTimer } from "@/components/TaskTimer"; // Adjust the import path as needed

const TaskTimerPage = () => {
  return (
    <div>
      <h1 className="text-center text-2xl mt-4">Task Timer</h1>
      <TaskTimer />
    </div>
  );
};

export default TaskTimerPage;
