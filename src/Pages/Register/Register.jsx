// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./Register.module.css";
// import {z} from "zod";

// // define zod schema for validation
// const schema = z.object({
//   name: z.string().min(3, "Name must be at least 3 characters long"),
//   email: z
//     .string()
//     .email("Invalid email address")
//     .endsWith("@gmail.com", "Only @gmail.com emails are allowed"),
//   phone: z
//     .string()
//     .length(10, "Phone number must be exactly 10 digits")
//     .regex(/^\d+$/, "Phone must contain only digits"),
//   password: z.string().min(6, "Password must be at least 6 characters long"),
// });
// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const navigate = useNavigate();

//   const handleRegister = (e) => {
//     e.preventDefault();

//     const result = schema.safeParse(formData);

//     if (!result.success) {
//       const fieldErrors = {};
//       result.error.errors?.forEach((error) => {
//         fieldErrors[error.path[0]] = error.message;
//       });
//       setErrors(fieldErrors);
//       return;
//     }

//     localStorage.setItem("user", JSON.stringify(formData));
//     localStorage.setItem("authToken", "sample_token");

//     alert("Registration successful!");
//     navigate("/");
//   };

//   return (
//     <>
//       <div className="container p-5">
//         <h1 className="text-center">Register</h1>
//         <div className="card p-3 my-3 rounded-0">
//           <form onSubmit={handleRegister}>
//             <input
//               type="name"
//               name="name"
//               required
//               placeholder="Enter name"
//               value={formData.name}
//               onChange={handleChange}
//               className="form-control my-2 rounded-0 login-input"
//             />
//             {errors.name && (
//               <small className="text-danger">{errors.name}</small>
//             )}

//             <input
//               type="email"
//               name="email"
//               required
//               placeholder="Enter email address"
//               value={formData.email}
//               onChange={handleChange}
//               className="form-control my-2 rounded-0 login-input"
//             />
//             {errors.email && (
//               <small className="text-danger">{errors.email}</small>
//             )}

//             <input
//               type="text"
//               name="phone"
//               required
//               placeholder="Enter phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="form-control my-2 rounded-0 login-input"
//             />
//             {errors.phone && (
//               <small className="text-danger">{errors.phone}</small>
//             )}

//             <input
//               type="password"
//               name="password"
//               required
//               placeholder="Enter password"
//               value={formData.password}
//               onChange={handleChange}
//               className="form-control my-2 rounded-0 login-input"
//             />
//             {errors.password && (
//               <small className="text-danger">{errors.password}</small>
//             )}
//             <button
//               className="btn btn-sm w-100 btn-dark rounded-0 batan login-input"
//               type="submit"
//             >
//               Register{" "}
//             </button>
//           </form>
//         </div>
//         <p className={styles.center}>
//           Already have an account?
//           <Link className={styles.color} to={"/login"}>
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </>
//   );
// };

// export default Register;

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Register.module.css";

// ✅ schema banaya
const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z
    .string()
    .email("Invalid email address")
    .endsWith("@gmail.com", "Only @gmail.com emails are allowed"),
  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone must contain only digits"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Register = () => {
  const navigate = useNavigate();

  // ✅ react-hook-form setup with zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("authToken", "sample_token");
    navigate("/");
  };

  return (
    <div className="container p-5">
      <h1 className="text-center">Register</h1>
      <div className="card p-3 my-3 rounded-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <input
            type="text"
            placeholder="Enter name"
            {...register("name")}
            className="form-control my-2 rounded-0 login-input"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}

          {/* Email */}
          <input
            type="email"
            placeholder="Enter email address"
            {...register("email")}
            className="form-control my-2 rounded-0 login-input"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}

          {/* Phone */}
          <input
            type="text"
            placeholder="Enter phone"
            {...register("phone")}
            className="form-control my-2 rounded-0 login-input"
          />
          {errors.phone && (
            <p className="text-danger">{errors.phone.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Enter password"
            {...register("password")}
            className="form-control my-2 rounded-0 login-input"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}

          <button
            className="btn btn-sm w-100 btn-dark rounded-0 batan login-input"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
      <p className={styles.center}>
        Already have an account?{" "}
        <Link className={styles.color} to={"/login"}>
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
