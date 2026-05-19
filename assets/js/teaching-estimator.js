(function () {
  const dataNode = document.getElementById("teaching-estimator-data");
  const form = document.getElementById("teaching-estimator");
  if (!dataNode || !form) return;

  let config;
  try {
    config = JSON.parse(dataNode.textContent);
  } catch (e) {
    return;
  }

  const serviceEl = document.getElementById("estimator-service");
  const quantityEl = document.getElementById("estimator-quantity");
  const quantityLabelEl = document.getElementById("estimator-quantity-label");
  const groupWrap = document.getElementById("estimator-group-wrap");
  const groupEl = document.getElementById("estimator-group");
  const groupHintEl = document.getElementById("estimator-group-hint");
  const totalEl = document.getElementById("estimator-total");
  const noteEl = document.getElementById("estimator-note");

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: config.currency || "USD",
    maximumFractionDigits: 0,
  });

  const servicesById = {};
  for (const s of config.services) servicesById[s.id] = s;

  function currentService() {
    return servicesById[serviceEl.value] || config.services[0];
  }

  function update() {
    const svc = currentService();
    quantityLabelEl.textContent = svc.unitLabel.charAt(0).toUpperCase() + svc.unitLabel.slice(1);

    if (svc.groupPricing) {
      groupWrap.style.display = "";
      const threshold = config.groupDiscount.threshold;
      const pct = Math.round((1 - config.groupDiscount.multiplier) * 100);
      groupHintEl.textContent = `${pct}% off for ${threshold}+ seats.`;
    } else {
      groupWrap.style.display = "none";
    }

    if (svc.rate == null) {
      totalEl.textContent = "Price TBA";
      noteEl.textContent = "Book a call to get a tailored quote.";
      return;
    }

    const quantity = Math.max(1, parseInt(quantityEl.value, 10) || 1);
    const group = Math.max(1, parseInt(groupEl.value, 10) || 1);

    let multiplier = 1;
    let discountApplied = false;
    if (svc.groupPricing && group >= config.groupDiscount.threshold) {
      multiplier = config.groupDiscount.multiplier;
      discountApplied = true;
    }

    const seats = svc.groupPricing ? group : 1;
    const total = svc.rate * quantity * seats * multiplier;

    totalEl.textContent = formatter.format(total);
    const parts = [`${formatter.format(svc.rate)} × ${quantity} ${svc.unitLabel}`];
    if (svc.groupPricing) parts.push(`× ${seats} seat${seats === 1 ? "" : "s"}`);
    if (discountApplied) {
      const pct = Math.round((1 - config.groupDiscount.multiplier) * 100);
      parts.push(`− ${pct}% group discount`);
    }
    noteEl.textContent = parts.join("  ");
  }

  form.addEventListener("input", update);
  form.addEventListener("change", update);
  update();
})();
