import numeral from 'numeral';
import Bar from './Bar';
import ChartCard from './ChartCard';
import Field from './Field';
import Gauge from './Gauge';
import MiniBar from './MiniBar';
import MiniProgress from './MiniProgress';
import Pie from './Pie';
import TagCloud from './TagCloud';
import TimelineChart from './TimelineChart';
import WaterWave from './WaterWave';

const yuan = (val) => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  Bar,
  Pie,
  Gauge,
  MiniBar,
  MiniProgress,
  ChartCard,
  Field,
  WaterWave,
  TagCloud,
  TimelineChart,
};
export {
  Charts as default,
  yuan,
  Bar,
  Pie,
  Gauge,
  MiniBar,
  MiniProgress,
  ChartCard,
  Field,
  WaterWave,
  TagCloud,
  TimelineChart,
};
