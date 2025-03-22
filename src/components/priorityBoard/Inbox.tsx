import { Box, Button, Header, SpaceBetween, Container } from "@cloudscape-design/components";

interface TaskRequest {
  id: string;
  requestedBy: string;
  title: string;
  description: string;
}

interface InboxProps {
  tasks: TaskRequest[];
  onApprove: (task: TaskRequest) => void;
  onReject: (task: TaskRequest) => void;
}

export default function Inbox({ tasks, onApprove, onReject }: InboxProps) {
  return (
    <Container>
      <Header variant="h2">Inbox ({tasks.length})</Header>
      <SpaceBetween size="m">
        {tasks.map((task) => (
          <Box key={task.id} padding="m" variant="div">
            <Box variant="p">
              <strong>Requested by:</strong> {task.requestedBy}
            </Box>
            <Box variant="p">
              <strong>Title:</strong> {task.title}
            </Box>
            <Box variant="p">
              <strong>Description:</strong> {task.description}
            </Box>
            <Box margin={{ top: "s" }}>
              <SpaceBetween direction="horizontal" size="s">
                <Button variant="primary" onClick={() => onApprove(task)}>
                  Approve
                </Button>
                <Button variant="normal" onClick={() => onReject(task)}>
                  Reject
                </Button>
              </SpaceBetween>
            </Box>
          </Box>
        ))}
      </SpaceBetween>
    </Container>
  );
}