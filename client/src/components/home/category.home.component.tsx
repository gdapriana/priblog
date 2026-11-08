import { buttonVariants } from "@heroui/styles";
import { Link } from "react-router";
import type { Category } from "../../data/type.data";
import { useQueryCategory } from "../../hooks/use.category.hook";
import { Skeleton } from "@heroui/react";
import CategoryCard from "../partials/category.card";

const CategoryHome = () => {
  const { data, isLoading } = useQueryCategory({
    filter: { take: 4 },
  });
  return (
    <div className="flex flex-col justify-start items-stretch gap-8 p-6 md:p-8">
      {data && (
        <header className="flex justify-between items-center gap-4">
          <h2 className="text-lg font-bold">Top Pick by Category</h2>
          <Link
            className={buttonVariants({ variant: "outline" })}
            to={"/categories"}
          >
            All Categories
          </Link>
        </header>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4">
        {!isLoading &&
          data &&
          data &&
          data.items.map((item: Category, idx: number) => (
            <CategoryCard category={item} key={idx} />
          ))}

        {!data &&
          isLoading &&
          Array(4)
            .fill(null)
            .map((_, idx: number) => (
              <Skeleton
                key={idx}
                className="aspect-12/16 rounded-2xl"
              ></Skeleton>
            ))}
      </div>
    </div>
  );
};

export default CategoryHome;
