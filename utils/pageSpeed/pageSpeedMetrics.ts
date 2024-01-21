export const getMobileScore = (
  lighthouseResult: LighthouseResultProps | undefined,
) => {
  const mobileScore = lighthouseResult
    ? lighthouseResult.categories?.performance?.mobileScore * 100
    : null;
  return mobileScore;
};

export const getDesktopScore = (
  lighthouseResult: LighthouseResultProps | undefined,
) => {
  const desktopScore = lighthouseResult
    ? lighthouseResult.categories?.performance?.desktopScore * 100
    : null;
  return desktopScore;
};

export const getLastExecution = (
  lighthouseResult: LighthouseResultProps | undefined,
) => {
  const lastExecution = lighthouseResult
    ? lighthouseResult.categories?.performance?.lastExecution
    : null;
  return lastExecution;
};

export const parsePageSpeedMetrics = (
  lighthouseResult: LighthouseResultProps | undefined,
) => {
  const mobileScore = getMobileScore(lighthouseResult);
  const desktopScore = getDesktopScore(lighthouseResult);
  const lastExecution = getLastExecution(lighthouseResult);

  let average;
  if (mobileScore && desktopScore) {
    average = Math.ceil((mobileScore + desktopScore) / 2);
  }

  return {
    mobileScore: mobileScore,
    desktopScore: desktopScore,
    average: average,
    lastExecution: lastExecution,
  };
};

interface LighthouseResultProps {
  categories: {
    performance: {
      desktopScore: number;
      mobileScore: number;
      processing: boolean;
      lastExecution: string;
    };
  };
}
