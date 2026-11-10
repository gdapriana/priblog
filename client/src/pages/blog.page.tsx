import { Link, useParams } from "react-router";
import { useGetBlog, useQueryBlog } from "../hooks/use.blog.hook";
import { buttonVariants, cn } from "@heroui/styles";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cog,
  Email,
  FileStackFreeIcons,
  ImageOff,
  Time,
  Trash,
  User,
} from "@hugeicons/core-free-icons";
import { Button, Description, Skeleton, Typography } from "@heroui/react";
import moment from "moment";
import {
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  imagePlugin,
  linkPlugin,
  listsPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import type { Blog } from "../data/type.data";
import { useAuth } from "../context/auth.context";
import NotFoundComponent from "../components/not.found.component";
import { useState } from "react";
import DeleteBlogALert from "../components/partials/delete.blog.alert";

const BlogPage = () => {
  const { slug } = useParams();
  const { data: blog, isLoading } = useGetBlog({
    by: "slug",
    value: slug ?? "",
  });
  const { status, user } = useAuth();
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);

  const { data: relatedBlogs, isLoading: loadingRelatedBlogs } = useQueryBlog({
    filter: {
      take: 5,
      categoryId: blog && blog.category && blog.category.id,
    },
    enabled: blog !== undefined,
  });

  return (
    <>
      <main className="flex h-full relative flex-col justify-start items-stretch">
        {!isLoading && !blog && <NotFoundComponent />}
        <div className="w-full grid grid-cols-1 grid-rows-1 md:grid-cols-[2fr_1fr] h-full">
          {!isLoading && blog && (
            <div className="h-full w-full overflow-auto">
              <div className="flex flex-col justify-start items-stretch">
                <div className="p-6 md:p-8 flex flex-col justify-start items-stretch gap-4">
                  <div className="flex w-full aspect-video bg-foreground/5  justify-center items-center rounded-3xl">
                    {blog?.cover ? (
                      <img src={blog?.cover ?? ""} alt="cover" />
                    ) : (
                      <HugeiconsIcon
                        icon={ImageOff}
                        size={24}
                        className="text-foreground/10"
                      />
                    )}
                  </div>
                  <h1 className="font-bold text-xl">{blog.title}</h1>
                  <Description className="text-sm">{blog.excerpt}</Description>
                </div>
                <div className="flex flex-col justify-start items-stretch gap-4">
                  <div className="p-6 md:p-8 flex gap-2 justify-center items-center border-y border-foreground/5">
                    <Button size="sm">
                      <HugeiconsIcon icon={User} />
                      {blog.user?.name}
                    </Button>
                    <Link
                      className={buttonVariants({
                        size: "sm",
                        variant: "outline",
                      })}
                      to={`/categories/${blog.category?.slug}`}
                    >
                      <HugeiconsIcon icon={FileStackFreeIcons} />
                      {blog.category?.title.length > 5
                        ? `${blog.category?.title.substring(0, 5)}...`
                        : blog.category?.title}
                    </Link>

                    {user &&
                      status === "authenticated" &&
                      user.id === blog.userId && (
                        <Link
                          to={`/blogs/${blog.id}/edit`}
                          className={buttonVariants({
                            isIconOnly: true,
                            variant: "outline",
                            size: "sm",
                          })}
                        >
                          <HugeiconsIcon icon={Cog} />
                        </Link>
                      )}

                    {status === "authenticated" &&
                      user &&
                      user.id === blog.userId && (
                        <Button
                          onPress={() => setOpenDeleteAlert(!openDeleteAlert)}
                          type="button"
                          isIconOnly
                          size="sm"
                        >
                          <HugeiconsIcon icon={Trash} />
                        </Button>
                      )}

                    <Button
                      variant="ghost"
                      className="ml-auto text-muted text-sm font-thin"
                      size="sm"
                    >
                      <HugeiconsIcon icon={Time} />
                      {moment(blog.createdAt).fromNow()}
                    </Button>
                  </div>
                </div>

                <div className="p-6 md:p-8 font-sans">
                  {blog.content ? (
                    <Typography.Prose>
                      <MDXEditor
                        markdown={blog.content}
                        readOnly
                        contentEditableClassName="prose dark:prose-invert"
                        plugins={[
                          headingsPlugin(),
                          listsPlugin(),
                          quotePlugin(),
                          linkPlugin(),
                          tablePlugin(),
                          thematicBreakPlugin(),
                          imagePlugin(),
                          codeBlockPlugin({ defaultCodeBlockLanguage: "ts" }),
                          codeMirrorPlugin({
                            codeBlockLanguages: {
                              ts: "TypeScript",
                              js: "JavaScript",
                              css: "CSS",
                            },
                          }),
                        ]}
                      />
                    </Typography.Prose>
                  ) : (
                    <div className="flex text-muted w-full py-10 justify-center items-center">
                      No content
                    </div>
                  )}
                </div>

                <div className="md:hidden flex p-6 md:p-8 flex-col justify-start items-stretch gap-2">
                  <h2 className="font-bold text-lg">Related Blog</h2>
                  <div className="flex justify-start flex-col items-stretch gap-2">
                    {!loadingRelatedBlogs &&
                      relatedBlogs &&
                      relatedBlogs &&
                      relatedBlogs.items &&
                      relatedBlogs.items.map((item: Blog, idx: number) => (
                        <Link
                          to={`/blogs/${item.slug}`}
                          key={idx}
                          className="flex"
                        >
                          <article
                            className={cn(
                              "flex flex-row justify-center gap-4 items-stretch py-4 border-foreground/10",
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
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col justify-start items-stretch">
              <div className="p-6 md:p-8 flex flex-col justify-start items-stretch gap-4">
                <Skeleton className="aspect-video rounded-3xl"></Skeleton>
                <Skeleton className="aspect-16/2 rounded-3xl"></Skeleton>
                <Skeleton className="aspect-16/2 rounded-3xl"></Skeleton>
                <Skeleton className="aspect-square full rounded-3xl"></Skeleton>
              </div>
            </div>
          )}

          <div className="hidden md:flex flex-col border-foreground/5 border-l justify-start items-stretch">
            <div className="flex p-6 md:p-8 flex-col justify-start items-stretch gap-2">
              <h2 className="font-bold text-lg">Related Blog</h2>
              <div className="flex justify-start flex-col items-stretch gap-2">
                {!loadingRelatedBlogs &&
                  relatedBlogs &&
                  relatedBlogs &&
                  relatedBlogs.items &&
                  relatedBlogs.items.map((item: Blog, idx: number) => (
                    <Link to={`/blogs/${item.slug}`} key={idx} className="flex">
                      <article
                        className={cn(
                          "flex flex-row justify-center gap-4 items-stretch py-4 border-foreground/10",
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
                  ))}

                {loadingRelatedBlogs &&
                  Array(5)
                    .fill(null)
                    .map((_, idx: number) => (
                      <Skeleton
                        key={idx}
                        className="aspect-16/4 rounded-2xl"
                      ></Skeleton>
                    ))}
              </div>
            </div>

            {!isLoading && blog ? (
              <div className="px-8 pb-20 flex justify-center items-center flex-1">
                <div className="w-full h-full flex-col gap-2 bg-accent rounded-3xl relative overflow-hidden flex p-6 md:p-8 justify-center items-center">
                  <h2 className="text-center text-accent-foreground font-bold text-lg">
                    Get {blog?.user?.name}'s stories in your inbox
                  </h2>
                  <Description className="text-center text-accent-foreground/60">
                    Join for free to get updates from this writer.
                  </Description>
                  <Button variant="secondary" className="mt-4">
                    <HugeiconsIcon icon={Email} />
                    Subsribe
                  </Button>
                  <div className="absolute border border-white -translate-x-1/2 -translate-y-1/2 w-4/5 opacity-20 aspect-square rounded-full"></div>
                  <div className="absolute border border-white translate-x-1/2 translate-y-1/2 w-4/5 opacity-20 aspect-square rounded-full"></div>
                </div>
              </div>
            ) : (
              <div className="px-8 pb-20 flex justify-center items-center flex-1">
                <Skeleton className="w-full h-full rounded-3xl relative overflow-hidden"></Skeleton>
              </div>
            )}
          </div>
        </div>
      </main>
      {blog && (
        <DeleteBlogALert
          blogId={blog?.id.toString()}
          open={{ value: openDeleteAlert, setValue: setOpenDeleteAlert }}
        />
      )}
    </>
  );
};

export default BlogPage;
