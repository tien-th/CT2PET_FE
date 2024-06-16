export interface IDataTypeOfPrescription {
  drugName?: string
  quantity?: string
  usage?: string
  stt?: number
}

export interface IPersonOfRealEstate {
  hoten?: string
  namsing?: string
  cmnd?: string
  dcthuongtru?: string
  namthaydoi?: string
}

export interface IDataOfRealEstate {
  columnName: string
  dataExtracted: string | Array<IPersonOfRealEstate>
}

export interface IDataOfMedicalDevice {
  columnName: string
  dataExtracted: string
}

export interface IColumnRenderTableCustom {
  dataIndex: string
  key: string
  align: string
  title?: any
  editable?: boolean
}
