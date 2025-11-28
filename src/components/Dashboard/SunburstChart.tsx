import { ResponsiveSunburst } from '@nivo/sunburst';

interface SunburstChartProps {
  data: any; // Tipo any é aceito pois o Nivo aceita estruturas variadas
}

// Componente de tooltip customizado
const CustomTooltip = ({ id, value, color }: any) => (
  <div
    style={{
      background: 'rgba(0, 0, 0, 0.9)',
      color: '#fff',
      padding: '12px 16px',
      border: `2px solid ${color}`,
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      fontFamily: 'Poppins, sans-serif',
    }}
  >
    <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
      {id}
    </div>
    <div style={{ fontSize: '12px', color: '#E0E0E0' }}>
      Alocação: {typeof value === 'number' ? `${(value * 100).toFixed(1)}%` : value}
    </div>
  </div>
);

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
    tooltip={CustomTooltip}
    animate={true}
    motionConfig="gentle"
  />
);

export default SunburstChart;
