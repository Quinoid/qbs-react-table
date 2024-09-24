import React, { memo } from 'react';

const CardLoader: React.FC = () => {
  const placeholders = Array.from({ length: 6 });

  const cardClasses =
    'grid grid-cols-5 border-grey shadow-sm rounded-lg relative qbs-card-container';
  const columnClasses = 'grid grid-cols-1 place-content-start text-sm qbs-card-column';

  return (
    <>
      {placeholders.map((_, index) => (
        <div
          key={index}
          className="p-3 gap-3 border-2 border-grey shadow-sm rounded-lg relative qbs-card-container"
        >
          <div className={cardClasses}>
            <div className={columnClasses}>
              <p className="  custom-skeleton-gradient  h-2 w-[89px] rounded-full"></p>

              <p
                className="mt-2  h-2 rounded-full custom-skeleton-gradient w-[111px] "
                // style={{ animationDelay: `${index * 0.3}s` }}
              ></p>
            </div>
            <div className={columnClasses}>
              <p className="  custom-skeleton-gradient  h-2 w-[89px] rounded-full"></p>

              <p
                className="mt-2  h-2 rounded-full custom-skeleton-gradient w-[111px] "
                // style={{ animationDelay: `${index * 0.3}s` }}
              ></p>
            </div>
            <div className={columnClasses}>
              <p className="  custom-skeleton-gradient  h-2 w-[89px] rounded-full"></p>

              <p
                className="mt-2  h-2 rounded-full custom-skeleton-gradient w-[111px] "
                // style={{ animationDelay: `${index * 0.3}s` }}
              ></p>
            </div>
            <div className={columnClasses}>
              <p className="  custom-skeleton-gradient  h-2 w-[89px] rounded-full"></p>

              <p
                className="mt-2  h-2 rounded-full custom-skeleton-gradient w-[111px] "
                // style={{ animationDelay: `${index * 0.3}s` }}
              ></p>
            </div>
            <div className={columnClasses}>
              <p className="  custom-skeleton-gradient  h-2 w-[89px] rounded-full"></p>

              <p
                className="mt-2  h-2 rounded-full custom-skeleton-gradient w-[111px] "
                // style={{ animationDelay: `${index * 0.3}s` }}
              ></p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default memo(CardLoader);
