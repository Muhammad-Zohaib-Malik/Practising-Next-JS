"use client";
import { Button, Card, Form, Input } from "antd";
import Link from "next/link"; // Import Next.js Link

const SignUp = () => {
  const handleSignUp = (values) => {
    console.log(values);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-6/12 shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Register Now</h1>
        <Form layout="vertical" onFinish={handleSignUp}>
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[{ required: true, message: "Please input your fullname" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email" }]}
          >
            <Input placeholder="John@gmail.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your Password" }]}
          >
            <Input placeholder="********" type="password" />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="!bg-gray-500 !text-white "
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <p className=" mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default SignUp;
