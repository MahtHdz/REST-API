export const genBalanceAccount = () => {
    const bMax = 999999.999;
    const bMin = 100.999;
    const balance = Math.random() * (bMax - bMin + 1) + bMin;
    return balance.toFixed(2);
};