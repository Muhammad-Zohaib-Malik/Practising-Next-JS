"use client";
import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import Link from "next/link"; 
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const SignUp = () => {
    const router=useRouter()
    console.log(router)

  const handleSignUp = async(values) => {
    try {
      const response=await axios.post('/api/sign-up',values)
      toast.success(response.data.message) 
      router.push('/login')
    } catch (error) { 
      if(error.response){
        toast.error(error.response.data.message || 'Something went wrong')
      }
    }
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
