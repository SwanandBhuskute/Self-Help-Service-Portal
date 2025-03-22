import { useState } from "react";
import { Container, Header, SpaceBetween, Button } from "@cloudscape-design/components";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import TaskInbox from "./TaskInbox";
import CreateRequestModal from "./CreateRequestModal";
import StatusUpdateModal from "./StatusUpdateModal";
import InboxModal from "./InboxModal";
import "./Board.css";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskRequest {
  id: string;
  requestedBy: string;
  title: string;
  description: string;
}

const initialTasks = {
  backlogs: [] as Task[],
  ready: [] as Task[],
  inProgress: [] as Task[],
  inReview: [] as Task[],
  done: [] as Task[],
};

export default function PriorityBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [inboxTasks, setInboxTasks] = useState<TaskRequest[]>([
    {
      id: "1",
      requestedBy: "Team A",
      title: "Task 1",
      description: "This is a sample task from Team A.",
    },
    {
      id: "2",
      requestedBy: "Team B",
      title: "Task 2",
      description: "This is a sample task from Team B.",
    },
  ]);
  const [isInboxVisible, setIsInboxVisible] = useState(false);
  const [isCreateRequestVisible, setIsCreateRequestVisible] = useState(false);
  const [isStatusUpdateVisible, setIsStatusUpdateVisible] = useState(false);

  const addTask = (columnId: keyof typeof tasks, title: string, description: string) => {
    setTasks({
      ...tasks,
      [columnId]: [...tasks[columnId], { id: Date.now().toString(), title, description }],
    });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const startColumn = tasks[source.droppableId as keyof typeof tasks];
    const finishColumn = tasks[destination.droppableId as keyof typeof tasks];

    const [movedTask] = startColumn.splice(source.index, 1);
    finishColumn.splice(destination.index, 0, movedTask);

    setTasks({ ...tasks });
  };

  const handleApprove = (task: TaskRequest) => {
    // Move the task to the "Ready" column
    setTasks({
      ...tasks,
      ready: [...tasks.ready, { id: task.id, title: task.title, description: task.description }],
    });

    // Remove the task from the inbox
    setInboxTasks(inboxTasks.filter((t) => t.id !== task.id));
  };

  const handleReject = (task: TaskRequest) => {
    // Remove the task from the inbox
    setInboxTasks(inboxTasks.filter((t) => t.id !== task.id));
  };

  return (
    <Container>
      <Header
        variant="h1"
        actions={
          <SpaceBetween direction="horizontal" size="s">
            <Button onClick={() => setIsInboxVisible(true)}>Inbox ({inboxTasks.length})</Button>
            <Button onClick={() => setIsCreateRequestVisible(true)}>Create New Request</Button>
            <Button onClick={() => setIsStatusUpdateVisible(true)}>Add Status Update</Button>
          </SpaceBetween>
        }
      >
        Priority Board
      </Header>

      <InboxModal
        visible={isInboxVisible}
        onClose={() => setIsInboxVisible(false)}
        tasks={inboxTasks}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <SpaceBetween size="m">
          <div className="board-container">
            {Object.entries(tasks).map(([columnId, columnTasks]) => (
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="board-column"
                  >
                    <Header variant="h3">{columnId}</Header>
                    <TaskInbox onAddTask={(title) => addTask(columnId as keyof typeof tasks, title, "")} />
                    <div className="task-list">
                      {columnTasks.map((task, index) => (
                        <TaskCard
                          key={task.id}
                          id={task.id}
                          title={task.title}
                          index={index}
                          onClick={() => {}}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </SpaceBetween>
      </DragDropContext>

      <CreateRequestModal
        visible={isCreateRequestVisible}
        onClose={() => setIsCreateRequestVisible(false)}
        onCreate={(title, description) => addTask("backlogs", title, description)}
      />

      <StatusUpdateModal
        visible={isStatusUpdateVisible}
        onClose={() => setIsStatusUpdateVisible(false)}
        onUpdate={(update) => alert(`Status Update: ${update}`)}
      />
    </Container>
  );
}