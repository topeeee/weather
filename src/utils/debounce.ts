function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): T {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), delay);
  } as T;
}
export {debounce};
