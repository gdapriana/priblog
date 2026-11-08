import { Link, Navigate, Outlet, useNavigate } from "react-router";
import { Header } from "./components/header.component";
import { buttonVariants } from "@heroui/styles";
import { HugeiconsIcon } from "@hugeicons/react";
import BloggerIcon from "@hugeicons/core-free-icons/BloggerIcon";
import StackStarIcon from "@hugeicons/core-free-icons/StackStarIcon";
import {
  Avatar,
  Button,
  Description,
  Dropdown,
  Label,
  Separator,
} from "@heroui/react";
import { useAuth } from "./context/auth.context";
import {
  Logout,
  MoreVerticalSquare01FreeIcons,
  SignIn,
  User,
} from "@hugeicons/core-free-icons";
import LogoutAlert from "./components/partials/logout.alert";
import { useState } from "react";

export const MainLayout = () => {
  const { status, user } = useAuth();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-dvh overflow-hidden grid grid-rows-[auto_minmax(0,1fr)]">
      <Header />

      <main className="min-h-0">
        <div className="container p-0 h-full">
          <div className="flex h-full min-h-0">
            <aside className="hidden md:flex flex-col gap-1 justify-start items-stretch pt-10 w-2/12 border-r border-foreground/5 overflow-y-auto">
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
              <div className="flex flex-col justify-start items-stretch gap-4 my-4">
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

              {user && status === "authenticated" && (
                <div className="flex py-4 mt-auto mb-6 justify-start items-center gap-4">
                  <Avatar>
                    <Avatar.Image
                      alt="Blue"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                    />
                    <Avatar.Fallback>B</Avatar.Fallback>
                  </Avatar>
                  <div className="flex flex-col justify-center items-start">
                    <h4 className="font-bold capitalize">{user.name}</h4>
                    <Description>{user.email}</Description>
                  </div>
                  <Dropdown>
                    <Button variant="ghost" isIconOnly aria-label="User menu">
                      <HugeiconsIcon icon={MoreVerticalSquare01FreeIcons} />
                    </Button>
                    <Dropdown.Popover>
                      <Dropdown.Menu
                        onAction={(key) => {
                          if (key === "profile") navigate("/profile");
                          if (key === "logout") setLogoutOpen(true);
                        }}
                      >
                        <Dropdown.Item id="profile" textValue="Profile">
                          <HugeiconsIcon icon={User} size={16} />
                          <Label>Profile</Label>
                        </Dropdown.Item>
                        <Separator />
                        <Dropdown.Item
                          id="logout"
                          textValue="Logout"
                          variant="danger"
                        >
                          <HugeiconsIcon
                            className="text-danger"
                            size={16}
                            icon={Logout}
                          />
                          <Label>Logout</Label>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Popover>
                  </Dropdown>

                  <LogoutAlert
                    isOpen={logoutOpen}
                    onOpenChange={setLogoutOpen}
                  />
                </div>
              )}

              {!user && status === "unauthenticated" && (
                <div className="flex justify-center items-center w-full mt-auto mb-4 p-4">
                  <Link
                    to={"/login"}
                    className={buttonVariants({
                      variant: "primary",
                      fullWidth: true,
                    })}
                  >
                    <HugeiconsIcon icon={SignIn} />
                    Sign In
                  </Link>
                </div>
              )}
            </aside>

            <div className="flex-1 min-w-0 min-h-0 overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
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
