/* global d3 b:true */
/* eslint quote-props: ["error", "consistent"] */
import Immutable from 'immutable';

export default class D3Chart {
  constructor(element, data) {
    const margin = Immutable.fromJS(
      {
        top: 30,
        right: 10,
        bottom: 30,
        left: 30,
      }
    );

    const widthGraph = 800 - margin.get('top') - margin.get('bottom');
    const heightGraph = 800 - margin.get('left') - margin.get('right');

    const max = d3.max(data, (d) => d.value);

    const yScale = d3.scale.linear()
      .domain([0, max])
      .range([0, heightGraph]);

    const xScale = d3.scale.ordinal()
      .domain(d3.range(0, data.length + 10))
      .rangeBands([margin.get('left') + 5, widthGraph]);

    const colors = d3.scale.linear()
      .domain([0, data.length * 0.33, data.length * 0.66, data.length])
      .range(['#91cbe0', '#79abba', '#608694', '#374c54']);

    let dynamicColor;

    const chart = d3.select(`.${element}`)
      .attr('width', widthGraph + margin.get('left') + margin.get('right'))
      .attr('height', heightGraph + margin.get('top') + margin.get('bottom'))
      .style('background', '#bce8f1')
      .append('g')
      .attr('transform', `translate(${margin.get('left')},${margin.get('top')})`)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .style(
      {
        'fill': (d, i) => colors(i),
        'stroke': '#37808f',
        'stroke-width': 2,
      }
      )
      .attr('id', (d, i) => data[i].name)
      .attr('width', xScale.rangeBand())
      .attr('height', (d) => yScale(d.value))
      .attr('x', (d, i) => xScale(i))
      .attr('y', (d) => heightGraph - yScale(d.value))
      .on('mouseover', (d) => {
        const selected = document.getElementById(d.name);
        dynamicColor = selected.style.fill;
        d3.select(selected)
          .style('fill', '#F1EF87');
      })
      .on('mouseout', (d) => {
        const selected = document.getElementById(d.name);
        d3.select(selected)
          .style('fill', dynamicColor);
      });

    const verticalGuideScale = d3.scale.linear()
      .domain([0, max])
      .range([heightGraph, 0]);

    const vAxis = d3.svg.axis()
      .scale(verticalGuideScale)
      .orient('left')
      .ticks(10);

    const verticalGuide = d3.select('svg')
      .append('g');

    vAxis(verticalGuide);

    verticalGuide.attr('transform', `translate(${margin.get('left') + 20},${margin.get('top')} )`)
      .selectAll('path')
        .style({ fill: 'none', stroke: '#3c763d' })
      .selectAll('line')
        .style({ stroke: '#3c763d' });

    const hAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .ticks(data.length);

    const horizontalGuide = d3.select('svg')
      .append('g');

    hAxis(horizontalGuide);

    horizontalGuide.attr('transform',
      `translate(${margin.get('left')}, ${heightGraph + margin.get('top')})`)
      .selectAll('path')
        .style({ fill: 'none', stroke: '#3c763d' })
      .selectAll('line')
        .style({ stroke: '#3c763d' });
  }
}
