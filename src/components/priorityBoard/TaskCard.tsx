import { Container, Box } from "@cloudscape-design/components";
import { Draggable } from "@hello-pangea/dnd";
import "./TaskCard.css";

interface TaskCardProps {
  id: string;
  title: string;
  index: number;
  onClick: () => void;
}

export default function TaskCard({ id, title, index, onClick }: TaskCardProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task-card"
          onClick={onClick}
        >
          <Container>
            <Box variant="p">{title}</Box>
          </Container>
        </div>
      )}
    </Draggable>
  );
}