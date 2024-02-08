import React from 'react';

import { TableLocaleType } from './@types/common';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  locale?: TableLocaleType;
  loadAnimation?: boolean;
  loading?: boolean;
  addPrefix: (...classes: any) => string;
  renderLoading?: (loading: React.ReactNode) => any;
  colLength?: number;
}

const Loader = React.forwardRef((props: LoaderProps, ref: React.Ref<HTMLDivElement>) => {
  const { loadAnimation, loading, colLength = 10, addPrefix, renderLoading } = props;
  const loadingElement = () => {
    return (
      <div ref={ref} className={addPrefix('loader-wrapper')}>
        <div className="skeleton-table">
          {Array.from({ length: 15 }, (_, keyind) => (
            <React.Fragment key={keyind}>
              <div className="skeleton-row">
                {Array.from({ length: colLength }, (_, index) => (
                  <div
                    key={index}
                    style={{ minWidth: window.innerWidth / colLength }}
                    className="skeleton-cell"
                  ></div>
                ))}
              </div>
              {(keyind + 1) % 5 === 0 && keyind !== 14 && <div className="skeleton-divider"></div>}
            </React.Fragment>
          ))}
        </div>
        {/* </div> */}
      </div>
    );
  };

  // Custom render a loader
  if (typeof renderLoading === 'function') {
    return loading ? loadingElement() : null;
  }

  // If loadAnimation is true , it returns the DOM element,
  // and controls whether the loader is displayed through CSS to achieve animation effect.
  return loading || loadAnimation ? loadingElement() : null;
});

Loader.displayName = 'Table.Loader';

export default Loader;
