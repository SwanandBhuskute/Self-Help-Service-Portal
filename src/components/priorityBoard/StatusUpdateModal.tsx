import { Modal, Box, Button, Header, Textarea, SpaceBetween } from "@cloudscape-design/components";
import { useState } from "react";

interface StatusUpdateModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (update: string) => void;
}

export default function StatusUpdateModal({ visible, onClose, onUpdate }: StatusUpdateModalProps) {
  const [update, setUpdate] = useState("");

  const handleUpdate = () => {
    onUpdate(update);
    setUpdate("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      header={<Header variant="h2">Add Status Update</Header>}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="s">
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="normal" onClick={onClose}>
              Cancel
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <Textarea
        value={update}
        onChange={({ detail }) => setUpdate(detail.value)}
        placeholder="Enter status update..."
      />
    </Modal>
  );
}