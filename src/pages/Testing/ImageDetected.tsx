import React, { useState, useEffect, useMemo } from "react"
import { Image, Layer, Rect, Stage, Text } from "react-konva"
interface Props {
  imageCheckingUrl: any
  imageWidth: any
  imageHeight: any
}
const recOfPresription = [
  { x: 121.65253572511656, y: 95, width: 17.0073459131076, height: 11 },
  { x: 169.67327712683212, y: 91, width: 41.017716613965376, height: 15 },
  { x: 245.70611767954844, y: 95, width: 23.009938588322058, height: 12 },
  { x: 272.71778471801343, y: 97, width: 36.015556051286694, height: 12 },
  { x: 324.740254569872, y: 99, width: 31.013395488607955, height: 12 },
  { x: 377.7631565342663, y: 101, width: 35.01512393875089, height: 12 },
  { x: 425.7838979359818, y: 105, width: 60.02592675214447, height: 12 },
  { x: 130.65642473793824, y: 109, width: 9.003889012821645, height: 10 },
  { x: 153.66636332626027, y: 108, width: 72.03111210257336, height: 10 },
  { x: 247.7069819046199, y: 110, width: 23.00993858832203, height: 10 },
  { x: 283.7225379559066, y: 111, width: 14.006049575500356, height: 10 },
  { x: 323.73982245733623, y: 113, width: 31.013395488607955, height: 10 },
  { x: 377.7631565342663, y: 115, width: 34.01469182621514, height: 11 },
  { x: 127.65512840033101, y: 121, width: 14.00604957550037, height: 10 },
  { x: 170.67370923936787, y: 119, width: 42.018148726501124, height: 10 },
  { x: 247.7069819046199, y: 120, width: 18.007778025643347, height: 10 },
  { x: 280.72124161829936, y: 123, width: 18.007778025643347, height: 8 },
  { x: 325.7406866824077, y: 125, width: 27.01166703846502, height: 8 },
  { x: 379.7640207593377, y: 126, width: 33.01425971367945, height: 10 },
  { x: 129.6559926254025, y: 135, width: 8.003456900285926, height: 10 },
  { x: 138.65988163822416, y: 129, width: 104.04493970371706, height: 19 },
  { x: 245.70611767954844, y: 132, width: 22.00950647578631, height: 15 },
  { x: 284.72297006844235, y: 134, width: 11.004753237893112, height: 13 },
  { x: 327.7415509074792, y: 137, width: 24.010370700857777, height: 12 },
  { x: 383.7657492094807, y: 141, width: 29.01253126353646, height: 11 },
  { x: 128.65556051286674, y: 148, width: 6.0025926752144585, height: 9 },
  { x: 144.6624743134386, y: 149, width: 89.03845801568096, height: 9 },
  { x: 246.7065497920842, y: 150, width: 20.008642250714814, height: 10 },
  { x: 284.72297006844235, y: 153, width: 13.005617462964608, height: 9 },
  { x: 323.73982245733623, y: 152, width: 30.012963376072207, height: 10 },
  { x: 384.76618132201645, y: 155, width: 25.010802813393525, height: 10 },
  { x: 123.65339995018805, y: 158, width: 12.005185350428874, height: 11 },
  { x: 155.66722755133176, y: 158, width: 65.02808731482315, height: 11 },
  { x: 242.70482134194123, y: 159, width: 28.01209915100071, height: 12 },
  { x: 284.72297006844235, y: 162, width: 10.004321125357421, height: 9 },
  { x: 323.73982245733623, y: 162, width: 32.0138276011437, height: 11 },
  { x: 381.7648849844092, y: 165, width: 30.012963376072207, height: 10 },
  { x: 123.65339995018805, y: 170, width: 11.004753237893155, height: 9 },
  { x: 141.66117797583138, y: 169, width: 95.04105069089539, height: 12 },
  { x: 245.70611767954844, y: 170, width: 20.008642250714814, height: 13 },
  { x: 280.72124161829936, y: 174, width: 15.006481688036104, height: 9 },
  { x: 322.7393903448005, y: 174, width: 36.015556051286694, height: 11 },
  { x: 381.7648849844092, y: 176, width: 34.0146918262152, height: 11 },
]

const recOfOtherDocument = [
  { x: 157.60000610351562, y: 29.800003051757812, width: 89, height: 36 },
  { x: 250.60000610351562, y: 37.80000305175781, width: 95, height: 22 },
  { x: 145.60000610351562, y: 100.80000305175781, width: 224, height: 45 },
  { x: 60.600006103515625, y: 152.8000030517578, width: 390, height: 46 },
  { x: 167.60000610351562, y: 236.79999923706055, width: 182, height: 26 },
]

const ImageDetected = (props: Props) => {
  const { imageCheckingUrl, imageWidth, imageHeight } = props

  const defaultRecDraw = [
    { x: 157.60000610351562, y: 29.800003051757812, width: 89, height: 36 },
    { x: 250.60000610351562, y: 37.80000305175781, width: 95, height: 22 },
    { x: 145.60000610351562, y: 100.80000305175781, width: 224, height: 45 },
    { x: 60.600006103515625, y: 152.8000030517578, width: 390, height: 46 },
    { x: 167.60000610351562, y: 236.79999923706055, width: 182, height: 26 },
  ]
  const documentType = localStorage.getItem("documentType")
  // const [rectangles, setRectangles] =
  //   useState<{ x: number; y: number; width: number; height: number }[]>(
  //     defaultRecDraw,
  //   )
  let rectangles = defaultRecDraw

  const textOfPrescription = "Đơn thuốc"
  const textOfOtherDoc = "Khác"
  const isDetectPresription = documentType === textOfPrescription
  if (isDetectPresription) {
    if (recOfPresription) {
      // setRectangles(recOfPresription)
      rectangles = recOfPresription
    }
  }
  if (documentType === textOfOtherDoc) {
    if (recOfOtherDocument) {
      // setRectangles(recOfOtherDocument)
      rectangles = recOfOtherDocument
    }
  }

  const [sizeOfStage, setSizeOfStage] = useState({ width: 0, height: 0 })
  const [imageUrl, setImageUrl] = useState("")
  useEffect(() => {
    const imageUrlLocateInStorage = localStorage.getItem("imageUrl")
    if (!imageUrlLocateInStorage) {
      return
    }
    setImageUrl(imageUrlLocateInStorage)
  }, [])
  const imageElement = useMemo(() => {
    const element = new window.Image()
    element.src = imageCheckingUrl
    element.width = imageWidth
    element.height = imageHeight
    return element
  }, [imageCheckingUrl])

  useEffect(() => {
    if (imageElement) {
      const { width, height } = imageElement
      setSizeOfStage({ width, height })
    }
  }, [imageElement])

  return (
    <div className="image-detected">
      <Stage
        height={sizeOfStage.height}
        width={sizeOfStage.width}
        style={{
          display: "flex",
          justifyContent: "center",
          zIndex: 1,
          width: "100%",
        }}
      >
        <Layer>
          <Image image={imageElement} />
          {/* {rectangles.map((value, indexOfRec) => {
            return (
              <>
                <Rect
                  x={value.x}
                  y={value.y}
                  width={value.width}
                  height={value.height}
                  fill="transparent"
                  stroke="red"
                />

                {!isDetectPresription && (
                  <>
                    <Rect
                      x={value.x + value.width - 13}
                      y={value.y}
                      width={13} // Width of the mini square
                      height={13} // Height of the mini square
                      fill="red" // Fill color of the mini square
                    />
                    <Text
                      x={value.x + value.width - 10}
                      y={value.y}
                      text={`${indexOfRec + 1}`}
                      fontSize={14} // Font size of the text
                      fill="white" // Fill color of the text
                    />
                  </>
                )}
              </>
            )
          })} */}
        </Layer>
      </Stage>
    </div>
  )
}

export default ImageDetected
