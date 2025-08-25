export const calculateApproxDuration = (
  durationInMinutes: number,
  singularHourLabel = "h",
  pluralHoursLabel = "hs",
  singularMinuteLabel = "min",
  pluralMinutesLabel = "mins"
): string => {
  // round UP to nearest 15 minutes
  const roundedMinutes = Math.ceil(durationInMinutes / 15) * 15;

  if (roundedMinutes < 60) {
    const minuteLabel = roundedMinutes === 1 ? singularMinuteLabel : pluralMinutesLabel;
    return `${roundedMinutes} ${minuteLabel}`;
  }

  const hours = Math.floor(roundedMinutes / 60);
  const minutes = roundedMinutes % 60;
  const hourLabel = hours === 1 ? singularHourLabel : pluralHoursLabel;
  const minuteLabel = minutes === 1 ? singularMinuteLabel : pluralMinutesLabel;

  return minutes === 0
    ? `${hours} ${hourLabel}`
    : `${hours} ${hourLabel} ${minutes} ${minuteLabel}`;
};
