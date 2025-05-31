import * as d3 from 'd3'
export const name = 'Quick Sort';
export const description = 'Divide and conquer algorithm'

const width = 600;
const height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const x = d3
  .scaleBand()
  .domain(data.map((d, i) => i))
  .range([margin.left, width - margin.right])
  .padding(0.1);

const xAxis = d3.axisBottom(x).tickSizeOuter(0);

const y = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .nice()
  .range([height - margin.bottom, margin.top]);

const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("margin", "auto")
  .style("display", "block");

// Define the linear gradient
const gradient = svg
  .append("defs")
  .append("linearGradient")
  .attr("id", "gradient")
  .attr("x1", "0%")
  .attr("y1", "0%")
  .attr("x2", "0%")
  .attr("y2", "100%");

gradient
  .append("stop")
  .attr("offset", "0%")
  .style("stop-color", "darkviolet");

gradient
  .append("stop")
  .attr("offset", "100%")
  .style("stop-color", "white");

const bars = svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d, i) => x(i))
  .attr("y", (d) => y(d))
  .attr("width", x.bandwidth())
  .attr("height", (d) => height - margin.bottom - y(d))
  .style("fill", function (d) {
    const normalizedValue = d / d3.max(data);
    const intensity = Math.round(255 * (1 - normalizedValue));
    return `rgb(${intensity}, 0, ${intensity})`;
  });

const labels = svg
  .selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .attr("class", "label")
  .attr("x", (d, i) => x(i) + x.bandwidth() / 2)
  .attr("y", (d) => y(d) - 5)
  .text((d) => d);

svg
  .append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(xAxis);
svg
  .append("text")
  .attr("x", 400)
  .attr("y", 40)
  .attr("text-anchor", "middle")
  .style("font-size", "20px");

function updateChart(newData) {
  bars
    .data(newData)
    .attr("x", (d, i) => x(i))
    .attr("y", (d) => y(d))
    .attr("height", (d) => height - margin.bottom - y(d))
    .style("fill", function (d) {
      const normalizedValue = d / d3.max(newData);
      const intensity = Math.round(255 * (1 - normalizedValue));
      return `rgb(${intensity}, 0, ${intensity})`;
    });

  labels
    .data(newData)
    .attr("x", (d, i) => x(i) + x.bandwidth() / 2)
    .attr("y", (d) => y(d) - 5)
    .text((d) => d);
}

async function swap(i, j) {
  const transition = d3.transition().duration(800);

  bars
    .transition(transition)
    .attr("x", (d, k) => {
      if (k === i) return x(j);
      if (k === j) return x(i);
      return x(k);
    })
    .style("opacity", (d, k) => (k === i || k === j ? 0.5 : 1));

  await new Promise((resolve) => setTimeout(resolve, 800));

  bars
    .transition()
    .duration(0)
    .attr("x", (d, k) => x(k))
    .style("opacity", 1);
}

async function quickSort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) return;

  const pivotIndex = await partition(arr, start, end);
  await quickSort(arr, start, pivotIndex - 1);
  await quickSort(arr, pivotIndex + 1, end);
}

async function partition(arr, start, end) {
  const pivotValue = arr[end];
  let pivotIndex = start;

  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(i, pivotIndex);
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      pivotIndex++;
      updateChart(arr);
    }
  }

  await swap(pivotIndex, end);
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  updateChart(arr);

  return pivotIndex;
}

quickSort(data);