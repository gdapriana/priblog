import { NewBlogHome } from "../components/home/new.blog.home.component";
import { CategoryHome } from "../components/home/category.home.component";

const Homepage = () => {
  return (
    <div className="flex flex-col justify-start items-stretch gap-2">
      <NewBlogHome />
      <CategoryHome />

      <div className="p-6 md:p-8">
        <div className="w-full aspect-16/4 bg-accent rounded-3xl"></div>
      </div>
    </div>
  );
};

export default Homepage;
