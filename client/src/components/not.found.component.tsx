import { buttonVariants } from "@heroui/styles";
import { Link } from "react-router";

const NotFoundComponent = () => {
  return (
    <div className="w-full h-full bg-accent-foreground z-2 absolute top-0 left-0 flex-col flex justify-center gap-2 items-center">
      <p>No resource found</p>
      <Link className={buttonVariants({ variant: "primary" })} to={"/"}>
        Back home
      </Link>
    </div>
  );
};

export default NotFoundComponent;
