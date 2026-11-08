import NewBlogHome from "../components/home/new.blog.home.component";
import CategoryHome from "../components/home/category.home.component";
import { Avatar, AvatarGroup, Button } from "@heroui/react";
import { users } from "../data/users.dummy.data";

const Homepage = () => {
  return (
    <div className="flex flex-col justify-start items-stretch gap-2">
      <NewBlogHome />
      <CategoryHome />

      <div className="p-6 md:p-8">
        <div className="w-full overflow-hidden relative flex py-10 px-8 gap-6 justify-center items-center flex-col bg-accent rounded-3xl">
          <AvatarGroup>
            {users.slice(0, 4).map((user) => (
              <Avatar key={user.id}>
                <Avatar.Image alt={user.name} src={user.image} />
                <Avatar.Fallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar.Fallback>
              </Avatar>
            ))}
          </AvatarGroup>

          <h2 className="text-accent-foreground font-bold text-xl max-w-70 text-center">
            Create a list to easily organize and share stories
          </h2>
          <Button variant="tertiary">Start a list</Button>
          <div className="absolute border border-white -translate-x-1/2 -translate-y-1/2 w-4/5 opacity-20 aspect-square rounded-full"></div>
          <div className="absolute border border-white translate-x-1/2 translate-y-1/2 w-4/5 opacity-20 aspect-square rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
