export const calcScoreColor = (score: number) => {
  if (score >= 90) {
    return '#00ff00';
  } else if (score >= 50) {
    return '#ffa500';
  } else {
    return '#ff0000';
  }
};

const ColoredScore = ({ score }: { score: number }) => {
  return (
    <h3
      style={{
        color: calcScoreColor(score),
      }}
    >
      {score}%
    </h3>
  );
};

export default ColoredScore;
