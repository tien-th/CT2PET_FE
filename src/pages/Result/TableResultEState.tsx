import { Form, Table } from "antd"
import React from "react"
import {
  IColumnRenderTableCustom,
  IDataOfRealEstate,
  IPersonOfRealEstate,
} from "./Result-Interface"
import { ColumnsType } from "antd/lib/table"
import { realEstateConvertKey } from "../../constants"
import TableEditable from "./TableEditable"
import { ColumnType } from "antd/es/table"
import TextArea from "antd/lib/input/TextArea"
import { FormInstance } from "antd/es/form/Form"

interface Props {
  data: IDataOfRealEstate[]
  isEditting: boolean
  form: FormInstance<any>
}
const TableResultEState = (props: Props) => {
  const { data, isEditting, form } = props

  const showHeader = true
  const checkRenderTextArea = (dataIndex: string) => {
    if (dataIndex === "stt" || isEditting === false) {
      return false
    }
    return true
  }

  return (
    <Form form={form} name="dynamic_form_item">
      <Form.List name="items">
        {(informations, { add, remove }) => {
          return (
            <Table
              // columns={columnsOfPrescription}
              dataSource={informations}
              pagination={false}
              showHeader={showHeader}
            >
              <Table.Column
                dataIndex={"columnName"}
                title={"Tên thuộc tính"}
                align="center"
                render={(value, row, index) => {
                  const dataIndex = "columnName"
                  const valueRender = form.getFieldValue([
                    "items",
                    index,
                    dataIndex,
                  ])
                  return (
                    <Form.Item
                      name={[index, dataIndex]}
                      className={"ant-form-item-no-bottom-margin"}
                      style={{ textAlign: "center" }}
                    >
                      <b
                        style={{
                          color: "#3D88E1",
                        }}
                      >
                        {JSON.stringify(valueRender)}
                      </b>
                    </Form.Item>
                  )
                }}
              />

              <Table.Column
                dataIndex={"dataExtracted"}
                title={"Tên thuộc tính"}
                align="center"
                render={(value, row, index) => {
                  const dataIndex = "dataExtracted"
                  const valueRender = form.getFieldValue([
                    "items",
                    index,
                    dataIndex,
                  ])
                  const typeOfDataExtracted = typeof valueRender
                  if (typeOfDataExtracted === "string") {
                    return (
                      <Form.Item
                        name={[index, dataIndex]}
                        className={"ant-form-item-no-bottom-margin"}
                        style={{ textAlign: "center" }}
                      >
                        {checkRenderTextArea(dataIndex) ? (
                          <TextArea autoSize={{ maxRows: 2 }} />
                        ) : (
                          <b
                            style={{
                              color: "#3D88E1",
                            }}
                          >
                            {JSON.stringify(valueRender)}
                          </b>
                        )}
                      </Form.Item>
                    )
                  }
                  const dataSubtableRender =
                    valueRender as IPersonOfRealEstate[]
                  const listKeyOfDataExtracted = Object.keys(
                    dataSubtableRender[0],
                  )
                  const definationOfColumn: IColumnRenderTableCustom[] =
                    listKeyOfDataExtracted.map((key) => {
                      return {
                        title: realEstateConvertKey[key],
                        dataIndex: key,
                        key: key,
                        align: "center",
                      }
                    })
                  return (
                    <TableEditable
                      form={form}
                      columnRenderTable={definationOfColumn}
                      initialLogicGetFormValue={[index, dataIndex]}
                      data={valueRender}
                      isEditting={isEditting}
                    />
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

export default TableResultEState
