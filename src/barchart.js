import React, {Component} from "react";
import { data } from "./data"
import * as d3 from "d3";

class Barchart extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.renderChart();
    }

    componentDidUpdate() {
        this.renderChart();
    }

    //To Do: draw the bars to test.
    renderChart() {
        var data = this.props.data

        //margins
        const margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 900 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        const container = d3.select(".barchart_svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .select(".chart_g")
            .attr("transfrom", `translate(${margin.left}, ${margin.top})`);
        
        // x-axis
        const x_scale = d3.scaleBand()
            .domain(data.map((d,i) => i))
            .range([margin.left, width - margin.right])
            .padding(0.1)

        const x_axis = d3.axisBottom(x_scale).tickSizeOuter(0);

        container.selectAll(".x_axis_g").data([0]).join('g')
            .attr("class", 'x_axis_g')
            .attr("transform", `translate(30, ${height})`)
            .call(d3.axisBottom(x_scale))
        
        // y-axis
        const y_scale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([height, 0]);


        container.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => x_scale(i))
            .attr("width", x_scale.bandwidth())
            .attr("fill", "blue")
            .attr("height", (d) => height - y_scale(d))
            .attr("transform", `translate(75,500)`)
        
        
    }

    render() {
        return (
            <div className="title">Visualization
                <svg className="barchart_svg">
                    <g className="chart_g"></g>
                </svg>
            </div>
        )
    }
}

export default Barchart;