import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';

import { getEntitiesInCaseList, getHoverRowNo } from '../../../model/selectors/cases';
import { getEntityScore } from '../../../model/selectors/entities';
import { getEntitiesInCaseListAction } from '../../../model/actions/cases';
import { getEntityPredictionScoreAction } from '../../../model/actions/entities';

import '../styles/LineChart.scss';

const margin = 50;
const circleOpacity = '0.85';
const circleRadius = 3;

const LineChart = ({ width, height, data }) => {
  const ref = useRef(null);

  const drawChart = () => {
    const calcWidth = `${width + margin}px`;
    const calcHeight = `${height + margin}px`;

    const svg = d3
      .select(ref.current)
      .attr('width', calcWidth)
      .attr('height', calcHeight)
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    //xScale

    const xScale = d3
      .scaleLinear()
      .domain([1, data[0].values.length - 1])
      .range([0, width - margin]);

    //yScale

    const maxY = d3.max(data[0].values.map((coord) => coord.y)) + 2;

    const yScale = d3
      .scaleLinear()
      .domain([0, maxY])
      .range([height - margin, 0]);

    //xAxis

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
      .text('Risk Category');

    //yAxis

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

    // add grid background

    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', 'translate(0,' + (height - margin) + ')')
      .call(xAxis.tickSize(-(height - margin), 0, 0).tickFormat(''));

    svg
      .append('g')
      .attr('class', 'grid')
      .call(yAxis.tickSize(-(width - margin), 0, 0).tickFormat(''));

    //add chartLine

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    let lines = svg.append('g').attr('class', 'lines');

    // add path

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

    // add circles

    lines
      .selectAll('circle-group')
      .data(data)
      .enter()
      .append('g')
      .style('fill', '#383F67')
      .selectAll('circle')
      .data((d) => d.values)
      .enter()
      .append('g')
      .attr('class', 'circle')
      .append('circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', circleRadius)
      .style('opacity', circleOpacity);

    //add data point text

    lines
      .selectAll('.circle')
      .append('text')
      .attr('class', 'text')
      .attr('fill', '#383F67')
      .attr('opacity', 0.6)
      .attr('font-size', '12px')
      .text((d) => `${d.y}%`)
      .attr('x', (d) => xScale(d.x) - 10)
      .attr('y', (d) => yScale(d.y) - 15);
  };

  useEffect(drawChart, []);

  return (
    <div className="lineChart">
      <svg ref={ref}></svg>
    </div>
  );
};

export default connect(
  (state) => ({
    entitiesInCaseList: getEntitiesInCaseList(state),
    entityScore: getEntityScore(state),
    hoveredRow: getHoverRowNo(state),
  }),
  (dispatch) => ({
    getCurrentEntitiesInCase: () => dispatch(getEntitiesInCaseListAction()),
    loadPredictionScore: () => dispatch(getEntityPredictionScoreAction()),
  }),
)(LineChart);
