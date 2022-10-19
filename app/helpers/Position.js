/* eslint-disable complexity */
exports.positionCalculate = x => {
  switch (true) {
    case x <= 4:
      return 'DEV';
    case x > 4 && x <= 9:
      return 'LEAD';
    case x > 9 && x <= 19:
      return 'TL';
    case x > 19 && x <= 29:
      return 'EM';
    case x > 29 && x <= 49:
      return 'HEAD';
    case x > 49:
      return 'CEO';
    default:
      return 'DEV';
  }
};
/* eslint-enable complexity */
