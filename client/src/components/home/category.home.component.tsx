import { buttonVariants, cn } from "@heroui/styles";
import { Link } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { BloggerFreeIcons, ImageOff } from "@hugeicons/core-free-icons";
import type { Category } from "../../data/type.data";
import { useQueryCategory } from "../../hooks/use.category.hook";
import { Skeleton } from "@heroui/react";

export const CategoryHome = () => {
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
          data.data &&
          data.data.items.map((item: Category, idx: number) => (
            <Link key={idx} to={`/categories/${item.slug}`} className="flex">
              <article className="aspect-12/16 border border-foreground/10 overflow-hidden rounded-2xl w-full relative flex justify-center items-center">
                {item.cover ? (
                  <img
                    src={item.cover}
                    alt="cover"
                    className="w-full h-full z-1 object-cover"
                  />
                ) : (
                  <HugeiconsIcon
                    icon={ImageOff}
                    size={16}
                    className="text-foreground/20"
                  />
                )}

                {item.cover && (
                  <div className="absolute bottom-0 z-2 w-full h-1/2 bg-linear-to-t from-foreground/80 to-transparent"></div>
                )}

                <div className="absolute w-full z-3 bottom-0 p-6">
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h2
                      className={cn(
                        "font-semibold text-lg line-clamp-1",
                        item.cover
                          ? "text-accent-foreground"
                          : "text-foreground",
                      )}
                    >
                      {item.title}
                    </h2>
                    <div className="flex justify-center text-xs items-center gap-1">
                      <HugeiconsIcon
                        className={cn(
                          item.cover
                            ? "text-accent-foreground/70"
                            : "text-foreground/70",
                        )}
                        icon={BloggerFreeIcons}
                        size={14}
                      />{" "}
                      <span
                        className={cn(
                          item.cover
                            ? "text-accent-foreground/70"
                            : "text-foreground/70",
                        )}
                      >
                        {item?._count?.blog} Blogs
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
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
