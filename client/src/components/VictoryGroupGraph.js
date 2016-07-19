import React from "react"
import { VictoryChart, VictoryGroup, VictoryBar } from "victory"

export default class VictoryGroupGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 }
        ],
        [
          { x: 1, y: 2 },
          { x: 2, y: 1 },
          { x: 3, y: 1 }
        ],
        [
          { x: 1, y: 3 },
          { x: 2, y: 4 },
          { x: 3, y: 2 }
        ]
      ]
    }
    console.log(this.state)
  }

  componentDidMount() {
    /* setInterval(() => {
      this.setState({
        data: this.getData(),
      });
    }, 750);
    */
  }

  getData() {
    const i = Math.floor(Math.random() * (3 - 0))
    const j = Math.floor(Math.random() * (3 - 0))
    this.state.data[i][j] = { x: this.state.data[i][j].x, y: 1 }
    return this.state.data
  }

  render() {
    return (
      <VictoryChart
        height={500}
        domainPadding={{ x: 50 }}
      >
        <VictoryGroup
          height={600}
          offset={15}
          colorScale={"qualitative"}
          animate={{
            duration: 500,
            onExit: {
              duration: 1000,
              before: () => ({ y: - 1 })
            }
          }}
        >
          {this.state.data.map((data, i) => (
            <VictoryBar
              data={data} key={i}
            />
          ))}
        </VictoryGroup>
      </VictoryChart>
    )
  }
}

