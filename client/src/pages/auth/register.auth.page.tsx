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
} from "@heroui/react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  nameValidation,
  passwordValidation,
} from "../../utils/validation.utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft,
  Eye,
  EyeClosedFreeIcons,
  Login,
} from "@hugeicons/core-free-icons";
import { Link } from "react-router";
import { useAuth } from "../../context/auth.context";
import { ApiError } from "../../utils/api.utils";
import type { RegisterInput } from "../../data/type.data";

type FieldErrors = Partial<Record<keyof RegisterInput, string>>;

const RegisterAuthPage = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const { register, login } = useAuth();
  const [form, setForm] = useState<RegisterInput>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);
    try {
      await register(form);
      await login({ email: form.email, password: form.password });
    } catch (e) {
      if (e instanceof ApiError && e.errors) {
        const map: FieldErrors = {};
        for (const issue of e.errors)
          map[issue.path as keyof RegisterInput] = issue.message;
      } else {
        setError(e instanceof Error ? e.message : "something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit} className="w-full max-w-96 px-4">
      {error && <p className="text-sm text-red-500">{error}</p>}

      <Fieldset>
        <Fieldset.Legend className="font-medium text-center text-neutral-800 dark:text-neutral-100">
          Register
        </Fieldset.Legend>
        <Description className="text-neutral-600 text-center dark:text-neutral-400">
          Create a new account. Already have an account?{" "}
          <Link className="underline" to={"/login"}>
            Login
          </Link>
        </Description>
        <Fieldset.Group>
          <TextField isRequired name="name" validate={nameValidation}>
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={onChange}
              placeholder="John Doe"
              variant="primary"
            />

            {fieldErrors.name && (
              <p className="text-sm text-red-500">{fieldErrors.name}</p>
            )}
            <FieldError />
          </TextField>
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input
              value={form.email}
              onChange={onChange}
              placeholder="johndoe@example"
              variant="primary"
            />
            {fieldErrors.email && (
              <p className="text-sm text-red-500">{fieldErrors.email}</p>
            )}
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="password"
            type={hidePassword ? "password" : "text"}
            validate={passwordValidation}
          >
            <Label>Password</Label>
            <InputGroup fullWidth>
              <InputGroup.Input
                value={form.password}
                onChange={onChange}
                placeholder="********"
              />
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
            <FieldError />
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
            Create Account
            <HugeiconsIcon icon={Login} />
          </Button>
        </Fieldset.Actions>
      </Fieldset>
    </Form>
  );
};

export default RegisterAuthPage;
