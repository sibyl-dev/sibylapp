import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';

import { getScoreRowId } from '../../../model/selectors/cases';

import '../styles/LineChart.scss';

const margin = 50;

const LineChart = ({ width, height, data, rowId }) => {
  const ref = useRef(null);

  const memoDrawChart = useCallback(() => {
    const calcWidth = `${width + margin}px`;
    const calcHeight = `${height + margin}px`;

    const tempSvg = d3.select(ref.current);

    tempSvg.selectAll('*').remove();

    const svg = d3
      .select(ref.current)
      .attr('width', calcWidth)
      .attr('height', calcHeight)
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3
      .scaleLinear()
      .domain([1, data[0].values.length])
      .range([0, width - margin]);

    const maxY = d3.max(data[0].values.map((coord) => coord.y)) + 2;

    const yScale = d3
      .scaleLinear()
      .domain([0, maxY])
      .range([height - margin, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(20).tickSize(0);

    svg
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', `translate(0, ${height - margin})`)
      .call(xAxis)
      .append('text')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('fill', '#4F4F4F')
      .attr('font-size', '14px')
      .style('text-anchor', 'middle')
      .text('Risk Score');

    const yAxis = d3
      .axisLeft(yScale)
      .ticks(10)
      .tickSize(0)
      .tickFormat((d) => (d === 0 ? null : `${d}%`));

    svg
      .append('g')
      .attr('class', 'yAxis')
      .call(yAxis)
      .append('text')
      .attr('x', 0 - (height - margin) / 2)
      .attr('y', -40)
      .style('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr('fill', '#4F4F4F')
      .attr('font-size', '14px')
      .text('Placement Rates (%)');

    svg
      .append('g')
      .attr('class', 'chartTitle')
      .attr('transform', `translate(-${margin - 10}, -32)`)
      .append('text')
      .text('Placement Rates by Risk Score')
      .attr('fill', '#4F4F4F')
      .attr('font-size', '16px')
      .attr('font-weight', '500');

    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0, ${height - margin})`)
      .call(xAxis.tickSize(-`${height - margin}`, 0, 0).tickFormat(''));

    svg
      .append('g')
      .attr('class', 'grid')
      .call(yAxis.tickSize(-`${width - margin}`, 0, 0).tickFormat(''));

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    let lines = svg.append('g').attr('class', 'lines');

    lines
      .selectAll('.line-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'line-group')
      .append('path')
      .attr('class', 'line')
      .attr('d', (d) => line(d.values))
      .style('stroke', '#383F67')
      .style('fill', 'none');

    lines
      .selectAll('.data-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'data-group')
      .selectAll('.point')
      .data((d) => d.values)
      .enter()
      .append('g')
      .attr('class', 'point')
      .append('circle')
      .attr('class', 'circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y));

    lines
      .selectAll('.point')
      .append('text')
      .attr('class', 'text')
      .attr('font-size', '12px')
      .attr('id', (d) => d.id)
      .text((d) => `${d.y}%`)
      .attr('x', (d) => xScale(d.x) - 22)
      .attr('y', (d) => yScale(d.y) - 10);

    lines
      .selectAll('.text')
      .attr('fill', (d, i, nodes) =>
        rowId === d.id ? d3.select(nodes[i]).classed('hover', true) : 'rgba(56, 63, 103, 0.6)',
      );

    lines
      .selectAll('.circle')
      .style('fill', (d, i, nodes) => (rowId === d.id ? d3.select(nodes[i]).classed('hover', true) : '#383F67'));

    lines.selectAll('.circle').attr('r', (d) => {
      let circleRadius;

      if (rowId === d.id) {
        circleRadius = 6;
        return circleRadius;
      }
      circleRadius = 3;
      return circleRadius;
    });
  }, [data, height, width, rowId]);

  useEffect(() => {
    memoDrawChart();
  }, [memoDrawChart]);

  return (
    <div className="lineChart">
      <svg ref={ref} />
    </div>
  );
};

export default connect((state) => ({
  rowId: getScoreRowId(state),
}))(LineChart);
