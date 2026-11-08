import {
  Button,
  Form,
  Input,
  Label,
  TextArea,
  Autocomplete,
  Typography,
  SearchField,
  SearchFieldGroup,
  Spinner,
  cn,
  ListBox,
  EmptyState,
  toast,
} from "@heroui/react";
import BloggerIcon from "@hugeicons/core-free-icons/BloggerIcon";
import LicenseDraftIcon from "@hugeicons/core-free-icons/LicenseDraftIcon";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  imagePlugin,
  InsertCodeBlock,
  InsertTable,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import {
  type FilterCategory,
  useQueryCategory,
} from "../hooks/use.category.hook";
import {
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import { type CreateBlogInput, type Category } from "../data/type.data";
import { useCreateBlog } from "../hooks/use.blog.hook";
import { useNavigate } from "react-router";

const CreateBlogpage = () => {
  const [form, setForm] = useState<CreateBlogInput>({
    title: "",
    content: ">Your blog body here...",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { mutateAsync } = useCreateBlog();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      toast.promise(mutateAsync({ body: form }), {
        error: "Something went wrong",
        loading: "Loading...",
        success: () => {
          navigate("/blogs");
          return "Blog created";
        },
      });
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="grid grid-cols-1 h-full md:grid-cols-[2fr_1fr] grid-rows-[1fr_auto] md:grid-rows-[1fr_auto]"
    >
      <div className="md:row-span-2 md:border-r border-foreground/5 overflow-auto">
        <div className="p-6 md:p-8 border-b border-foreground/5">
          <div className="w-full aspect-video bg-foreground/5 rounded-3xl"></div>
        </div>
        <div className="p-6 md:p-8 gap-2 flex flex-col justify-start items-stretch border-b border-foreground/5">
          <Input
            placeholder="Blog title..."
            fullWidth
            className="border-0 text-lg font-bold bg-transparent focus:ring-0"
            autoFocus
            required
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          <TextArea
            fullWidth
            required
            name="excerpt"
            id="excerpt"
            onChange={(val) =>
              setForm((prev) => ({ ...prev, excerpt: val.target.value }))
            }
            placeholder="Excerpt for blog..."
            className="border-0 bg-transparent text-muted h-auto focus:ring-0 rounded-md"
          ></TextArea>

          <div className="md:hidden">
            <SelectCategory form={{ value: form, setValue: setForm }} />
          </div>
        </div>

        <div className="p-6 md:p-8">
          <Typography.Prose>
            <MDXEditor
              markdown={form.content}
              onChange={(val) => setForm((prev) => ({ ...prev, content: val }))}
              contentEditableClassName="prose dark:prose-invert"
              plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                linkPlugin(),
                tablePlugin(),
                thematicBreakPlugin(),
                imagePlugin(),
                toolbarPlugin({
                  toolbarContents: () => (
                    <div className="flex gap-4 justify-start items-center flex-wrap">
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      <BlockTypeSelect />
                      <ListsToggle />
                      <InsertTable />
                      <InsertCodeBlock />
                    </div>
                  ),
                }),
                codeBlockPlugin({ defaultCodeBlockLanguage: "ts" }),
                codeMirrorPlugin({
                  codeBlockLanguages: {
                    ts: "TypeScript",
                    js: "JavaScript",
                    css: "CSS",
                    tsx: "TSX",
                    jsx: "JSX",
                    html: "HTML",
                    scss: "SCSS",
                    less: "Less",
                    vue: "Vue",
                    json: "JSON",
                    yaml: "YAML",
                    toml: "TOML",
                    xml: "XML",
                    sql: "SQL",
                    md: "Markdown",
                    dockerfile: "Dockerfile",
                    nginx: "Nginx",
                    python: "Python",
                    go: "Go",
                    rust: "Rust",
                    java: "Java",
                    kotlin: "Kotlin",
                    php: "PHP",
                    ruby: "Ruby",
                    swift: "Swift",
                    c: "C",
                    cpp: "C++",
                    csharp: "C#",
                    lua: "Lua",
                    bash: "Bash",
                    sh: "Shell",
                    powershell: "PowerShell",
                    diff: "Diff",
                    txt: "Plain Text",
                  },
                }),
              ]}
            />
          </Typography.Prose>
        </div>
      </div>
      <div className="hidden md:flex p-6 md:p-8">
        <SelectCategory form={{ value: form, setValue: setForm }} />
      </div>
      <div className="flex gap-2 flex-col p-6 md:p-8 justify-center items-center">
        <Button variant="outline" type="button" fullWidth>
          <HugeiconsIcon icon={LicenseDraftIcon} />
          Save as Draft
        </Button>
        <Button type="submit" isDisabled={loading} variant="primary" fullWidth>
          <HugeiconsIcon icon={BloggerIcon} />
          Post
        </Button>
      </div>
    </Form>
  );
};

const SelectCategory = ({
  form,
}: {
  form: {
    value: CreateBlogInput;
    setValue: Dispatch<SetStateAction<CreateBlogInput>>;
  };
}) => {
  const [categoryQuery, setCategoryQuery] = useState<FilterCategory>({
    take: 10,
  });
  const { data: categories, isLoading } = useQueryCategory({
    filter: categoryQuery,
  });

  return (
    <Autocomplete
      fullWidth
      allowsEmptyCollection
      placeholder="Search..."
      selectionMode="single"
      isDisabled={isLoading}
      isRequired
      onChange={(e) =>
        form.setValue((prev) => ({ ...prev, categoryId: e as number }))
      }
    >
      <Label>Category</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter
          inputValue={categoryQuery.search}
          onInputChange={(val) =>
            setCategoryQuery((prev) => ({ ...prev, search: val }))
          }
        >
          <SearchField
            autoFocus
            aria-label="Search characters"
            className="sticky top-0 z-10"
            name="search"
            variant="secondary"
          >
            <SearchFieldGroup>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search category" />
              <Spinner
                size="sm"
                className={cn("absolute inset-e-2 top-1/2 -translate-y-1/2", {
                  "pointer-events-none opacity-0": !isLoading,
                })}
              />
              <SearchField.ClearButton
                className={cn({
                  "pointer-events-none opacity-0": !!isLoading,
                })}
              />
            </SearchFieldGroup>
          </SearchField>
          {categories && categories.items && (
            <ListBox
              className="max-h-105 overflow-y-auto"
              items={categories.items}
              renderEmptyState={() => <EmptyState>No results found</EmptyState>}
            >
              {(item: Category) => (
                <ListBox.Item id={item.id} textValue={item.title}>
                  {item.title}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              )}
            </ListBox>
          )}
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
};

export default CreateBlogpage;
