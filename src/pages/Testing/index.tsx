import React, { useState, useEffect } from "react"
import { Card, Row, Col, Button, Typography, Radio, Input, Modal} from "antd"
import type { RadioChangeEvent } from 'antd';
import TestService from "../../utils/services/test.service"
import ImageDetected from "./ImageDetected"
import "./index.scss"

const { Text } = Typography;
const { confirm } = Modal;

interface Props {}

const Testing = (props: Props) => {
  const testService = new TestService()
  const valuePaddingCardTopBottom = "30px"
  const [allImages, setAllImages] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [patientStatus, setPatientStatus] = useState<string>("Không có bệnh")
  const [showInputArea, setShowInputArea] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleRadioChange = (e: RadioChangeEvent) => {
    setPatientStatus(e.target.value);

    if (e.target.value === 'negative') {
      setShowInputArea(true);
    } else {
      setShowInputArea(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const actionBack = async () => {
    let data = {
      'case': allImages?.case,
      'img_id': allImages?.img_id,
      'status': patientStatus,
      'description': inputValue,
    }

    await testService.postCTPETData(data);
    window.location.replace("/test")
  }

  useEffect(() => {
    const getAllImages = async () => {
      await testService.getCTPETData()
      .then((res) => {
        setAllImages(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log("🚀 ~ file: index.tsx:62 ~ getAllImages ~ err:", err)
      })
    }
    getAllImages()
  }, [])

  const showConfirm = () => {
    confirm({
        title: "Xác nhận gửi kết quả",
        content: "Bạn có chắc chắn muốn gửi kết quả và thử lại không?",
        okText: "Đồng ý",
        cancelText: "Hủy",
        onOk() {
          actionBack();
        },
        onCancel() {
          console.log("Hủy");
        },
      });
    };


  return (
    <div style={{ zIndex: 1 }}>
      <Row
        style={{
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Col span={24} xs={20}>
          <Col span={24}>
            <b style={{ fontSize: "26px" }}>Vui lòng chẩn đoán bệnh lý theo các ảnh dưới đây</b>
          </Col>
        </Col>
        <Col style={{ marginTop: "40px" }} span={24} xs={20}>
          <Card
              bodyStyle={{
                paddingTop: valuePaddingCardTopBottom,
                paddingBottom: valuePaddingCardTopBottom,
              }}
              style={{ borderRadius: "8px", zIndex: 1 }}
            >
            {!isLoading && (<>
              <Row justify="center" align="middle">
                <Col span={8}>
                  <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 600 }}>
                    <Text>Ảnh CT</Text>
                    <ImageDetected imageCheckingUrl={"data:image/png;base64," + allImages?.ct} imageWidth={256} imageHeight={256}/> 
                  </div>
                </Col>
                {allImages?.case != 0 && (<Col span={8}>
                  <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 600 }}>
                    <Text>Ảnh PET</Text>
                    <ImageDetected imageCheckingUrl={"data:image/png;base64," + allImages?.pet} imageWidth={256} imageHeight={256} />
                  </div>
                </Col>)}
              </Row>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px",
                  alignItems: "center",
                }}
              >
                <Row>
                  <Col span={24}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <label><b>Tình trạng bệnh nhân:</b></label>
                      <Radio.Group value={patientStatus} onChange={handleRadioChange} style={{ flexGrow: 1 }}>
                        <Radio value="Không có bệnh">Không có bệnh</Radio>
                        <Radio value="Nghi ngờ có bệnh">Nghi ngờ có bệnh</Radio>
                        <Radio value="Có bệnh">Có bệnh</Radio>
                        <Radio value="Không kết luận">Không kết luận</Radio>
                      </Radio.Group>
                    </div>
                  </Col>
                  {/*showInputArea && (
                    <Col span={24} style={{ marginTop: '25px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Input 
                          placeholder="Nhập thông tin thêm..." 
                          value={inputValue} 
                          onChange={handleInputChange}
                        />
                      </div>
                    </Col>
                  )*/}
                  <Col span={24} style={{ marginTop: '22px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <label style={{ marginBottom: '10px' }}><b>Chẩn đoán liên quan:</b></label>
                      <Input 
                        placeholder="Nhập thông tin tại đây..." 
                        value={inputValue} 
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
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
                  //onClick={actionBack}
                  onClick={showConfirm}
                >
                  Gửi kết quả và thử lại
                </Button>
              </div>
            </>)}
            {isLoading && (
              <Row style={{ textAlign: "center" }}>
                <Col span={24}>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      marginTop: "8px",
                      color: "#666666",
                    }}
                  >
                    Hệ thống đang tải dữ liệu...
                  </p>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Testing
