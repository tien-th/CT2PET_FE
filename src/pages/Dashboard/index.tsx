import React from "react"
import { Statistic, Card, Row, Col } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons"

interface Props {}

const Dashboard = (props: Props) => {
  return (
    <div>
      <Row style={{ textAlign: "center" }}>
        <Col span={24}>
          <b
            style={{ fontSize: "28px", fontWeight: 600, lineHeight: "42px" }}
          >
            Trích xuất thông tin tài liệu tự động
          </b>
        </Col>
        <Col span={24}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              marginTop: "8px",
              color: "#666666",
            }}
          >
            (Bóc tách và số hoá tốt nhất trên các văn bản hành chính, hóa đơn,
            giấy tờ nói chung)
          </p>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
