// Hand-rolled instead of Intl.NumberFormat so server and client output always match.
export const rub = (amount: number) =>
  `${String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0")} ₽`;
