import { Form, Input, Table } from "antd"
import React, { useEffect } from "react"
import { IDataTypeOfPrescription } from "./Result-Interface"
import { ColumnsType } from "antd/lib/table"
const { TextArea } = Input

const columnsOfPrescription: ColumnsType<IDataTypeOfPrescription> = [
  {
    title: () => <b>STT</b>,
    dataIndex: "stt",
    key: "stt",
    align: "center",
  },
  {
    title: <b style={{ whiteSpace: "nowrap" }}>Tên thuốc</b>,
    dataIndex: "drugName",
    key: "drugName",
    // render: (text) => <b style={{ color: "#3D88E1" }}>{text}</b>,
    align: "center",
    render: (value, row, index) => {
      return (
        <Form.Item
          name={[index, "drugName"]}
          className={"ant-form-item-no-bottom-margin"}
        >
          <Input placeholder="age" min={0} max={150} />
        </Form.Item>
      )
    },
  },
  {
    title: <b style={{ whiteSpace: "nowrap" }}>Số lượng</b>,
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
    render: (text) => (
      <b style={{ color: "#3D88E1", whiteSpace: "nowrap" }}>{text}</b>
    ),
  },
  {
    title: <b style={{ whiteSpace: "nowrap" }}>Hướng dẫn sử dụng</b>,
    dataIndex: "usage",
    align: "center",
    key: "usage",
    render: (text) => <b style={{ color: "#3D88E1" }}>{text}</b>,
  },
]
interface Props {
  data: IDataTypeOfPrescription[]
}
const TableResultPrescription = (props: Props) => {
  const { data } = props
  const [form] = Form.useForm()
  form.setFieldValue("items", data)
  return (
    <Form form={form} name="dynamic_form_item">
      <Form.List name="items">
        {(informations, { add, remove }) => {
          console.log(
            "🚀 ~ file: TableResultPrescription.tsx:47 ~ TableResultPrescription ~ data:",
            informations,
          )
          return (
            <Table
              // columns={columnsOfPrescription}
              dataSource={informations}
              pagination={false}
            >
              <Table.Column
                dataIndex={"drugName"}
                title={"Age"}
                render={(value, row, index) => {
                  return (
                    <Form.Item
                      name={[index, "drugName"]}
                      className={"ant-form-item-no-bottom-margin"}
                    >
                      <TextArea autoSize />
                    </Form.Item>
                  )
                }}
              />

              <Table.Column
                dataIndex={"quantity"}
                title={"Age"}
                render={(value, row, index) => {
                  return (
                    <Form.Item
                      name={[index, "quantity"]}
                      className={"ant-form-item-no-bottom-margin"}
                    >
                      <TextArea autoSize />
                    </Form.Item>
                  )
                }}
              />

              <Table.Column
                dataIndex={"quantity"}
                title={"Age"}
                render={(value, row, index) => {
                  return (
                    <Form.Item
                      name={[index, "quantity"]}
                      className={"ant-form-item-no-bottom-margin"}
                    >
                      <TextArea autoSize />
                    </Form.Item>
                  )
                }}
              />
            </Table>
          )
        }}
      </Form.List>
    </Form>
  )
}

export default TableResultPrescription
