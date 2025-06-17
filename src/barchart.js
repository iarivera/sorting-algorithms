import React, {Component} from "react";
import { data } from "./settings/data"
import bubbleSort from './settings/bubbleSort';
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

        container.selectAll(".x_axis_g").data([0]).join('g')
            .attr("class", 'x_axis_g')
            .attr("transform", `translate(30, ${height})`)
            .call(d3.axisBottom(x_scale))
        
        // y-axis
        const y_scale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height]);


        container.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => x_scale(i))
            .attr("y", function(d) { return height - d;})
            .attr("width", x_scale.bandwidth())
            .attr("height", function(d) { return d; })
            .attr("fill", "blue")
            .attr("transform", `translate(30,0)`);

        async function swap(i, j) {
            const transition = d3.transition().duration(400);

            container.transition(transition)
                .attr("x", (d, k) => {
                    if (k === i) return x_scale(j);
                    if (k === j) return x_scale(i);
                    return x_scale(k);
                })
                .style("opacity", (d,k) => (k === i || k === j ? 0.5 : 1));

            await new Promise((resolve) => setTimeout(resolve, 400));
            
            container.transition()
                .duration(0)
                .attr("x", (d, k) => x_scale(k))
                .style("opacity", 1);
        }

        bubbleSort(data);
    }

    render() {
        return (
            <div className="title">
                <svg className="barchart_svg">
                    <g className="chart_g"></g>
                </svg>
            </div>
        )
    }
}

export default Barchart;