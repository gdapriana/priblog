import { Link, Navigate, Outlet } from "react-router";
import { Header } from "./components/header.component";
import { buttonVariants } from "@heroui/styles";
import { HugeiconsIcon } from "@hugeicons/react";
import BloggerIcon from "@hugeicons/core-free-icons/BloggerIcon";
import StackStarIcon from "@hugeicons/core-free-icons/StackStarIcon";
import { Button } from "@heroui/react";
import { useAuth } from "./context/auth.context";

export const MainLayout = () => {
  return (
    <main className="h-dvh flex flex-col justify-start items-stretch">
      <Header />

      <main className="flex-1 h-full">
        <div className="container p-0 h-full">
          <div className="flex h-full">
            <div className="hidden md:flex flex-col gap-1 justify-start items-stretch pt-10 w-2/12 border-r border-foreground/5">
              <div className="flex flex-col justify-start items-stretch w-full pr-2">
                <Link
                  className={buttonVariants({
                    fullWidth: true,
                    variant: "ghost",
                    className: "justify-between hover:bg-foreground/5",
                  })}
                  to="/blogs"
                >
                  Explore Blogs <HugeiconsIcon icon={BloggerIcon} />
                </Link>
                <Link
                  className={buttonVariants({
                    fullWidth: true,
                    variant: "ghost",
                    className: "justify-between hover:bg-foreground/5",
                  })}
                  to="/categories"
                >
                  Categories <HugeiconsIcon icon={StackStarIcon} />
                </Link>
              </div>
              <div className="w-full my-4 h-px bg-foreground/10"></div>
              <div className="flex flex-wrap gap-2 pr-2">
                {[
                  "Lorem ipsum",
                  "dolor",
                  "sit",
                  "amet",
                  "consectetur",
                  "adipisicing",
                  "elit",
                ].map((item: string, key: number) => (
                  <Button
                    size="sm"
                    className="text-sm"
                    variant="outline"
                    key={key}
                  >
                    #{item}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-x-scroll">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </main>
  );
};

export const AuthLayout = () => {
  const { status } = useAuth();

  if (status === "loading") return <div>loading...</div>;
  if (status === "authenticated") {
    return <Navigate to="/" />;
  }
  return (
    <main className="h-dvh flex justify-center items-center">
      <Outlet />
    </main>
  );
};
