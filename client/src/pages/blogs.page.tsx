import { Button, ButtonGroup, ListBox, Select } from "@heroui/react";
import { orderBy } from "../utils/hook.utils";
import { blogSortBy } from "../hooks/use.blog.hook";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronLeft, ChevronRight } from "@hugeicons/core-free-icons";

export const Blogpage = () => {
  // const { data, isLoading } = useBlogsQuery();
  return (
    <main className="flex flex-col justify-start items-stretch">
      <div className="p-6 md:8 flex justify-between items-center">
        <div className="flex justify-end items-center gap-2">
          <Select defaultValue={orderBy[0]}>
            <Select.Trigger>
              <Select.Value className="capitalize" />
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
                    {item}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          <Select defaultValue={blogSortBy[0]}>
            <Select.Trigger>
              <Select.Value className="capitalize" />
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
                    {item}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <ButtonGroup variant="outline">
            <Button>
              <HugeiconsIcon icon={ChevronLeft} />
              Previous
            </Button>
            <Button>
              <ButtonGroup.Separator />
              Next
              <HugeiconsIcon icon={ChevronRight} />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </main>
  );
};

export default Blogpage;
