import React from 'react';

import ReferralTable from './ReferralTable';
import ClientTable from './ClientTable';
import LineChart from '../common/LineChart/LineChart';

const chartData = [
  {
    name: 'Client',
    values: [
      { x: 1, y: 0 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
      { x: 6, y: 3 },
      { x: 7, y: 3 },
      { x: 8, y: 4 },
      { x: 9, y: 5 },
      { x: 10, y: 6 },
      { x: 11, y: 7 },
      { x: 12, y: 8 },
      { x: 12, y: 8 },
      { x: 13, y: 11 },
      { x: 14, y: 14 },
      { x: 15, y: 16 },
      { x: 16, y: 20 },
      { x: 17, y: 24 },
      { x: 18, y: 32 },
      { x: 19, y: 48 },
    ],
  },
];

const Score = () => (
  <>
    <ReferralTable />
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <LineChart width={650} height={650} data={chartData} />
      <ClientTable />
    </div>
  </>
);

export default Score;
