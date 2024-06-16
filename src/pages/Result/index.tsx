import React, { useState, useEffect, useMemo } from "react"
import { Statistic, Card, Row, Col, Button, Form, Typography } from "antd"
import { Image, Layer, Stage } from "react-konva"
import ImageDetected from "./ImageDetected"
import TableResult from "./TableResult"
import "./index.scss"
import FileService from "../../utils/services/file.service"
import { DocumentTypeEnum } from "../../constants/document-type"
import { processDataTablePresciption } from "./pre-process-data"
import { IDataOfRealEstate, IDataTypeOfPrescription } from "./Result-Interface"
import FileDownload from "js-file-download"
import Feedback from "./Feedback"
import FeedbackService from "../../utils/services/feedback.service"

const { Text } = Typography;

interface Props {
  files: any[]
  actionSetShowResult: any
  resultRender: any
  listFileImageUrl: any[]
  contextHolder: any
}

const textRenderDocumentype: any = {
  prescription: "Đơn thuốc",
  real_estate: "Giấy tờ nhà đất",
  medical_device: "Giấy tờ thiết bị y tế",
}

const Result = (props: Props) => {
  const { contextHolder, resultRender, listFileImageUrl } = props
  // const [allImages, setAllImages] = useState<string[]>(listFileImageUrl)
  const [allImages, setAllImages] = useState<any[]>(resultRender)
  const [isEditting, setIsEditting] = useState(false)
  const [sessionOfImageShowing, setSessionOfImageShowing] = useState("")
  const [imageCheckingUrl, setImageCheckingUrl] = useState<any>("")
  const valuePaddingCardTopBottom = "30px"
  const documentType = localStorage.getItem("documentType") as DocumentTypeEnum
  const dataProcessed = processDataTablePresciption(resultRender, documentType)
  const sessionIds: string[] = resultRender.map((e: any) => e.session_id)
  const [indexImg, setIndexImg] = useState(
    parseInt(localStorage.getItem("indexImg") ?? "0"),
  )
  const fileService = new FileService()
  const [form] = Form.useForm()
  const feedbackService = new FeedbackService()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const changeImg = () => {
    setIndexImg(indexImg + 1)
  }

  const backImg = () => {
    setIndexImg(indexImg - 1)
  }

  useEffect(() => {
    // setImageCheckingUrl(allImages[indexImg])
    setImageCheckingUrl(allImages[indexImg].data)
    form.setFieldValue("items", dataProcessed[indexImg])

    setIsEditting(false)
    setSessionOfImageShowing(sessionIds[indexImg])
  }, [indexImg])

  const actionBack = () => {
    window.location.replace("/")
  }

  const actionDownloadFileExcel = () => {
    fileService.downloadFileExcel(sessionOfImageShowing).then((res: any) => {
      const date = new Date()
      const timestamp = date.toISOString().replace(/[:.]/g, "-")
      const filename = `result-${timestamp}.xlsx`
      FileDownload(res.data, filename)
    })
  }

  const actionSendFeedback = () => {
    setIsEditting(false)
    const formData = form.getFieldsValue()
    feedbackService
      .sendFeedback(sessionOfImageShowing, JSON.stringify(formData))
      .then((res) => {
        if (res) {
          setIsEditting(false)
        }
      })
  }

  return (
    <div style={{ width: "100%" }}>
      <Row style={{ textAlign: "center" }}>
        <Col span={24}>
          <b style={{ fontSize: "28px" }}>Kết quả chuyển đổi ảnh CT thành ảnh PET tương ứng</b>
        </Col>
        {/*<Col span={24}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p style={{ fontSize: "14px", paddingRight: "5px" }}>
              Loại tài liệu:
            </p>
            <b style={{ color: "#3D88E1" }}>
              {textRenderDocumentype[documentType]}
            </b>
          </div>
        </Col>*/}
      </Row>

      <Row style={{ marginTop: "40px" }} gutter={10} className="content-result">
        <Col xs={20} md={18} lg={18} className="content-box">
          <Card
            bodyStyle={{
              paddingTop: valuePaddingCardTopBottom,
              paddingBottom: valuePaddingCardTopBottom,
            }}
            style={{ borderRadius: "8px", zIndex: 1 }}
          >
            <Row justify="center" align="middle">
              <Col span={8}>
                <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 600 }}>
                  <Text>Ảnh CT ban đầu</Text>
                  <ImageDetected imageCheckingUrl={"data:image/png;base64," + imageCheckingUrl?.ct} imageWidth={256} imageHeight={256}/> 
                </div>
              </Col>
              {/* <Col span={8}>
                <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 600 }}>
                  <Text>Ảnh PET tạo bởi BBDM [*]</Text>
                  <ImageDetected imageCheckingUrl={"data:image/png;base64," + imageCheckingUrl?.baseline_pet} imageWidth={256} imageHeight={256} />
                </div>
              </Col> */}
              <Col span={8}>
                <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 600 }}>
                  <Text>Ảnh PET tạo bởi mô hình VAIPE CT2PET</Text>
                  <ImageDetected imageCheckingUrl={"data:image/png;base64," + imageCheckingUrl?.proposed_pet} imageWidth={256} imageHeight={256} />
                </div>
              </Col>
            </Row>
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                alignItems: "center",
              }}
            >
              <Button
                type="primary"
                style={{
                  borderRadius: "1000px",
                  padding: "13px 49px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  background: "#3D88E1",
                  color: "#fff",
                  lineHeight: "21px",
                  height: "48px",
                  zIndex: 1,
                }}
                onClick={actionBack}
              >
                Quay lại
              </Button>
            </div>
          </Card>
        </Col>
        {/* <Col md={18} lg={18} className="content-box">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "32px",
              textAlign: "center",
              fontSize: "12px",
              fontWeight: 600
            }}
          >
            <a href="https://arxiv.org/abs/2205.07680">
              [*] Bo Li, Kaitao Xue, Bin Liu and Yu-Kun Lai. BBDM: Image-to-image Translation with Brownian Bridge Diffusion Models (CVPR 2023)
            </a> 
          </div>
        </Col> */}
        {/*<Col xs={20} md={18} lg={12} className="content-box">
          <Row>
            <Card
              bodyStyle={{
                paddingTop: valuePaddingCardTopBottom,
              }}
              style={{
                borderRadius: "8px",
                zIndex: 1,
                overflow: "auto",
                width: "95%",
              }}
              className="card_table_result"
            >
              <TableResult
                documentType={documentType}
                isEditting={isEditting}
                form={form}
                data={dataProcessed[indexImg]}
              />
            </Card>
          </Row>

          <Row
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "30px",
            }}
          >
            <Button
              type="primary"
              style={{
                borderRadius: "1000px",
                padding: "13px 49px",
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                background: "#3D88E1",
                color: "#fff",
                lineHeight: "21px",
                height: "48px",
                zIndex: 1,
              }}
              onClick={actionBack}
            >
              Quay lại
            </Button>

            <Button
              type="primary"
              style={{
                borderRadius: "1000px",
                padding: "13px 49px",
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                background: "#3D88E1",
                color: "#fff",
                lineHeight: "21px",
                height: "48px",
                zIndex: 1,
              }}
              onClick={actionDownloadFileExcel}
            >
              <img src="/download.png" alt="" style={{ marginRight: "8px" }} />
              Tải xuống kết quả
            </Button>

            {isEditting ? (
              <Button
                type="primary"
                style={{
                  borderRadius: "1000px",
                  padding: "13px 49px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  background: "#3D88E1",
                  color: "#fff",
                  lineHeight: "21px",
                  height: "48px",
                  zIndex: 1,
                }}
                onClick={actionSendFeedback}
              >
                Gửi kết quả
              </Button>
            ) : (
              <Button
                type="primary"
                style={{
                  borderRadius: "1000px",
                  padding: "13px 49px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  background: "#3D88E1",
                  color: "#fff",
                  lineHeight: "21px",
                  height: "48px",
                  zIndex: 1,
                }}
                onClick={() => setIsEditting(true)}
              >
                Chỉnh sửa lại kết quả
              </Button>
              )
          </Row>
        </Col>*/}
      </Row>
      {contextHolder}
    </div>
  )
}

export default Result
