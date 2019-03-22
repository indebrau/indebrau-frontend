import React, { Component }from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import PropTypes from 'prop-types';

class GraphChart extends Component {
  render() {
    return (
      <ResponsiveContainer width="99%" height={320}>
        <LineChart data={this.props.data}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            dot={false}
            activeDot={{ r: 8 }}
            name={this.props.name}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

GraphChart.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};

export default GraphChart;
