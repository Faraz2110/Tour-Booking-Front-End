// validation/bookingSchema.js
import * as Yup from "yup";




export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// export const signInSchema = Yup.object({
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),

//   password: Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .required("Password is required"),
// });


export const signUpSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});


// export const signUpSchema = Yup.object({
//   name: Yup.string()
//     .min(3, "Name must be at least 3 characters")
//     .required("Full name is required"),
  
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),

//   password: Yup.string()
//     .min(8, "Password must be at least 8 characters") // Strong password length
//     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .matches(/\d/, "Password must contain at least one number")
//     .matches(/[@$!%*?&#^()_\-+={}[\]|\\:;"'<>,.?/~`]/, "Password must contain at least one special character")
//     .required("Password is required"),
// });

export const bookingSchema = Yup.object().shape({
  name: Yup.string().max(15, "Max 15 characters").required("Name is required"),
  from: Yup.string().required("Departure location is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  company: Yup.string().nullable(),
  photo: Yup.mixed().nullable(),
});


