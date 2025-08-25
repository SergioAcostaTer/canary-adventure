const SpikyStar = ({
  className,
  size,
}: {
  className?: string;
  size: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
  >
    <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
  </svg>
);

type StarsProps = {
  rating: number;
  reviews?: number;
  size?: number;
  color?: string;
  emptyColor?: string;
  gap?: number;
};

const Stars = ({
  rating,
  reviews,
  size = 16,
  color = "var(--label-primary,#1a2b49)",
  emptyColor = "var(--bg-experience-card,#ffffff00)",
  gap = 0,
}: StarsProps) => {
  return (
    <div className="flex items-center">
      {/* Stars */}
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => {
          const full = Math.floor(rating);
          const isFull = i < full;
          const isPartial = i === full && rating % 1 !== 0;

          return (
            <div
              key={i}
              className="relative"
              style={{
                marginRight: i < 4 ? gap : 0,
                width: size,
                height: size,
              }}
            >
              {/* Empty star */}
              <div className="absolute inset-0" style={{ color: emptyColor }}>
                <SpikyStar size={size} />
              </div>

              {/* Filled star / partial fill */}
              {(isFull || isPartial) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    width: isFull ? "100%" : `${(rating % 1) * 100}%`,
                    color,
                  }}
                >
                  <SpikyStar size={size} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="gap-2 flex items-center ml-1">
        <span className="text-sm text-[var(--label-primary,#1a2b49)]">
          {rating.toFixed(1)}
        </span>
        {typeof reviews === "number" && (
          <span className="text-sm text-[var(--label-secondary,#63687a)]">
            ({reviews.toLocaleString()})
          </span>
        )}
      </div>
    </div>
  );
};

export default Stars;
