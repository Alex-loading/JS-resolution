const asyncCallWithTimeout = (asyncPromise, timeLimit) => {
  return Promise.race([
    asyncPromise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Operation timed out")), timeLimit)
    ),
  ]);
};