export const classes = (...args: string[]): string => {
  const classes = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg && arg !== "") {
      classes.push(arg);
    }
  }

  return classes.join(" ");
};
