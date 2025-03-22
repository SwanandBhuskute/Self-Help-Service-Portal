import { useState } from "react";
import { Input, Button } from "@cloudscape-design/components";
import "./TaskCard.css";

interface TaskInboxProps {
  onAddTask: (title: string) => void;
}

export default function TaskInbox({ onAddTask }: TaskInboxProps) {
  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask("");
    }
  };

  return (
    <div className="task-inbox">
      <Input
        placeholder="Add task..."
        value={newTask}
        onChange={({ detail }) => setNewTask(detail.value)}
      />
      <Button onClick={handleAdd} variant="primary">
        Add
      </Button>
    </div>
  );
}