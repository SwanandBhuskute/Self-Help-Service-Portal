import { Modal, Box, Button, Header, SpaceBetween } from "@cloudscape-design/components";

interface TaskDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  task: { title: string; description: string };
  onApprove: () => void;
  onReject: () => void;
}

export default function TaskDetailsModal({ visible, onClose, task, onApprove, onReject }: TaskDetailsModalProps) {
  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      header={<Header variant="h2">Task Details</Header>}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="s">
            <Button variant="primary" onClick={onApprove}>
              Approve
            </Button>
            <Button variant="normal" onClick={onReject}>
              Reject
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <Box variant="p">
        <strong>Title:</strong> {task.title}
      </Box>
      <Box variant="p">
        <strong>Description:</strong> {task.description}
      </Box>
    </Modal>
  );
}