import React, { useState, useEffect } from "react"
import { notification } from "antd"
import ProgressBar from "./ProcessBarLine"
import Result from "../Result"
import FileService from "../../utils/services/file.service"
interface Props {
  location: {
    state: {
      files: any[]
    }
  }
}

const Processing = (props: Props) => {
  const { location: propsLocation } = props

  if (!propsLocation.state) {
    window.location.replace("/")
  }

  const { files } = propsLocation.state
  console.log("🚀 ~ file: index.tsx:17 ~ Processing ~ files:", files)
  const [listFileImageUrl, setListFileImageUrl] = useState<any[]>([])

  const [completed, setCompleted] = useState(0)
  const fileService = new FileService()
  const valuePaddingCardTopBottom = "100px"
  const documentType = localStorage.getItem("documentType") ?? "prescription"

  const [showResult, setShowResult] = useState(false)
  const [resultRender, setResultRender] = useState<any[]>([])
  const [apiNotification, contextHolder] = notification.useNotification()
  const close = () => {
    window.location.replace("/")
  }

  const openNotificationWithIcon = (message: string) => {
    apiNotification["error"]({
      message:
        "Đã có lỗi trong quá trình sử dụng. Hệ thông sẽ tự động chuyển về trang chủ trong giây lát",
      description: message,
      onClose: close,
    })
  }

  useEffect(() => {
    const getResultDetect = async () => {
      Promise.all(
        files.map((file) => {
          const reader = new FileReader()
          reader.readAsDataURL(file.originFileObj)
          reader.onload = () => {
            setListFileImageUrl((prev) => [...prev, reader.result])
          }
          const result = fileService.uploadImage(
            file.originFileObj,
            documentType,
          )
          return result
        }),
      )
        .then((allResult) => {
          setCompleted(100)
          setShowResult(true)
          setResultRender(allResult)
        })
        .catch((err) => {
          console.log("🚀 ~ file: index.tsx:62 ~ getResultDetect ~ err:", err)
          //openNotificationWithIcon(err.message)
        })
    }
    getResultDetect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCompleted((prevCompleted) => {
        if (prevCompleted >= 90) {
          clearInterval(timer)
          return 90
        }
        return prevCompleted + 10
      })
    }, 500) // Increase every 10 seconds

    // Clean up the interval on unmount
    return () => clearInterval(timer)
  }, [])

  const actionSetShowResult = () => setShowResult(true)
  if (
    showResult &&
    resultRender.length === files.length &&
    listFileImageUrl.length === files.length
  ) {
    return (
      <Result
        files={files}
        actionSetShowResult={actionSetShowResult}
        resultRender={resultRender}
        listFileImageUrl={listFileImageUrl}
        contextHolder={contextHolder}
      />
    )
  } else {
    return (
      <>
        <ProgressBar completed={completed} contextHolder={contextHolder} />
      </>
    )
  }
}

export default Processing
