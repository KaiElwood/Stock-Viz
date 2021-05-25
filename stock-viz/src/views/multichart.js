import React from "react"
import * as d3 from 'd3'

// set a spacing variable for the graph
const spacing = 40;

const MultiChart = ({ data, dimensions = {} }) => {

    // console.log(d3.csv(data))
    console.log('hello is this on')

    console.log(dimensions);

    const svgRef = React.useRef(null);
    const { width, height, margin = {} } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    // update scales
    React.useEffect(() => {

        // set up scale for time frame of the data
        const xScale = d3.scaleTime()
            .domain(d3.extent(data, d => new Date(d.Date)))
            .range([0, width])
        const yScale = d3.scaleLinear()
            .domain([
                d3.min(data, d => d.Close) - spacing,
                d3.max(data, d => d.Close) + spacing,
            ])
            .range([height, 0])

        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
        const svg = svgEl
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);


        // now to set the scale
        const xAxis = d3.axisBottom(xScale)
            .ticks(10)
            .tickSize(-height - spacing + margin.bottom)

        const XAxisGroup = svg.append('g')
            .attr("transform", `translate(0, ${height + spacing - margin.bottom})`)
            .attr("class", "XAxis")
            .call(xAxis);

        XAxisGroup.select(".domain").remove();

        const yAxis = d3.axisLeft(yScale)
            .ticks(5)
            .tickSize(-width);

        const yAxisGroup = svg.append("g")
            .attr("class", "XAxis")
            // .attr("class", "yAxis")
            .call(yAxis);
        yAxisGroup.select(".domain").remove();

            // Draw the lines
            const line = d3
                .line()
                .x((d) => xScale(d.Date))
                .y((d) => yScale(d.Close));

            svg.selectAll(".line")
                .data(data)
                .enter()
                .append("path")
                .attr("fill", "none")
                .attr("stroke", "green")
                .attr("stroke-width", 3)
                .attr("d", line(data));

        }, [data]); // Redraw chart if data changes
        
    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export default MultiChart;