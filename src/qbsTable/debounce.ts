function debounce<F extends (...args: any[]) => any>(
  func: F,
  delay: number
): (...funcArgs: Parameters<F>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<F>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export default debounce;
