export const response = (res, error) => {
    if (res !== null) return [res.data, null];
    return [
      null,
      {
        message: error?.response?.data?.message || "",
        data: error?.response?.data?.data || {},
        error,
      },
    ];
  };