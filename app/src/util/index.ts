export function debounce(func: any, wait: number) {
    let timeout: NodeJS.Timeout | null;
    return function(...args: any) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }