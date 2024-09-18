import { FcEmptyTrash } from "react-icons/fc";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import useSpending from "@/hooks/useSpending";

type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  dbId: string;
  onRefresh: () => void;
};

export default function DeleteDialog({
  open,
  onClose,
  dbId,
  onRefresh,
}: DeleteDialogProps) {
  const { deleteSpending } = useSpending();

  const handleDelete = async () => {
    try {
      deleteSpending(dbId);
    } catch (error) {
      alert("Error: Fail to DELETE spending!");
    } finally {
      onRefresh();
      handleClose();
    }
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: 22 }}>
        Delete Spending
      </DialogTitle>

      <DialogContent className="flex w-[300px] flex-col gap-y-4">
        <div className="flex h-16 items-center justify-center">
          <FcEmptyTrash size={36} />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <div className="grow" />
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
