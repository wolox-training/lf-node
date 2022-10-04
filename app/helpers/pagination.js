exports.pagParams = (page = 1, limit = 10) => ({ offset: (page - 1) * limit, limit });
