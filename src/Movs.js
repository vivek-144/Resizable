import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRef, useState } from "react";
import Resize from './Resize.js';
import ReactEcharts from "echarts-for-react";
import pie from './pie.js';
import { Resizable, ResizableBox } from "react-resizable";

// Style
const MainWrapper = {
  background: "black",
  width: "100%",
  height: "100vh",
  position: "relative"
};

const InputWrapper = {
  position: "fixed",
  zIndex: 9999,

};

const ScaleIndicator = {
  textAlign: "right",
  position: "absolute",
  right: "40px",
  background: "blue",
  color: "white",
  zIndex: "1000",
  padding: "10px"
};

const Slider = {
  width: "200px",
  margin: "10px 30px"
};

export default function Movs() {
  const transformComponentRef = useRef(null);
  const [scale, setScale] = useState(0.7);

  const updateScale = (e) => {
    const targetScale = parseFloat(e.target.value);
    const factor = Math.log(targetScale / scale);
    const { zoomIn, zoomOut } = transformComponentRef.current;

    

    if (targetScale > scale) {
      zoomIn(factor, 0);
    } else {
      zoomOut(-factor, 0);
    }

    setScale(targetScale);
  };

  return (
    <div style={MainWrapper}>
      <h1 style={ScaleIndicator}>{(scale * 100).toFixed(0)}%</h1>
      <div style={InputWrapper}>
        <input
          type="range"
          min="0.1"
          max="1.5"
          step="0.01"
          value={scale}
          onChange={updateScale}
          style={Slider}
        />
      </div>
      <TransformWrapper
        ref={transformComponentRef}
        onZoomStop={(e) => {
          setScale(e.state.scale);
        }}
        initialScale={scale}
        minScale={0.1}
        maxScale={1.5}
        doubleClick={{
          disabled: true
        }}
        // wheel={{
        //   activationKeys: ["z"]
        // }}
        // panning={{
        //   activationKeys: ["x"],
        // }}
        limitToBounds={true}
        zoomAnimation={{ disabled: true }}
        centerOnInit
        onZoom={(e) => {
          setScale(e.state.scale);
        }}
      >
        {({ zoomIn, zoomOut, setTransform, ...rest }) => {
          return (
            <TransformComponent
              wrapperStyle={{
                width: "100vw",
                height: "100vh"
              }}
            >
              <Resize   />
            </TransformComponent>
          );
        }}
      </TransformWrapper>
    </div>
  );
}
