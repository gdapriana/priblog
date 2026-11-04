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
import { useState } from "react";
import { passwordValidation } from "../../utils/validation.utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft,
  Eye,
  EyeClosedFreeIcons,
  Login,
} from "@hugeicons/core-free-icons";
import { Link } from "react-router";

const LoginAuthPage = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  return (
    <Form className="w-full max-w-96 px-4">
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
            <Input placeholder="johndoe@example" variant="primary" />
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
              <InputGroup.Input placeholder="********" />
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
          <Button className="flex-1" variant="primary" type="submit">
            Login
            <HugeiconsIcon icon={Login} />
          </Button>
        </Fieldset.Actions>
      </Fieldset>
    </Form>
  );
};

export default LoginAuthPage;
