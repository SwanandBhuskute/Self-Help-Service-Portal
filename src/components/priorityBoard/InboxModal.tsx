import { Modal, Box, Button, Header, SpaceBetween } from "@cloudscape-design/components";

interface TaskRequest {
  id: string;
  requestedBy: string;
  title: string;
  description: string;
}

interface InboxModalProps {
  visible: boolean;
  onClose: () => void;
  tasks: TaskRequest[];
  onApprove: (task: TaskRequest) => void;
  onReject: (task: TaskRequest) => void;
}

export default function InboxModal({ visible, onClose, tasks, onApprove, onReject }: InboxModalProps) {
  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      header={<Header variant="h2">Inbox ({tasks.length})</Header>}
      footer={
        <Box float="right">
          <Button onClick={onClose}>Close</Button>
        </Box>
      }
    >
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
    </Modal>
  );
}