import React from "react"
import { useState } from "react"
import { Modal, Button, Input, Row, Col } from "antd"
import TextArea from "antd/lib/input/TextArea"
import FeedbackService from "../../utils/services/feedback.service"
type Props = {
  isModalVisible: boolean
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  sessionOfImageShowing: string
}

const Feedback = (props: Props) => {
  const {
    isModalVisible,
    setIsModalVisible,
    inputValue,
    setInputValue,
    sessionOfImageShowing,
  } = props

  const feedbackService = new FeedbackService()
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value)
  }

  const sendFeedback = () => {
    const res = feedbackService
      .sendFeedback(inputValue, sessionOfImageShowing)
      .then((res) => {
        console.log("🚀 ~ file: Feedback.tsx:36 ~ .then ~ res:", res)
        if (res) {
          setIsModalVisible(false)
        }
      })
  }

  return (
    <>
      <Modal
        title="Phản hồi"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Row
          style={{
            width: "100%",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Col md={24}>
            <TextArea
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Nhập phản hồi của bạn vào đây"
              autoSize={{ minRows: 3, maxRows: 10 }}
            />
          </Col>
          <Col md={24} style={{ marginTop: "20px" }}>
            <Button type="primary" onClick={sendFeedback}>
              Gửi
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default Feedback
