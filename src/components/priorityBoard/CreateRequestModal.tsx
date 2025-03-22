import { Modal, Box, Button, Header, Form, Textarea, Input, SpaceBetween, FormField } from "@cloudscape-design/components";
import { useState } from "react";

interface CreateRequestModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
}

export default function CreateRequestModal({ visible, onClose, onCreate }: CreateRequestModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    onCreate(title, description);
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      header={<Header variant="h2">Create New Request</Header>}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="s">
            <Button variant="primary" onClick={handleCreate}>
              Create
            </Button>
            <Button variant="normal" onClick={onClose}>
              Cancel
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <Form>
        <FormField label="Title">
          <Input
            value={title}
            onChange={({ detail }) => setTitle(detail.value)}
          />
        </FormField>
        <FormField label="Description">
          <Textarea
            value={description}
            onChange={({ detail }) => setDescription(detail.value)}
          />
        </FormField>
      </Form>
    </Modal>
  );
}