import React, {Component} from "react";
import * as d3 from "d3";

class Box extends Component {
    //To Do: draw the bars to test.
    componentDidUpdate() {
        let data = [20, 46, 88, 110, 22, 1, 16, 109, 21]

        const margin = {top: 20, right: 20, bottom: 30, left: 40},
            w = 900 - margin.left - margin.right,
            h = 600 - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .domain(data.map((d, i) => i))
            .range([margin.left, w - margin.right])
            .padding(0.1);
        
        const xAxis = d3.axisBottom(x).tickSizeOuter(0);
        
        const y = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .nice()
            .range([h - margin.bottom, margin.top]);

        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .style("margin", "auto")
            .style("display", "block");
        
        const bars = svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => x(i))
            .attr("y", (d) => y(d))
            .attr("width", x.bandwidth())
            .attr("height", (d) => h - margin.bottom - y(d))
            .style("fill", "blue");
        
        svg.append("g")
            .attr("transform", `translate(0,${h - margin.bottom})`)
            .call(xAxis);
    }

    render() {
        return (
            <div id="container">
                <div className="title">Visualization</div>
                <div id="chart"></div>
            </div>
        )
    }
}

export default Box;