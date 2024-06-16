import React from "react"
import { Form, Space, Table, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"
import {
  IColumnRenderTableCustom,
  IDataOfMedicalDevice,
  IDataTypeOfPrescription,
} from "./Result-Interface"
import TableResultPrescription from "./TableResultPrescription"
import { DocumentTypeEnum } from "../../constants/document-type"
import TableResultEState from "./TableResultEState"
import TableResultMedicalDevice from "./TableResultMedicalDevice"
import TableEditable from "./TableEditable"
import { ColumnType } from "antd/lib/table"
import { FormInstance } from "antd/es/form/Form"
interface Props {
  documentType: DocumentTypeEnum
  isEditting: boolean
  form: FormInstance<any>
  data: any
}

const columnsOfPrescription: IColumnRenderTableCustom[] = [
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
    align: "center",
  },
  {
    title: <b style={{ whiteSpace: "nowrap" }}>Số lượng</b>,
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
  },
  {
    title: <b style={{ whiteSpace: "nowrap" }}>Hướng dẫn sử dụng</b>,
    dataIndex: "usage",
    align: "center",
    key: "usage",
  },
]

const columnsOfMedicalDevice: IColumnRenderTableCustom[] = [
  {
    dataIndex: "columnName",
    key: "columnName",
    align: "center",
    title: "",
    editable: false,
  },
  {
    dataIndex: "dataExtracted",
    key: "dataExtracted",
    align: "center",
    title: "",
  },
]

const TableResult = (props: Props) => {
  const { documentType, isEditting, form, data } = props

  switch (documentType) {
    case DocumentTypeEnum.PRESCRIPTION:
      return (
        <TableEditable
          form={form}
          columnRenderTable={columnsOfPrescription}
          isEditting={isEditting}
          data={data}
        />
      )
    case DocumentTypeEnum.REAL_ESTATE:
      return (
        <TableResultEState data={data} isEditting={isEditting} form={form} />
      )
    case DocumentTypeEnum.MEDICAL_DEVICE:
      return (
        <TableEditable
          form={form}
          columnRenderTable={columnsOfMedicalDevice}
          isEditting={isEditting}
          showHeader={false}
          data={data}
        />
      )

    default:
      return <>Not support</>
  }
}

export default TableResult
