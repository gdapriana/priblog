import { Avatar, Button, Description, Skeleton, Tabs } from "@heroui/react";
import { useAuth } from "../context/auth.context";
import { Navigate } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cog, SignOut } from "@hugeicons/core-free-icons";
import { useState } from "react";
import LogoutAlert from "../components/partials/logout.alert";
import { useQueryBlog } from "../hooks/use.blog.hook";
import type { Blog } from "../data/type.data";
import BlogMainCard from "../components/partials/blog.main.card";

const Profilepage = () => {
  const { user, status } = useAuth();
  const { data: blogs, isLoading: blogsLoading } = useQueryBlog({
    filter: {
      userId: user?.id,
      take: 6,
    },
    enabled: user !== undefined,
  });
  const [openLogoutAlert, setOpenLogoutAlert] = useState<boolean>(false);
  if (status === "unauthenticated") <Navigate to={"/login?page=profile"} />;
  return (
    <main className="flex flex-col justify-start h-full items-stretch">
      <div className="px-6 py-12 md:px-8 md:py-12 gap-4 flex justify-center items-center flex-col">
        <Avatar size="lg">
          <Avatar.Image
            alt="Blue"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
          />
          <Avatar.Fallback>
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar.Fallback>
        </Avatar>
        <div className="flex justify-center items-center flex-col">
          <h1 className="capitalize font-black text-lg">{user?.name}</h1>
          <Description>{user?.email}</Description>
        </div>

        <div className="flex justify-center items-center gap-1">
          <Button>
            <HugeiconsIcon icon={Cog} />
            Edit Profile
          </Button>
          <Button
            variant="danger"
            onPress={() => setOpenLogoutAlert(!openLogoutAlert)}
          >
            <HugeiconsIcon icon={SignOut} />
            Sign Out
          </Button>
        </div>
      </div>

      <Tabs className="w-full flex-1" variant="secondary">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options">
            <Tabs.Tab id="blog">
              Your Blogs
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab isDisabled id="analytics">
              Liked
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab isDisabled id="reports">
              Favorited
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="p-6 md:p-8 flex-1" id="blog">
          <div className="w-full h-full grid grid-cols-2 gap-4 sm:grid-cols-3 grid-rows-3 sm:grid-rows-2">
            {blogs &&
              blogs.items &&
              blogs.items.map((item: Blog, idx: number) => (
                <BlogMainCard key={idx} blog={item} />
              ))}
            {blogsLoading &&
              Array(6)
                .fill(null)
                .map((_, idx: number) => (
                  <div className="flex gap-4 flex-col justify-start items-stretch">
                    <Skeleton key={idx} className="rounded-3xl w-full h-3/5" />
                    <Skeleton key={idx} className="rounded-3xl w-full h-2/12" />
                    <Skeleton key={idx} className="rounded-3xl w-full h-1/12" />
                  </div>
                ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="analytics">
          <p>Track your metrics and analyze performance data.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="reports">
          <p>Generate and download detailed reports.</p>
        </Tabs.Panel>
      </Tabs>
      <LogoutAlert isOpen={openLogoutAlert} onOpenChange={setOpenLogoutAlert} />
    </main>
  );
};

export default Profilepage;
