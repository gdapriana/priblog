import {
  Avatar,
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  toast,
} from "@heroui/react";
import {
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import { type UpdateUserInput, type AuthUser } from "../../data/type.data";
import { useUpdateUser } from "../../hooks/use.user.hook";

const UpdateProfileDialog = ({
  open,
  user,
}: {
  open: { value: boolean; setValue: Dispatch<SetStateAction<boolean>> };
  user: AuthUser;
}) => {
  const { mutateAsync, isPending } = useUpdateUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<UpdateUserInput>({
    name: "",
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      toast.promise(mutateAsync({ body: form }), {
        error: "Error",
        success: () => {
          open.setValue(false);
          return "Profile updated";
        },
        loading: "Loading...",
      });
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Modal.Backdrop isOpen={open.value} onOpenChange={open.setValue}>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Avatar size="lg">
                  <Avatar.Image
                    alt="Blue"
                    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                  />
                  <Avatar.Fallback>
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>
              </Modal.Icon>
              <Modal.Heading>Update profile</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted"></p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  onSubmit={onSubmit}
                  id="updateProfileForm"
                  className="flex flex-col gap-4"
                >
                  <TextField
                    className="w-full"
                    name="name"
                    type="text"
                    variant="secondary"
                    isRequired
                  >
                    <Label>Name</Label>
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Enter your name"
                    />
                  </TextField>
                  <TextField
                    className="w-full"
                    name="email"
                    type="email"
                    isDisabled
                    variant="secondary"
                  >
                    <Label>Email</Label>
                    <Input value={user.email} placeholder="Enter your email" />
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button
                isDisabled={isPending || loading}
                slot="close"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                isDisabled={isPending || loading}
                form="updateProfileForm"
                type="submit"
              >
                Update
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default UpdateProfileDialog;
