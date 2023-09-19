const debounce = (func: Function, delay: number) => {
  let timer: any = null;
  return function (this: unknown, ...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

export default debounce;
