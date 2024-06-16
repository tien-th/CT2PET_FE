import { Table } from "antd"
import React from "react"
import { IDataOfMedicalDevice } from "./Result-Interface"
import { ColumnsType } from "antd/lib/table"
import { realEstateConvertKey } from "../../constants"

const columnsOfPrescription: ColumnsType<IDataOfMedicalDevice> = [
  {
    dataIndex: "columnName",
    key: "columnName",
    align: "center",
  },
  {
    dataIndex: "dataExtracted",
    key: "dataExtracted",
    align: "center",
  },
]
interface Props {
  data: IDataOfMedicalDevice[]
}
const TableResultMedicalDevice = (props: Props) => {
  const { data } = props
  return (
    <Table
      columns={columnsOfPrescription}
      dataSource={data}
      pagination={false}
      showHeader={false}
    />
  )
}

export default TableResultMedicalDevice
