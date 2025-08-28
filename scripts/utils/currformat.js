export let formatCurrency = (priceCents) => {
    return '$' + (priceCents / 100).toFixed(2);
}