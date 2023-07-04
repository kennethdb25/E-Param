import React from "react";
import { Form, Input, Radio, Row, Col, message, Upload, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./style.css";
import "antd/dist/antd.min.css";
import { GradeData } from "../../Data/Data";

const SignUp = (props) => {
  const { form, onFinish, section, setSection } = props;

  const onGradeChange = async (event) => {
    const data = await fetch(`/get-section?grade=${event}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setSection([res.body]);
  };

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
        autoComplete="off"
        style={{
          width: "100%",
        }}
      >
        <Row>
          {/* <Col xs={{ span: 0 }} md={{ span: 4 }}></Col> */}
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
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
                  <Select
                    placeholder="Select your Grade"
                    onChange={onGradeChange}
                  >
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
                  <Select
                    placeholder="Select your Section"
                    disabled={section ? false : true}
                  >
                    {section && section.length > 0
                      ? section[0].map((value, index) => (
                          <Select.Option key={index} value={value}>
                            {value}
                          </Select.Option>
                        ))
                      : ""}
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
                  <Input placeholder="House No./Street Name/Barangay/Municipality/Province" />
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
                      message: "Confirm Password is required!",
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
          </Col>
          <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
        </Row>
      </Form>
    </>
  );
};

export default SignUp;
