import { Link } from "react-router";
import { Brand } from "./partials/brand";
import { buttonVariants } from "@heroui/styles";
import { HugeiconsIcon } from "@hugeicons/react";
import { Plus, Search } from "@hugeicons/core-free-icons";
import { InputGroup } from "@heroui/react";

export const Header = () => {
  return (
    <header className="border-b border-foreground/5">
      <div className="container">
        <div className="w-full relative">
          <div className="flex justify-between items-center">
            <Brand />

            <InputGroup className="absolute w-full hidden md:flex max-w-sm left-1/2 -translate-x-1/2">
              <InputGroup.Input placeholder="Search anything..." />
              <InputGroup.Suffix>
                <HugeiconsIcon size={16} icon={Search} />
              </InputGroup.Suffix>
            </InputGroup>

            <div className="flex justify-center items-center gap-2">
              <Link
                className={buttonVariants({ variant: "ghost" })}
                to={"/create"}
              >
                <HugeiconsIcon icon={Plus} />
                Create Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
