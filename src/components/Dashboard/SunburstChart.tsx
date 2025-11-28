import { ResponsiveSunburst } from '@nivo/sunburst';

interface SunburstChartProps {
  data: any; // Tipo any é aceito pois o Nivo aceita estruturas variadas
}

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const SunburstChart = ({ data }: SunburstChartProps) => (
  <ResponsiveSunburst
    data={data}
    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    id="name"
    value="value"
    cornerRadius={2}
    borderWidth={1}
    borderColor="white"
    colors={{ scheme: 'nivo' }}
    childColor={{
      from: 'color',
      modifiers: [['brighter', 0.1]],
    }}
    enableArcLabels={true}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: 'color',
      modifiers: [['darker', 1.4]],
    }}
    inheritColorFromParent={false}
  />
);

export default SunburstChart;
