import { type Metric, onCLS, onINP, onLCP } from 'web-vitals';

function reportMetric(metric: Metric) {
  const payload = JSON.stringify({
    id: metric.id,
    name: metric.name,
    navigationType: metric.navigationType,
    rating: metric.rating,
    value: metric.value,
  });

  if (
    navigator.sendBeacon(
      '/api/vitals',
      new Blob([payload], { type: 'application/json' })
    )
  ) {
    return;
  }

  fetch('/api/vitals', {
    body: payload,
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    method: 'POST',
  }).catch(() => null);
}

onLCP(reportMetric);
onINP(reportMetric);
onCLS(reportMetric);
