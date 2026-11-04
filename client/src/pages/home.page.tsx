import { NewBlogHome } from "../components/home/new.blog.home.component";
import { CategoryHome } from "../components/home/category.home.component";

const Homepage = () => {
  return (
    <div className="flex flex-col justify-start items-stretch gap-12">
      <NewBlogHome />
      <CategoryHome />
    </div>
  );
};

export default Homepage;
