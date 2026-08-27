// countUp — عداد رقمي به interface صغير (تايكر + هدف + خيارات)
// كل الـ easing والـ RAF والتحكم في reduced-motion جوه، مفيش حاجة
// للمتصل غير إنه يقرر قيمته النهائية ولا لا.

const prefersReducedMotion = () =>
  typeof matchMedia === 'function' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches;

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export function countUp(setNumber, target, { duration = 1400, easing = easeOutCubic } = {}) {
  if (prefersReducedMotion()) {
    setNumber(target);
    return () => {};
  }

  const start = performance.now();
  let raf;

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    setNumber(Math.round(easing(progress) * target));
    if (progress < 1) raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}