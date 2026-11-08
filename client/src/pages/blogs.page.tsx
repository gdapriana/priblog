import {
  Button,
  ButtonGroup,
  buttonVariants,
  cn,
  Description,
  ListBox,
  Select,
  Skeleton,
  Tooltip,
} from "@heroui/react";
import { orderBy } from "../utils/hook.utils";
import {
  blogSortBy,
  useQueryBlog,
  type FilterBlog,
} from "../hooks/use.blog.hook";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ChevronLeft,
  ChevronRight,
  FileStackFreeIcons,
  ImageOff,
  User,
} from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";
import type { Blog } from "../data/type.data";
import { Link, useSearchParams } from "react-router";
import ArrowUpNarrowWideIcon from "@hugeicons/core-free-icons/ArrowUpNarrowWideIcon";
import ArrowDownNarrowWideIcon from "@hugeicons/core-free-icons/ArrowDownNarrowWideIcon";
import BlogMainCard from "../components/partials/blog.main.card";

const Blogspage = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId") ?? null;
  const [query, setQuery] = useState<FilterBlog>({
    take: 6,
  });
  const [cursors, setCursors] = useState<string[]>([]);
  const { data: blogs, isLoading } = useQueryBlog({ filter: query });

  useEffect(() => {
    if (categoryId) {
      if (typeof categoryId !== "string" || categoryId.trim() === "") return;
      if (!isNaN(Number(categoryId))) {
        setQuery((prev) => ({ ...prev, categoryId: Number(categoryId) }));
      }
    }
  }, [categoryId]);

  return (
    <main className="flex h-full flex-col justify-start items-stretch">
      <div className="p-6 md:8 flex justify-between items-center">
        <div className="flex justify-end items-center gap-2">
          <Tooltip delay={0}>
            <Select
              defaultValue={orderBy[0]}
              onChange={(val) =>
                setQuery((prev) => ({
                  ...prev,
                  orderBy: val as (typeof orderBy)[number],
                }))
              }
              isDisabled={isLoading}
            >
              <Select.Trigger>
                <Select.Value className="capitalize">
                  <HugeiconsIcon
                    size={16}
                    icon={
                      query.orderBy === "asc"
                        ? ArrowUpNarrowWideIcon
                        : ArrowDownNarrowWideIcon
                    }
                  />
                </Select.Value>
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {orderBy.map((item: string, idx: number) => (
                    <ListBox.Item
                      key={idx}
                      className="capitalize"
                      id={item}
                      textValue={item}
                    >
                      <HugeiconsIcon
                        size={16}
                        icon={
                          item === "asc"
                            ? ArrowUpNarrowWideIcon
                            : ArrowDownNarrowWideIcon
                        }
                      />
                      {item}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
            <Tooltip.Content>Order By</Tooltip.Content>
          </Tooltip>
          <Tooltip delay={0}>
            <Select
              defaultValue={blogSortBy[0]}
              isDisabled={isLoading}
              onChange={(val) =>
                setQuery((prev) => ({
                  ...prev,
                  sortBy: val as (typeof blogSortBy)[number],
                }))
              }
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {blogSortBy.map((item: string, idx: number) => (
                    <ListBox.Item
                      className="capitalize"
                      id={item}
                      textValue={item}
                      key={idx}
                    >
                      {item
                        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                        .replace(/^./, (c) => c.toUpperCase())}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <Tooltip.Content>Sort By</Tooltip.Content>
          </Tooltip>
        </div>
        <ButtonGroup variant="outline" isDisabled={isLoading}>
          <Tooltip delay={0}>
            <Button
              variant="outline"
              isDisabled={cursors.length === 0}
              onPress={() => {
                const last = cursors[cursors.length - 1];
                setCursors((c) => c.slice(0, -1));
                setQuery((q) => ({ ...q, cursor: last || undefined }));
              }}
            >
              <HugeiconsIcon icon={ChevronLeft} />
            </Button>
            <Tooltip.Content>Previous Page</Tooltip.Content>
          </Tooltip>
          <ButtonGroup.Separator />

          <Tooltip delay={0}>
            <Button
              variant="outline"
              isDisabled={isLoading || !blogs?.hasMore}
              onPress={() => {
                setCursors((prev) => [...prev, query.cursor ?? ""]);
                setQuery((prev) => ({
                  ...prev,
                  cursor: blogs?.nextCursor ?? undefined,
                }));
              }}
            >
              <HugeiconsIcon icon={ChevronRight} />
            </Button>
            <Tooltip.Content>Next Page</Tooltip.Content>
          </Tooltip>
        </ButtonGroup>
      </div>
      <div className="flex-1 p-6 md:p-8 pt-0 md:pt-0 gap-4 grid grid-cols-2 sm:grid-cols-3 grid-rows-3 sm:grid-rows-2">
        {!isLoading &&
          blogs &&
          blogs &&
          blogs.items &&
          blogs.items.map((item: Blog, idx: number) => (
            <BlogMainCard key={idx} blog={item} />
          ))}

        {isLoading &&
          Array(6)
            .fill(null)
            .map((_, idx: number) => (
              <div className="flex gap-4 flex-col justify-start items-stretch">
                <Skeleton key={idx} className="rounded-3xl w-full h-3/5" />
                <Skeleton key={idx} className="rounded-3xl w-full h-2/12" />
                <Skeleton key={idx} className="rounded-3xl w-full h-1/12" />
              </div>
            ))}
      </div>
    </main>
  );
};

export default Blogspage;
