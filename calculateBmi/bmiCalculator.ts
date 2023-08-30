// const heightCM:number = Number(process.argv[2]);
// const weightKG = Number(process.argv[3]);

// try {
//   if (!heightCM || !weightKG) {
//     throw new Error('Invalid Arguments');
//   }
// } catch(error: unknown) {
//   let errorMessage = 'Something went wrong: '
//   if (error instanceof Error) {
//     errorMessage += error.message;
//   }
//   console.log(errorMessage);
//   process.exit();
// }

const calculateBmi = function(heightCM: number, weightKG: number) {
  //bmi = kg / (100 * cm) squared
  const bmi = weightKG / Math.pow((heightCM / 100), 2);
  // switch (bmi) {
    
  // }
  if (bmi < 16.0) {
    return( {
      weight: weightKG,
      height: heightCM,
      bmi: "Underweight (Severe thinness)"
    });
  } else if (bmi < 16.9) {
    return( {
      weight: weightKG,
      height: heightCM,
      bmi: "Underweight (Moderate thinness)"
    });
  } else if (bmi < 18.4) {
    return( {
      weight: weightKG,
      height: heightCM,
      bmi: "Underweight (Mild thinness)"
    });
  } else if (bmi < 24.9) {
    return( {
      weight: weightKG,
      height: heightCM,
      bmi: "Normal range"
    });
  } else if (bmi < 29.9) {
    return( {
      weight: weightKG,
      height: heightCM,
      bmi: "Overweight (Pre-obese)"
    });
  } else if (bmi < 34.9) {
    return( {
      weight: weightKG,
      height: heightCM,
      bmi: "Obese (Class I)"
    });
  } else if (bmi < 39.9) {
    return( {
      weight: weightKG,
      height: heightCM,
      bmi: "Obese (Class II)"
    });
  } else if (bmi >= 40.0) {
    return( {
      weight: weightKG,
      height: heightCM,
      bmi: "Obese (Class III)"
    });
  }
  return(String(bmi));
};
// calculateBmi(heightCM, weightKG);
// calculateBmi(120, 70.31);
// calculateBmi(140, 70.31);
// calculateBmi(175.26, 70.31);
// calculateBmi(200, 70.31);
// calculateBmi(240, 70.31);
// calculateBmi(300, 70.31);

export default calculateBmi;