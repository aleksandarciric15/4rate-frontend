import * as z from "zod";

const LoginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must have at least 3 characters." }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      "Password must contain at least one letter, number and special character"
    ),
});

const LoginDefaultValues = {
  username: "",
  password: "",
};

export { LoginSchema, LoginDefaultValues };
