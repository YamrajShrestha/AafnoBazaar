"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";

const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  address: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const registerPage = () => {
  const handleRegister = (formFields) => {
    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formFields),
    });
  };
  return (
    <div>
      <Image
        src="/logo.png"
        width={120}
        height={100}
        alt="Picture of the author"
      />
      <h1>Signup</h1>
      <Formik
        initialValues={{
          phoneNumber: "",
          email: "",
          address: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          handleRegister(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="phoneNumber" placeholder="Phone Number" /> <br />
            {errors.phoneNumber && touched.phoneNumber ? (
              <div>{errors.phoneNumber}</div>
            ) : null}
            <Field name="email" type="email" placeholder="E-mail" /> <br />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field name="address" placeholder="Address" /> <br />
            {errors.address && touched.address ? (
              <div>{errors.address}</div>
            ) : null}
            <Field name="password" placeholder="Password" /> <br />
            <br />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <span>Already registered?</span>
            <br />
            <Link href="/login">
              <button>Login</button>
            </Link>
            <br />
            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default registerPage;
