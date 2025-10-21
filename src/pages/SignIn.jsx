import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { signInSchema } from "./ValidationSchemas";

const SignIn = () => {  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch("http://tour-booking-back-end-production.up.railway.app:3001/api/SignIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors({ general: data.errors.map((err) => err.msg).join(", ") });
        } else if (data.message) {
          setErrors({ general: data.message });
        } else {
          setErrors({ general: "SignIn failed." });
        }
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setErrors({ general: "Network error. Try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-700 text-center mb-4">Log In</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={signInSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="space-y-4">
              {errors.general && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-2">
                  {errors.general}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 flex items-center border rounded-xl px-3 py-2">
                  <FiMail className="text-gray-500 mr-2" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full focus:outline-none"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 flex items-center border rounded-xl px-3 py-2">
                  <FiLock className="text-gray-500 mr-2" />
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="w-full focus:outline-none"
                  />
                  <button type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-600 text-white py-2 rounded-xl font-semibold hover:bg-teal-500"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-sm text-center text-gray-700">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-teal-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
