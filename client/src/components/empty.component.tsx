import { buttonVariants } from "@heroui/styles";
import { Link } from "react-router";

const EmptyComponent = ({
  name = "resource",
  cta,
}: {
  name: string;
  cta?: { text: string; url: string };
}) => {
  return (
    <div className="w-full h-full bg-accent-foreground z-2 absolute top-0 left-0 flex-col flex justify-center gap-2 items-center">
      <p className="text-sm font-bold">No {name} found</p>
      {cta && (
        <Link className={buttonVariants({ variant: "primary" })} to={cta.url}>
          {cta.text}
        </Link>
      )}
    </div>
  );
};

export default EmptyComponent;
