import {
  Button,
  buttonVariants,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { passwordValidation } from "../../utils/validation.utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft,
  Eye,
  EyeClosedFreeIcons,
  Login,
} from "@hugeicons/core-free-icons";
import { Link, useNavigate } from "react-router";
import type { LoginInput } from "../../data/type.data";
import { useAuth } from "../../context/auth.context";
import { ApiError } from "../../utils/api.utils";

type FieldErrors = Partial<Record<keyof LoginInput, string>>;

const LoginAuthPage = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [form, setForm] = useState<LoginInput>({ email: "", password: " " });
  const { login } = useAuth();

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);

    toast.promise(login(form), {
      error: (e) => {
        const map: FieldErrors = {};
        setLoading(false);
        if (e instanceof Error && e.message) {
          return e.message;
        }
        if (e instanceof ApiError && e.errors) {
          for (const issue of e.errors) {
            map[issue.path as keyof LoginInput] = issue.message;
          }
          setFieldErrors(map);
          return e.errors[0].message;
        }
        return "Something went wrong";
      },
      loading: "Loading...",
      success: () => {
        navigate("/");
        return "Success login";
      },
    });
  };

  return (
    <Form onSubmit={onSubmit} className="w-full max-w-96 px-4">
      {error && <p className="text-sm">{error}</p>}
      <Fieldset>
        <Fieldset.Legend className="font-medium text-center text-neutral-800 dark:text-neutral-100">
          Login
        </Fieldset.Legend>
        <Description className="text-neutral-600 text-center dark:text-neutral-400">
          No account yet?{" "}
          <Link className="underline" to={"/register"}>
            Register
          </Link>
        </Description>
        <Fieldset.Group>
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input
              placeholder="johndoe@example"
              onChange={onChange}
              variant="primary"
            />
            {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
          </TextField>

          <TextField
            isRequired
            name="password"
            type={hidePassword ? "password" : "text"}
            validate={passwordValidation}
          >
            <Label>Password</Label>
            <InputGroup fullWidth>
              <InputGroup.Input onChange={onChange} placeholder="********" />
              <InputGroup.Suffix
                className="cursor-pointer"
                onClick={() => setHidePassword(!hidePassword)}
              >
                <HugeiconsIcon
                  size={16}
                  icon={hidePassword ? EyeClosedFreeIcons : Eye}
                />
              </InputGroup.Suffix>
            </InputGroup>
            {fieldErrors.password && (
              <FieldError>{fieldErrors.password}</FieldError>
            )}
          </TextField>
        </Fieldset.Group>
        <Fieldset.Actions>
          <Link to="/" className={buttonVariants({ variant: "outline" })}>
            <HugeiconsIcon icon={ArrowLeft} />
            Cancel
          </Link>
          <Button
            isDisabled={loading}
            className="flex-1"
            variant="primary"
            type="submit"
          >
            Login
            <HugeiconsIcon icon={Login} />
          </Button>
        </Fieldset.Actions>
      </Fieldset>
    </Form>
  );
};

export default LoginAuthPage;
