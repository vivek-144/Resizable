import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
 import { Resizable, ResizableBox } from "react-resizable";

import Draggable from 'react-draggable';
import {DraggableCore} from 'react-draggable'; 

class Pie extends Component < {},
  { width: number, height: number }
>{
  getOption = () => ({
  title: {
      text: "Cars",
  
      x: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
   
    
    series: [
      {
        name: "Sales",
        type: "pie",
        radius: "55%",
        center: ["50%", "50%"],
        animationDuration: 5000,
        data: [
          { value: 335, name: "Honda" },
          { value: 310, name: "Audi" },
          { value: 234, name: "BMW" },
          { value: 135, name: "Tata" },
          { value: 1548, name: "Suzuki" }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  });

 
  
  state = { width: 200, height: 200 };

  onClick = () => {
    this.setState({ width: 200, height: 200 });
  };

  onResize = (event, { element, size }) => {
    this.setState({ width: size.width, height: size.height });
  };

  render() {

   const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;


    return (


     <div>
        <button onClick={this.onClick} style={{ marginBottom: "10px" }}>
          Reset to first Position and size
        </button>
        
    
        <div className="layoutRoot">
        
          
          <Resizable
            className="box"
            height={this.state.height}
            width={this.state.width}
            onResize={this.onResize}
          >
            <div
              className="box"
              style={{
                width: this.state.width + "px",
                height: this.state.height + "px"
              }}
            >
           
        <div className="chart">
                <ReactEcharts
        option={this.getOption()}
        style={{
                width: this.state.width + "px",
                height: this.state.height + "px"
              }}
         />
        </div>
           
     
             
            </div>
          </Resizable>
               </div>
                
      </div> 
  
      /*<ReactEcharts
        option={this.getOption()}
        className ="box"
        style={{ height: "200px", width: "200px" }}
      />
      */
    );
  }
}

export default Pie;
