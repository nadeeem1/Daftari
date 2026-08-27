import { createSignal } from 'solid-js';

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const REQUEST_TIMEOUT_MS = 4000;
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'false';

export default function Signup(props) {
  const [email, setEmail] = createSignal('');
  const [formStatus, setFormStatus] = createSignal(null);
  const [submitting, setSubmitting] = createSignal(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const value = email().trim();

    if (!EMAIL_RE.test(value) || value.length > 254) {
      setFormStatus('error');
      return;
    }

    if (DEMO_MODE) {
      setFormStatus('demo');
      setEmail('');
      return;
    }

    setSubmitting(true);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
        signal: controller.signal
      });
      if (!res.ok) throw new Error('bad_response');
      setFormStatus('ok');
      setEmail('');
    } catch {
      setFormStatus('net');
    } finally {
      clearTimeout(timer);
      setSubmitting(false);
    }
  }

  return (
    <section id="signup" class="signup">
      <div class="wrap signup-inner">
        <h2>{props.t.signupTitle}</h2>
        <p>{props.t.signupSub}</p>
        <form class="signup-form" novalidate onSubmit={handleSubmit}>
          <label for="email" class="visually-hidden">{props.t.emailLabel}</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            maxlength="254"
            autocomplete="email"
            placeholder={props.t.emailPh}
            value={email()}
            aria-invalid={formStatus() === 'error'}
            aria-describedby="form-feedback"
            onInput={(event) => {
              setEmail(event.currentTarget.value);
              if (formStatus()) setFormStatus(null);
            }}
          />
          <button type="submit" class="btn btn-primary" disabled={submitting()}>
            {submitting() ? '...' : props.t.signupCta}
          </button>
        </form>
        <p
          id="form-feedback"
          class={`form-msg ${formStatus() === 'ok' ? 'success' : formStatus() === 'error' || formStatus() === 'net' ? 'error' : formStatus() === 'demo' ? 'demo' : ''}`}
          role="status"
          aria-live="polite"
        >
          {formStatus() === 'ok'
            ? props.t.formOk
            : formStatus() === 'error'
              ? props.t.formErr
              : formStatus() === 'net'
                ? props.t.formNetErr
                : formStatus() === 'demo'
                  ? props.t.formDemo
                  : ''}
        </p>
      </div>
    </section>
  );
}