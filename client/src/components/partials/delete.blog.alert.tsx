import { useAuth } from "../../context/auth.context";
import { AlertDialog, Button, toast } from "@heroui/react";
import { useDeleteBlog, useGetBlog } from "../../hooks/use.blog.hook";
import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router";

const DeleteBlogALert = ({
  open,
  blogId,
}: {
  open: { value: boolean; setValue: Dispatch<SetStateAction<boolean>> };
  blogId: string;
}) => {
  const { status, user } = useAuth();
  const { mutateAsync } = useDeleteBlog();
  const navigate = useNavigate();

  const { data: blog, isLoading: loadingGetBlog } = useGetBlog({
    by: "id",
    value: blogId,
  });

  if (status === "unauthenticated") return;
  if (status === "authenticated" && blog && blog.userId !== user.id) return;
  if (loadingGetBlog) return <div>Loading...</div>;

  return (
    <AlertDialog>
      <AlertDialog.Backdrop isOpen={open.value} onOpenChange={open.setValue}>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Blog</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>Are you sure you want to delete {blog.title}?</p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                slot="close"
                variant="danger"
                onPress={() => {
                  toast.promise(mutateAsync({ blogId }), {
                    success: () => {
                      navigate("/profile");
                      return "Delete successfully";
                    },
                    loading: "Loading...",
                    error: "Something went wrong",
                  });
                }}
              >
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteBlogALert;
