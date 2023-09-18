import React from 'react';
import { Stack } from 'rsuite';

import Logo from './Logo';

const Brand = ({ showText, ...props }) => {
  return (
    <Stack className="brand" {...props}>
      <Logo height={26} width={22.56} style={{ marginTop: 6 }} />
      {showText && <span style={{ marginLeft: 14 }}>Qbs table</span>}
    </Stack>
  );
};

export default Brand;
