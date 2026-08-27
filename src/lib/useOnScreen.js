import { onMount, onCleanup } from 'solid-js';

// useOnScreen — hook بيرجّع ref تبعيه على أي عنصر، وينفّذ callback
// أول ما العنصر يظهر في الشاشة (مرة واحدة افتراضيًا). الـ observer
// والتنظيف كلهم متغلفين جوه — interface واحدة بس: callback + options.

export function useOnScreen(callback, { threshold = 0.4, once = true } = {}) {
  let ref;

  onMount(() => {
    if (!ref) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          callback(entry);
          if (once) observer.disconnect();
        }
      }
    }, { threshold });
    observer.observe(ref);
    onCleanup(() => observer.disconnect());
  });

  return (element) => (ref = element);
}