import { Link } from "react-router";
import type { Category } from "../../data/type.data";
import { HugeiconsIcon } from "@hugeicons/react";
import { BloggerFreeIcons, ImageOff } from "@hugeicons/core-free-icons";
import { cn } from "@heroui/styles";

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <Link to={`/blogs?categoryId=${category.id}`} className="flex">
      <article className="aspect-12/16 border border-foreground/10 overflow-hidden rounded-2xl w-full relative flex justify-center items-center">
        {category.cover ? (
          <img
            src={category.cover}
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

        {category.cover && (
          <div className="absolute bottom-0 z-2 w-full h-1/2 bg-linear-to-t from-foreground/80 to-transparent"></div>
        )}

        <div className="absolute w-full z-3 bottom-0 p-6">
          <div className="flex flex-col justify-start categorys-start gap-2">
            <h2
              className={cn(
                "font-semibold text-lg line-clamp-1",
                category.cover ? "text-accent-foreground" : "text-foreground",
              )}
            >
              {category.title}
            </h2>
            <div className="flex justify-center text-xs categorys-center gap-1">
              <HugeiconsIcon
                className={cn(
                  category.cover
                    ? "text-accent-foreground/70"
                    : "text-foreground/70",
                )}
                icon={BloggerFreeIcons}
                size={14}
              />{" "}
              <span
                className={cn(
                  category.cover
                    ? "text-accent-foreground/70"
                    : "text-foreground/70",
                )}
              >
                {category?._count?.blog} Blogs
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CategoryCard;
