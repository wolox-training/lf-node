jest.mock('bcrypt');
const bcrypt = require('bcrypt');

exports.resolveHashPasswordMock = password => bcrypt.hash.mockResolvedValue(password);
exports.resolveComparePasswordMock = result => {
  console.log(result);
  return bcrypt.compare.mockResolvedValue(result);
};
