import { Component } from 'react';
import PropTypes from 'prop-types';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import { renderDate } from '../lib/utils.js';

class GraphChart extends Component {
  render() {
    var renderData = this.props.data.map((dataPoint) => ({
      time: renderDate(dataPoint.time),
      value: dataPoint.value,
    }));
    return (
      <ResponsiveContainer width="99%" height={250}>
        <LineChart
          data={renderData}
          margin={{ top: 5, right: 5, left: -15, bottom: 5 }}
        >
          <XAxis dataKey="time" interval="preserveStartEnd" />
          <YAxis dataKey="value" />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip isAnimationActive={false} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            dot={false}
            activeDot={{ r: 8 }}
            name={this.props.sensorName}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

GraphChart.propTypes = {
  data: PropTypes.array.isRequired,
  sensorName: PropTypes.string.isRequired,
  binary: PropTypes.bool.isRequired,
};

export default GraphChart;
