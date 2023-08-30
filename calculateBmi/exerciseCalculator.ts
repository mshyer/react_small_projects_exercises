interface exerciseInfo {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}



// console.log('args :>> ', restArgs);
// const targetHours: number = Number(process.argv[2]);
// const restArgs: string[] = process.argv.slice(3);
// const targetHours: number = Number(req.query)

// try {
//   if (!targetHours || restArgs.length === 0) {
//     throw new Error('Invalid arguments provided');
//   }
// } catch (error: unknown) {
//   let errorMessage = 'Something went wrong: '
//   if (error instanceof Error) {
//     errorMessage += error.message;
//   }
//   console.log(errorMessage);
//   process.exit()
// }

// const dailyHours: number[] = restArgs.map(numStr => Number(numStr));


function calculateTrainingDays(dailyHours: number[]): number {
  return dailyHours.filter(day => day > 0).length;
}

function calculateAverage(dailyHours: number[]): number {
  return (dailyHours.reduce(function(sum: number, element: number) {
    return sum + element;
  })) / dailyHours.length;
}

function calculateSuccess(
  average: number,
  targetHours: number): boolean {
    return average >= targetHours;
}

type oneToThree = 1 | 2 | 3 | -1;
function calculateRating(average: number, target: number): oneToThree {
  if (average === 0 || target === 0) {
    return -1;
  }
  const percentTarget: number = average / target;

  if (percentTarget < 0.8) {
    return 1;
  } else if (percentTarget >= 0.8 && percentTarget < 1.2) {
    return 2;
  } else if (percentTarget >= 1.2) {
    return 3;
  }
  return 1;
}

function calculateRatingDescription(rating: number): string {
  switch (rating) {
    case 1:
      return "Failed to meet daily hours";
    case 2:
      return "Good progress this week! But still room for improvement.";
    case 3:
      return "Exceeded expectations. Good job!";
  }
  return 'Error';
}

function calculateExercises(
  dailyHours: number[],
  targetHours: number): exerciseInfo {
    const average:number = calculateAverage(dailyHours);
    const rating:number = calculateRating(average, targetHours);
    return {
      periodLength: dailyHours.length,
      trainingDays: calculateTrainingDays(dailyHours),
      success: calculateSuccess(average, targetHours),
      rating,
      ratingDescription: calculateRatingDescription(rating),
      target: targetHours,
      average,
    };
}

// console.log('example :>> ', calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

// console.log('script running');
// console.log('calculate average :>> ', calculateAverage([3, 0, 2, 4.5, 0, 3, 1]));
// console.log(calculateExercises(dailyHours, targetHours));

export default calculateExercises;