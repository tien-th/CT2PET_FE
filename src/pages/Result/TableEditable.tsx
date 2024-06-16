import { Col, Form, Input, Table } from "antd"
import React, { useEffect } from "react"
import {
  IColumnRenderTableCustom,
  IDataTypeOfPrescription,
} from "./Result-Interface"
import { ColumnsType } from "antd/lib/table"
import { ColumnType } from "antd/es/table"
import { FormInstance } from "antd/es/form/Form"
const { TextArea } = Input

interface Props {
  form: FormInstance<any>
  columnRenderTable: IColumnRenderTableCustom[]
  isEditting?: boolean
  showHeader?: boolean
  initialLogicGetFormValue?: any[]
  data: any
}
const TableEditable = (props: Props) => {
  const {
    form,
    columnRenderTable,
    isEditting = false,
    showHeader = true,
    initialLogicGetFormValue = [],
    data,
  } = props

  const checkRenderTextArea = (dataIndex: string) => {
    if (dataIndex === "stt" || isEditting === false) {
      return false
    }
    return true
  }
  console.log(form.getFieldsValue())

  return (
    <Form form={form} name="dynamic_form_item">
      <Form.List name="items">
        {(informations, { add, remove }) => {
          return (
            <Table pagination={false} showHeader={showHeader} dataSource={data}>
              {columnRenderTable.map((column) => {
                return (
                  <Table.Column
                    title={column.title}
                    align="center"
                    render={(value, row, index) => {
                      const { editable = true } = column
                      if (column.dataIndex) {
                        const dataIndex = column.dataIndex.toString()
                        const logicGenDataForForm =
                          initialLogicGetFormValue.length !== 0
                            ? [
                                "items",
                                ...initialLogicGetFormValue,
                                index,
                                dataIndex,
                              ]
                            : ["items", index, dataIndex]
                        const logicGetDataRender =
                          initialLogicGetFormValue.length !== 0
                            ? [...initialLogicGetFormValue, index, dataIndex]
                            : [index, dataIndex]

                        const valueRender =
                          form.getFieldValue(logicGenDataForForm)

                        return (
                          <Form.Item
                            name={logicGetDataRender}
                            className={"ant-form-item-no-bottom-margin"}
                            style={{ textAlign: "center" }}
                          >
                            {checkRenderTextArea(dataIndex) && editable ? (
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
                    }}
                  />
                )
              })}
            </Table>
          )
        }}
      </Form.List>
    </Form>
  )
}

export default TableEditable
