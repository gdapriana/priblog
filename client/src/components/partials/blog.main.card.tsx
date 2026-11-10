import { Link } from "react-router";
import type { Blog } from "../../data/type.data";
import { buttonVariants, cn } from "@heroui/styles";
import { HugeiconsIcon } from "@hugeicons/react";
import { FileStackFreeIcons, ImageOff, User } from "@hugeicons/core-free-icons";
import { Button, Description, Tooltip } from "@heroui/react";

const BlogMainCard = ({ blog }: { blog: Blog }) => {
  return (
    <Link to={`/blogs/${blog.slug}`} className="flex">
      <article className="w-full h-full flex flex-col gap-4 justify-start blogs-stretch">
        <div
          className={cn(
            "aspect-16/12 flex justify-center items-center rounded-3xl overflow-hidden",
            !blog.cover && "border border-foreground/10",
          )}
        >
          {blog.cover ? (
            <img
              src={blog.cover}
              alt="cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <HugeiconsIcon icon={ImageOff} className="text-foreground/10" />
          )}
        </div>

        <div className="flex flex-col justify-start blogs-start gap-2">
          <h3 className="font-semibold line-clamp-1">{blog.title}</h3>
          <Description className="line-clamp-1 md:line-clamp-2 ">
            {blog.excerpt}
          </Description>
          <div className="flex md:mt-4 justify-start blogs-center gap-2">
            <Button size="sm">
              <HugeiconsIcon icon={User} />
              {blog.user.name.length > 5
                ? blog.user.name.substring(0, 7) + "..."
                : blog.user.name}
            </Button>
            <Link
              className={buttonVariants({
                size: "sm",
                variant: "outline",
                className: "hidden md:flex",
              })}
              to={`/categories/${blog.category.slug}`}
            >
              <HugeiconsIcon icon={FileStackFreeIcons} />
              <Tooltip delay={0}>
                {blog.category.title.length > 5
                  ? `${blog.category.title.substring(0, 5)}...`
                  : blog.category.title}
                <Tooltip.Content>{blog.category.title}</Tooltip.Content>
              </Tooltip>
            </Link>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogMainCard;
