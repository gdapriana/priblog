import { Link } from "react-router";
import type { Blog } from "../../data/type.data";
import { buttonVariants, cn } from "@heroui/styles";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FileStackFreeIcons,
  ImageOff,
  Time,
  User,
} from "@hugeicons/core-free-icons";
import { Button, Description, Skeleton } from "@heroui/react";
import moment from "moment";
import { useQueryBlog } from "../../hooks/use.blog.hook";

export const NewBlogHome = () => {
  const { data, isLoading } = useQueryBlog({
    filter: {
      take: 6,
      sortBy: "createdAt",
    },
  });
  return (
    <div
      className={cn(
        "grid w-full p-6 md:p-8 grid-cols-1 md:grid-cols-[2fr_1fr] gap-x-4 gap-y-12 md:gap-y-0 md:grid-rows-5 grid-rows-5 overflow-auto",
        isLoading && "md:gap-y-4",
      )}
    >
      {data &&
        data &&
        data.items &&
        data.items.map((item: Blog, idx: number) => (
          <Link
            to={`/blogs/${item.slug}`}
            key={idx}
            className={cn(idx === 0 && "row-span-5")}
          >
            <article>
              {idx === 0 && (
                <div className="flex gap-4 flex-col justify-start items-stretch">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-foreground/5 flex justify-center items-center">
                    {item.cover ? (
                      <img
                        src={item.cover}
                        alt="cover"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <HugeiconsIcon
                        className="text-foreground/20"
                        icon={ImageOff}
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-start gap-2 items-stretch">
                    <h3 className="text-lg font-bold line-clamp-1">
                      {item.title}
                    </h3>
                    <Description className="line-clamp-3">
                      {item.excerpt}
                    </Description>
                    <div className="flex mt-4 justify-start items-center gap-2">
                      <Button size="sm">
                        <HugeiconsIcon icon={User} />
                        {item.user.name}
                      </Button>
                      <Link
                        className={buttonVariants({
                          size: "sm",
                          variant: "outline",
                        })}
                        to={`/categories/${item.category?.slug}`}
                      >
                        <HugeiconsIcon icon={FileStackFreeIcons} />
                        {item.category?.title.length > 5
                          ? `${item.category?.title.substring(0, 5)}...`
                          : item.category?.title}
                      </Link>
                      <Button
                        variant="ghost"
                        className="ml-auto hidden md:flex text-muted text-sm font-thin"
                        size="sm"
                      >
                        <HugeiconsIcon icon={Time} />
                        Uploaded {moment(item.createdAt).fromNow()}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {idx !== 0 && (
                <Link to={`/blogs/${item.slug}`} className="flex">
                  <article
                    className={cn(
                      "flex flex-row justify-center gap-4 items-stretch py-4 border-foreground/10",
                      idx !== data.items.length - 1 && "border-b",
                    )}
                  >
                    <div className="h-full max-h-20 overflow-hidden aspect-video video bg-foreground/10 rounded-xl flex justify-center items-center">
                      {item.cover ? (
                        <img
                          src={item.cover}
                          alt="cover"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <HugeiconsIcon
                          icon={ImageOff}
                          size={16}
                          className="text-foreground/20"
                        />
                      )}
                    </div>
                    <div className="flex flex-col w-8/12 justify-center items-start">
                      <h3 className="font-semibold line-clamp-1">
                        {item.title}
                      </h3>
                      <Description className="line-clamp-2">
                        {item.excerpt}
                      </Description>
                    </div>
                  </article>
                </Link>
              )}
            </article>
          </Link>
        ))}

      {isLoading &&
        !data &&
        Array(6)
          .fill(null)
          .map((_, idx: number) => (
            <Skeleton
              className={cn(idx === 0 && "row-span-5 h-100", "rounded-2xl")}
            ></Skeleton>
          ))}
    </div>
  );
};
