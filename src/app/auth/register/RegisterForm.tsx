"use client";

import { registerUser } from "@/app/actions/authActions";
import { registerSchema, RegisterSchema } from "@/app/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterSchema) => {
    const results = await registerUser(data);

    console.log("AAA", results);
  };

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-neutral-500">Welcome to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input label="Name" variant="bordered" defaultValue="" {...register("name")} isInvalid={!!errors.name} errorMessage={errors.name?.message} />
            <Input label="Email" variant="bordered" defaultValue="" {...register("email")} isInvalid={!!errors.email} errorMessage={errors.email?.message} />
            <Input label="Password" type="password" variant="bordered" defaultValue="" {...register("password")} isInvalid={!!errors.password} errorMessage={errors.password?.message} />
            <Button isDisabled={!isValid} fullWidth color="secondary" type="submit">
              Register
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default RegisterForm;
