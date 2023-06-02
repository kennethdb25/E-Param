import React from "react";
import {
  Button,
  Form,
  Input,
  Radio,
  Row,
  Col,
  message,
  Upload,
  Select
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import './style.css';
import "antd/dist/antd.min.css";
import { GradeData, SectionData } from "../../Data/Data";

const SignUp = (props) => {
  const [form] = Form.useForm();
  const { onClose } = props;

  const onFinish = async (values) => {
    const newdata = new FormData();
		newdata.append("photo", values.photo.file.originFileObj);
		newdata.append("address", values.address);
		newdata.append("confirmPassword", values.confirmPassword);
		newdata.append("email", values.email);
		newdata.append("firstName", values.firstName);
		newdata.append("gender", values.gender);
		newdata.append("lastName", values.lastName);
		newdata.append("grade", values.grade);
		newdata.append("middleName", values.middleName);
		newdata.append("password", values.password);
		newdata.append("section", values.section);
		newdata.append("studentId", values.studentId);

    const res = await fetch("/student/register", {
      method: "POST",
      body: newdata
    });
    if (res.status === 201) {
      toast.success("Registered Successfully", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
      onClose();
      form.resetFields();
    }else {
      toast.error(res.message, { position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
    }
  };

  const onFinishFailed = (error) => {};

  const imgprops = {
    beforeUpload: (file) => {
      const isIMG = file.type.startsWith("image");

      if (!isIMG) {
        message.error(`${file.name} is not an image`);
      }

      return isIMG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{
          span: 8,
        }}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          width: "100%",
        }}
      >
        <Row>
          <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <Row gutter={12}>
              <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                    {
                      pattern: /^[a-zA-Z_ ]*$/,
                      message: "First name should have no number.",
                    },
                  ]}
                >
                  <Input placeholder="Enter your first name" />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <Form.Item
                  label="Middle Name"
                  name="middleName"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  hasFeedback
                  rules={[
                    {
                      pattern: /^[a-zA-Z]*$/,
                      message: "Middle name should have no number.",
                    },
                  ]}
                >
                  <Input placeholder="Enter your middle name" />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your last name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <Form.Item
                  label="Student ID"
                  name="studentId"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please input your student ID!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your student ID" />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <Form.Item
                  label="Grade"
                  name="grade"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please input your grade!",
                    },
                  ]}
                >
                  <Select placeholder="Select your Grade">
                    {GradeData.map((value, index) => (
                      <Select.Option key={index} value={value.value}>
                        {value.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <Form.Item
                  label="Section"
                  name="section"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please input your section!",
                    },
                  ]}
                >
                  <Select placeholder="Select your Section">
                    {SectionData.map((value, index) => (
                      <Select.Option key={index} value={value.value}>
                        {value.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={0}>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item
                  label="Gender"
                  name="gender"
                  labelCol={{
                    span: 24,
                    //offset: 2
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select your gender!",
                    },
                  ]}
                >
                  <Radio.Group style={{ width: "100%" }}>
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item
                  label="Profile Picture"
                  name="photo"
                  labelCol={{
                    span: 24,
                    //offset: 2
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please upload an image",
                    },
                  ]}
                >
                  <Upload
                    {...imgprops}
                    listType="picture-card"
                    maxCount={1}
                    onPreview={onPreview}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col xs={{ span: 24 }} md={{ span: 24 }}>
                <Form.Item
                  label="Address"
                  name="address"
                  labelCol={{
                    span: 24,
                    //offset: 2
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please enter your address!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your address" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <Form.Item
                  label="Email"
                  name="email"
                  labelCol={{
                    span: 24,
                    //offset: 2
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  hasFeedback
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Please enter a valid email",
                    },
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <Form.Item
                  label="Password"
                  name="password"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    { whitespace: true },
                    { min: 8 },
                    { max: 26 },
                    {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,26}$/,
                      message:
                        "Must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
                    },
                  ]}
                >
                  <Input.Password placeholder="********" />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  labelCol={{
                    span: 24,
                    //offset: 2
                  }}
                  wrapperCol={{
                    span: 24,
                    //offset: 2
                  }}
                  hasFeedback
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Confirm Password is required!"
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject("Passwords does not matched.");
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="********" />
                </Form.Item>
              </Col>
            </Row>
            <Row
              gutter={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Row>
          </Col>
          <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
        </Row>
      </Form>
    </>
  );
};

export default SignUp;
