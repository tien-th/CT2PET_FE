import { Card, Col, Row } from "antd"
import React, { useState, useEffect } from "react"
interface Props {
  completed: number
  contextHolder: any
}

const ProgressBar = (props: Props) => {
  const { completed, contextHolder } = props
  const valuePaddingCardTopBottom = "100px"
  const containerStyles = {
    height: 20,
    backgroundColor: "#e0e0de",
    borderRadius: 6,
    marginTop: "10px",
  }

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "#3D88E1",
    borderRadius: "inherit",
    transition: "width 0.5s ease-in-out", // Add this line
    // textAlign: "right",
  }

  const labelStyles = {
    padding: 5,
    color: "white",
    // fontWeight: "bold",
  }

  return (
    <>
      <div>
        <Row style={{ textAlign: "center" }}>
          <Col span={24}>
            <b
              style={{
                fontSize: "28px",
                fontWeight: 600,
                lineHeight: "42px",
              }}
            >
              Đang xử lý...
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
              Hệ thống đang xử lý dữ liệu, xin đợi trong giây lát!
            </p>
          </Col>
        </Row>

        <Row style={{ marginTop: "80px", height: "300px" }}>
          <Col span={24}>
            <Card
              bodyStyle={{
                paddingTop: valuePaddingCardTopBottom,
                paddingBottom: valuePaddingCardTopBottom,
              }}
              style={{ borderRadius: "8px", zIndex: 1 }}
            >
              {/* <Progress percent={30} /> */}
              <div style={{ textAlign: "center" }}>
                <b style={{ color: "#3D88E1" }}>{completed}%</b>
              </div>
              <div style={containerStyles}>
                <div style={fillerStyles}>
                  <span style={labelStyles}></span>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <b>0%</b>
                <b>100%</b>
              </div>
            </Card>
          </Col>
        </Row>
        {contextHolder}
      </div>
    </>
  )
}

export default ProgressBar
