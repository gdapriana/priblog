import { Avatar, Button, Description, Skeleton, Tabs } from "@heroui/react";
import { useAuth } from "../context/auth.context";
import { Navigate } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cog, SignOut } from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";
import LogoutAlert from "../components/partials/logout.alert";
import { type FilterBlog, useQueryBlog } from "../hooks/use.blog.hook";
import type { Blog } from "../data/type.data";
import BlogMainCard from "../components/partials/blog.main.card";
import EmptyComponent from "../components/empty.component";
import UpdateProfileDialog from "../components/profile/update.profile.dialog";

const Profilepage = () => {
  const { user, status } = useAuth();
  const [filterBlog, setFilterBlog] = useState<FilterBlog>({
    take: 6,
  });
  const { data: blogs, isLoading: blogsLoading } = useQueryBlog({
    filter: filterBlog,
    enabled: !!user,
  });
  const [openUpdateProfileModal, setOpenUpdateProfileModal] =
    useState<boolean>(false);
  const [openLogoutAlert, setOpenLogoutAlert] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setFilterBlog((prev) => ({ ...prev, userId: user.id }));
    }
  }, [user]);
  if (status === "unauthenticated")
    return <Navigate to={"/login?page=profile"} />;
  return (
    <>
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
            <Button
              onClick={() => setOpenUpdateProfileModal(!openUpdateProfileModal)}
            >
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
            <div className="grid h-full gap-x-2 md:gap-x-4 gap-y-4 md:gap-y-6 grid-cols-2 md:grid-cols-3 relative">
              {!blogsLoading && blogs && blogs.items.length === 0 && (
                <EmptyComponent
                  name="Blog"
                  cta={{ text: "Create your first blog", url: "/create" }}
                />
              )}
              {blogs &&
                blogs.items &&
                blogs.items.map((item: Blog, idx: number) => (
                  <BlogMainCard key={idx} blog={item} />
                ))}
              {blogsLoading &&
                Array(6)
                  .fill(null)
                  .map((_, idx: number) => (
                    <div
                      key={idx}
                      className="flex gap-4 flex-col justify-start items-stretch"
                    >
                      <Skeleton className="rounded-3xl w-full aspect-16/12" />
                      <Skeleton
                        key={idx}
                        className="rounded-3xl w-full h-2/12"
                      />
                      <Skeleton
                        key={idx}
                        className="rounded-3xl w-full h-1/12"
                      />
                    </div>
                  ))}
            </div>
            <div className="flex p-6 md:p-8 pt-10 md:pt-12 justify-center items-center">
              {!blogsLoading && blogs && blogs.items.length !== 0 && (
                <Button
                  isDisabled={!blogs.hasMore}
                  onClick={() => {
                    if (blogs.hasMore) {
                      setFilterBlog((prev) => ({
                        ...prev,
                        take: prev.take && prev.take + 3,
                      }));
                    }
                  }}
                >
                  Load More
                </Button>
              )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel className="pt-4" id="analytics">
            <p>Track your metrics and analyze performance data.</p>
          </Tabs.Panel>
          <Tabs.Panel className="pt-4" id="reports">
            <p>Generate and download detailed reports.</p>
          </Tabs.Panel>
        </Tabs>
      </main>
      {status === "authenticated" && user && (
        <UpdateProfileDialog
          user={user}
          open={{
            value: openUpdateProfileModal,
            setValue: setOpenUpdateProfileModal,
          }}
        />
      )}
      <LogoutAlert isOpen={openLogoutAlert} onOpenChange={setOpenLogoutAlert} />
    </>
  );
};

export default Profilepage;
