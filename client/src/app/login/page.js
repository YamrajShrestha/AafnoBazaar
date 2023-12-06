"use client";

import React from "react";
import { message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";

const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const loginPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const handleLogin = async (values) => {
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    messageApi.open({
      type: res.status == 200 ? "success" : "error",
      content: data.msg,
    });
    console.log(res);
  };
  return (
    <div>
      <Image
        src="/logo.png"
        width={120}
        height={100}
        alt="Picture of the author"
      />
      {contextHolder}
      <h1>Login</h1>
      <Formik
        initialValues={{
          phoneNumber: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          handleLogin(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="phoneNumber" placeholder="Registered phone number" />
            <br />
            {errors.phoneNumber && touched.phoneNumber ? (
              <div>{errors.phoneNumber}</div>
            ) : null}
            <Field name="password" placeholder="Password" /> <br /> <br />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <span>Don't have an account yet?</span> <br />
            <Link href="/register">
              <button>Register</button>
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

export default loginPage;
