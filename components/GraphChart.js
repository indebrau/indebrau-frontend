import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { renderDate, parseSensorValue } from '../lib/utils';

class GraphChart extends Component {
  render() {
    var renderData = this.props.data.map((dataPoint) => ({
      time: renderDate(dataPoint.time),
      value: parseSensorValue(dataPoint.value, false),
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
