import {
  Button,
  Upload,
  Space,
  Drawer,
  Form,
  Row,
  Col,
  Input,
} from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

/* INVENTORY PAGE */
export const InventorySingleAddDrawer = (props) => {
  const { onClose, singleOpen, form, onFinish, onFinishFailed, imgprops, onPreview } = props;
  return (
    <Drawer
      title="ADD SINGLE BOOK"
      placement="right"
      onClose={onClose}
      open={singleOpen}
      height="100%"
      width="100%"
      style={{
        display: "flex",
        justifyContent: "center",
        marginLeft: "342px",
      }}
      extra={<Space></Space>}
    >
      <div className="custom-form">
        <Form
          form={form}
          labelCol={{
            span: 12,
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
                    label="Book Name"
                    name="title"
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
                        message: "Please input book name!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter book name" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Form.Item
                    label="Author Name"
                    name="author"
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
                        message: "Please input author name!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter author name" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Form.Item
                    label="ISBN"
                    name="isbn"
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
                        message: "Please input ISBN!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter ISBN" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Form.Item
                    label="Assession Number"
                    name="assession"
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
                        message: "Please input assession number!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter assession number" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Form.Item
                    label="Description"
                    name="desc"
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
                        message: "Please input description!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter description" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Form.Item
                    label="Publication"
                    name="publication"
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
                        message: "Please input publication!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter publication" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 24 }} layout="vertical">
                  <Form.Item
                    label="Abstract"
                    name="abstract"
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
                        message: "Please input abstract!",
                      },
                    ]}
                  >
                    <TextArea
                      rows={10}
                      maxLength={3000}
                      showCount
                      placeholder="Enter abstract"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 16 }} layout="vertical">
                  <Form.Item
                    label="Location"
                    name="location"
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
                        message: "Please input location!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter location" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Form.Item
                    label="Genre"
                    name="genre"
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
                        message: "Please input genre!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter book genre" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Book Image"
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
                <Col xs={{ span: 24 }} md={{ span: 16 }} layout="vertical">
                  <Form.Item
                    label="Notes"
                    name="notes"
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
                        message: "Please input notes!",
                      },
                    ]}
                  >
                    <TextArea
                      rows={3}
                      maxLength={500}
                      showCount
                      placeholder="Enter Notes"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row
                gutter={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "40px",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button type="primary" onClick={onClose}>
                  Cancel
                </Button>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </Drawer>
  )
}
