import React, { useState, useEffect, useRef } from "react"
import { Form, Input, Select, Upload, Button, notification } from "antd"
import { Stage, Layer, Image, Rect } from "react-konva"
import useImage from "use-image"
import { KonvaEventObject } from "konva/lib/Node"
import FileService from "../../utils/services/file.service"
const { Option } = Select
import { useHistory } from "react-router-dom"
import "./index.scss"
import { DocumentTypeEnum } from "../../constants/document-type"


interface Props {}
const textOfPrescription = "Đơn thuốc"
const textOfOtherDoc = "Khác"
interface IDocumentCanDetect {
  textRender: string
  value: string
}

const listDocumentCanDetect: IDocumentCanDetect[] = [
  {
    textRender: textOfPrescription,
    value: DocumentTypeEnum.PRESCRIPTION,
  },
  {
    textRender: "Giấy tờ nhà đất",
    value: DocumentTypeEnum.REAL_ESTATE,
  },
  {
    textRender: "Thiết bị điện tử",
    value: DocumentTypeEnum.MEDICAL_DEVICE,
  },
  {
    textRender: textOfOtherDoc,
    value: "3",
  },
]

interface IFormValueSubmit {
  documentType: string
}

const FormSelectDocument = (props: Props) => {
  const [imageUrl, setImageUrl] = useState("")
  const [allImages, setAllImages] = useState<any[]>([])
  const [indexImg, setIndexImg] = useState(0)
  const [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [imageRenderDetect] = useImage(imageUrl)
  const [sizeOfStage, setSizeOfStage] = useState({ width: 0, height: 0 })
  const [newAnnotation, setNewAnnotation] = useState<
    { x: number; y: number; width: number; height: number }[]
  >([])
  const [annotations, setAnnotations] = useState<
    { x: number; y: number; width: number; height: number }[]
  >([])
  const [files, setFiles] = useState<any[]>([])
  const [imageRender, setImageRender] = useState(new window.Image())
  const history = useHistory()
  const parentRefOfStage = useRef<any>()
  const [form] = Form.useForm()
  const buttonRef = useRef<any>()
  const fileService = new FileService()
  const documentType = localStorage.getItem("documentType") ?? "prescription"
  const [showResult, setShowResult] = useState(false)

  const [apiNotification, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = () => {
    apiNotification["error"]({
      message: "Đã có lỗi trong quá trình sử dụng",
      description:
        "Bạn chưa chọn loại tài liệu muốn sử dụng. Vui lòng chọn loại tài liệu muốn trích xuất dữ liệu",
    })
  }

  const checkValidGetPointerPosition = (
    event: KonvaEventObject<MouseEvent>,
  ) => {
    const stage = event.target.getStage()
    if (!stage) {
      return false
    }
    const positionOfPointer = stage.getPointerPosition()
    if (!positionOfPointer) {
      return false
    }
    return positionOfPointer
  }

  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    const positionOfPointer = checkValidGetPointerPosition(event)
    if (!positionOfPointer) {
      return
    }

    if (newAnnotation.length === 0) {
      const { x, y } = positionOfPointer

      setNewAnnotation([{ x, y, width: 0, height: 0 }])
    }
  }

  const handleMouseUp = (event: KonvaEventObject<MouseEvent>) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x
      const sy = newAnnotation[0].y

      const positionOfPointer = checkValidGetPointerPosition(event)
      if (!positionOfPointer) {
        return
      }

      const { x, y } = positionOfPointer
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
      }
      setNewAnnotation([])
      setAnnotations((prevState) => [...prevState, annotationToAdd])
    }
  }

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x
      const sy = newAnnotation[0].y

      const positionOfPointer = checkValidGetPointerPosition(event)
      if (!positionOfPointer) {
        return
      }

      const { x, y } = positionOfPointer
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
        },
      ])
    }
  }

  const handleImagePreview = async (info: any) => {
    setFiles(info.fileList)
  }

  const actionSCroll = () => {
    if (buttonRef) {
      const buttonHeight = buttonRef.current.offsetHeight
      setTimeout(() => {
        window.scrollBy(0, buttonHeight + 300)
      }, 1000) // delay of 1000ms
    }
  }

  const handleImageBefore = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setAllImages((prevState: any) =>
        [...prevState, reader.result as string].reverse(),
      )
      // setImageUrl(reader.result as string)
    }
    // actionSCroll()
  }

  useEffect(() => {
    const getResultDetect = async () => {
      Promise.all(
        files.map((file) => {
          const result = fileService.getPixelData(
            file.originFileObj,
            documentType,
          )
          return result
        }),
      )
        .then((allResult) => {
          setAllImages(allResult)
          setImageUrl(allResult[indexImg]?.data?.ct)
        })
        .catch((err) => {
          console.log("🚀 ~ file: index.tsx:62 ~ getResultDetect ~ err:", err)
          //openNotificationWithIcon(err.message)
        })
    }
    if (files.length) {
      getResultDetect()  
    }
  }, [files])

  useEffect(() => {
    const element = new window.Image()
    element.src = "data:image/png;base64," + imageUrl
    const { width } = element
    if (parentRefOfStage) {
      const { current } = parentRefOfStage
      if (current) {
        const { offsetWidth } = current
        if (width > offsetWidth) {
          element.width = offsetWidth 
        }
      }
    }
    
    element.width = 256
    element.height = 256

    setTimeout(() => {
      setImageRender(element)
    }, 100)
  }, [imageUrl])

  useEffect(() => {
    if (imageRender) {
      const { width, height } = imageRender

      let widthRenderStage = width
      if (parentRefOfStage) {
        const { current } = parentRefOfStage
        if (current) {
          const offsetWidth = current.offsetWidth
          console.log(
            "🚀 ~ file: FormSelectDocument.tsx:227 ~ useEffect ~ offsetWidth:",
            offsetWidth,
          )
          if (width > offsetWidth) {
            widthRenderStage = offsetWidth
          }
        }
      }
      setSizeOfStage({ width, height })
      if (imageUrl) {
        setShowResult(true)
      }
    }
  }, [imageRender])

  const handleImageRemove = () => {
    setImageUrl("")
  }

  const handleRectChange = (event: any) => {
    setRect(event.target.attrs)
  }

  const changeImg = () => {
    // const imageUrl = allImages[indexImg + 1]
    const imageUrl = allImages[indexImg + 1]?.data.ct
    setImageUrl(imageUrl)
    setIndexImg(indexImg + 1)
  }

  const backImg = () => {
    // const imageUrl = allImages[indexImg - 1]
    const imageUrl = allImages[indexImg - 1]?.data.ct
    setImageUrl(imageUrl)
    setIndexImg(indexImg - 1)
  }
  const annotationsToDraw = [...annotations, ...newAnnotation]
  const onFinish = (values: IFormValueSubmit) => {
    const { documentType } = values

    localStorage.setItem("documentType", documentType)
    if (documentType === textOfPrescription) {
      localStorage.setItem(
        "recOfPresription",
        JSON.stringify(annotationsToDraw),
      )
    }
    if (documentType === textOfOtherDoc) {
      localStorage.setItem("recOfOther", JSON.stringify(annotationsToDraw))
    }
    if (files.length) {
      history.push("/processing", { files })
    }
  }
  return (
    <Form onFinish={onFinish} layout="vertical" form={form}>
      {/*<Form.Item
        label="Loại tài liệu"
        name="documentType"
        rules={[
          {
            required: true,
            message: "Bạn cần phải chọn loại tài liệu muốn trích xuất dữ liệu!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value === undefined) {
                openNotificationWithIcon()
                return Promise.reject(new Error(""))
              } else {
                return Promise.resolve()
              }
            },
          }),
        ]}
      >
        <Select placeholder="Lựa chọn loại tài liệu">
          {listDocumentCanDetect.map((value, index) => {
            return (
              <Option value={value.value} key={index}>
                {value.textRender}
              </Option>
            )
          })}
        </Select>
        </Form.Item>*/}

      {showResult && imageUrl ? (
        <Form.Item
          name="image"
          style={{
            width: "100%",
            // height: "340px",
            // background: "#FFF",
            // border: "2px dashed #C4C4C4",
            // padding: "16px",
            position: "relative",
          }}
        >
          <div style={{ zIndex: 10 }}>
            <Stage
              width={sizeOfStage.width}
              height={sizeOfStage.height}
              // onMouseDown={handleMouseDown}
              // onMouseUp={handleMouseUp}
              // onMouseMove={handleMouseMove}
              style={{
                display: "flex",
                justifyContent: "center",
                zIndex: 1,
                width: "100%",
              }}
            >
              <Layer>
                <Image
                  image={imageRender}
                  // onDragMove={handleRectChange}
                  // onTransform={handleRectChange}
                />
                {/*imageRenderDetect && (
                  <Image
                    image={imageRender}
                    // onDragMove={handleRectChange}
                    // onTransform={handleRectChange}
                  />
                )*/}
                {annotationsToDraw.map((value) => {
                  return (
                    <Rect
                      x={value.x}
                      y={value.y}
                      width={value.width}
                      height={value.height}
                      fill="transparent"
                      stroke="#458BCC"
                      dash={[10, 10]}
                    />
                  )
                })}
                <Rect fill="#fff" globalCompositeOperation="destination-out" />
              </Layer>
            </Stage>
          </div>
        </Form.Item>
      ) : (
        <Form.Item name="image" className="form-item-upload">
          <Upload
            beforeUpload={handleImageBefore}
            onChange={handleImagePreview}
            listType="picture-card"
            style={{ background: "#FFF", width: "100%", height: "100%" }}
            // showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
            showUploadList={false}
            multiple
          >
            <Button
              disabled={imageUrl !== ""}
              style={{
                height: "fit-content",
                background: "#FFF",
                border: "none",
              }}
            >
              <img src="/upload.png" alt="" />
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "21px",
                  color: "#3D88E1",
                  marginBlock: "8px",
                }}
              >
                Tải ảnh lên
              </p>
              <p
                style={{
                  color: "#666666",
                }}
              >
                Chỉ hỗ trợ định dạng DICOM (*.dcm, *.DCM, ...)
              </p>
            </Button>
          </Upload>
        </Form.Item>
      )}
      {showResult && allImages.length > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              borderRadius: "1000px",
              height: "40px",
              width: "40px",
            }}
            onClick={backImg}
            disabled={indexImg < 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="41"
              viewBox="0 0 40 41"
              fill="none"
              style={{ position: "absolute", top: -2, left: -2 }}
            >
              <path
                d="M15.538 20.5002C15.538 20.7011 15.5701 20.8881 15.6342 21.0611C15.6983 21.2342 15.8083 21.3987 15.9643 21.5547L23.4547 29.0451C23.6855 29.2759 23.9755 29.3939 24.3249 29.3992C24.6742 29.4046 24.9696 29.2865 25.211 29.0451C25.4525 28.8036 25.5732 28.5109 25.5732 28.1669C25.5732 27.8229 25.4525 27.5302 25.211 27.2887L18.4226 20.5002L25.211 13.7117C25.4418 13.481 25.5599 13.1909 25.5652 12.8416C25.5706 12.4922 25.4525 12.1969 25.211 11.9554C24.9696 11.7139 24.6769 11.5932 24.3329 11.5932C23.9889 11.5932 23.6961 11.7139 23.4547 11.9554L15.9643 19.4458C15.8083 19.6018 15.6983 19.7663 15.6342 19.9394C15.5701 20.1124 15.538 20.2994 15.538 20.5002Z"
                fill="#3D88E1"
              />
            </svg>
          </Button>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 300,
              lineHeight: "150%",
              display: "flex",
              marginInline: "40px",
            }}
          >
            <div style={{ color: "#3D88E1", fontWeight: 700 }}>
              {indexImg + 1}
            </div>
            <div>/</div>
            <div>{allImages.length}</div>
          </div>
          <Button
            style={{
              borderRadius: "1000px",
              height: "40px",
              width: "40px",
            }}
            onClick={changeImg}
            disabled={indexImg > allImages.length - 2}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="41"
              viewBox="0 0 40 41"
              fill="none"
              style={{ position: "absolute", top: -2, left: 2 }}
            >
              <path
                d="M24.462 20.5002C24.462 20.7011 24.4299 20.8881 24.3658 21.0611C24.3017 21.2342 24.1917 21.3987 24.0357 21.5547L16.5453 29.0451C16.3145 29.2759 16.0245 29.3939 15.6751 29.3992C15.3258 29.4046 15.0304 29.2865 14.789 29.0451C14.5475 28.8036 14.4268 28.5109 14.4268 28.1669C14.4268 27.8229 14.5475 27.5302 14.789 27.2887L21.5774 20.5002L14.789 13.7117C14.5582 13.481 14.4401 13.1909 14.4348 12.8416C14.4294 12.4922 14.5475 12.1969 14.789 11.9554C15.0304 11.7139 15.3231 11.5932 15.6671 11.5932C16.0111 11.5932 16.3039 11.7139 16.5453 11.9554L24.0357 19.4458C24.1917 19.6018 24.3017 19.7663 24.3658 19.9394C24.4299 20.1124 24.462 20.2994 24.462 20.5002Z"
                fill="#3D88E1"
              />
            </svg>
          </Button>
        </div>
      )}
      <Form.Item
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          style={{
            borderRadius: "1000px",
            padding: "13px 49px",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            background: imageUrl ? "#3D88E1" : "#F6F6F6",
            color: imageUrl ? "#fff" : "#C4C4C4",
            lineHeight: "21px",
            height: "48px",
            zIndex: 1,
            marginTop: "28px"
          }}
          disabled={!imageUrl}
          ref={buttonRef}
        >
          Sinh ảnh PET tương ứng
        </Button>
      </Form.Item>
      {contextHolder}
    </Form>
  )
}

export default FormSelectDocument
