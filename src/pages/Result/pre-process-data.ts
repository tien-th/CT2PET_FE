import { medicalDeviesConvertKey, realEstateConvertKey } from "../../constants"
import { DocumentTypeEnum } from "../../constants/document-type"
import {
  IDataOfMedicalDevice,
  IDataOfRealEstate,
  IDataTypeOfPrescription,
} from "./Result-Interface"

export const processDataTablePresciption = (
  responseFromApi: any[],
  documentType: DocumentTypeEnum,
):
  | IDataTypeOfPrescription[][]
  | IDataOfRealEstate[][]
  | IDataOfMedicalDevice[][] => {
  switch (documentType) {
    case DocumentTypeEnum.PRESCRIPTION:
      const allDrugTakenInfos = responseFromApi.map((e) => e.drugTakenInfos)
      const resultAfterCombined = allDrugTakenInfos.map((eachResult: any[]) => {
        const resultOfAnImage = eachResult.map(
          (detailData: any, index: number) => {
            const { drugName, quantity, usage } = detailData
            const drugNameReturn = drugName.content.join("")
            const quantityReturn = quantity.content.join("")
            const usageReturn = usage.content.join("")
            const dataEachRow: IDataTypeOfPrescription = {
              drugName: drugNameReturn,
              quantity: quantityReturn,
              usage: usageReturn,
              stt: index + 1,
            }
            return dataEachRow
          },
        )
        return resultOfAnImage
      })
      return resultAfterCombined
    case DocumentTypeEnum.REAL_ESTATE:
      if (responseFromApi.length === 0) {
        return responseFromApi
      }

      const resultOfAllImage: IDataOfRealEstate[][] = responseFromApi.map(
        (responseOfEachImage) => {
          const ocrResultOfThisImage = responseOfEachImage.ocr_result
          const ocrResultKeys = Object.keys(ocrResultOfThisImage)
          const resultOfThisImage = ocrResultKeys.map((key) => {
            const dataEachRow: IDataOfRealEstate = {
              columnName: realEstateConvertKey[key],
              dataExtracted: ocrResultOfThisImage[key],
            }
            return dataEachRow
          })
          return resultOfThisImage
        },
      )

      return resultOfAllImage

    case DocumentTypeEnum.MEDICAL_DEVICE:
      if (responseFromApi.length === 0) {
        return responseFromApi
      }
      const resultOfMedicalDevies: IDataOfMedicalDevice[][] =
        responseFromApi.map((responseOfEachImage) => {
          const ocrResultOfThisImage = responseOfEachImage.result
          const ocrResultKeys = Object.keys(ocrResultOfThisImage)
          const resultOfThisImage: IDataOfMedicalDevice[] = ocrResultKeys.map(
            (key) => {
              const dataEachRow: IDataOfMedicalDevice = {
                columnName: medicalDeviesConvertKey[key],
                dataExtracted: ocrResultOfThisImage[key],
              }
              return dataEachRow
            },
          )
          return resultOfThisImage
        })

      return resultOfMedicalDevies
    default:
      return []
  }
}
