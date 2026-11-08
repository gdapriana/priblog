import { useAuth } from "../../context/auth.context";
import { AlertDialog, Button, toast } from "@heroui/react";

const LogoutAlert = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { logout } = useAuth();

  return (
    <AlertDialog>
      <AlertDialog.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Logout</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>Are you sure you want to log out?</p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                slot="close"
                variant="danger"
                onPress={() => {
                  toast.promise(logout(), {
                    success: "Logout successfully",
                    loading: "Loading...",
                    error: "Something went wrong",
                  });
                }}
              >
                Logout
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default LogoutAlert;
