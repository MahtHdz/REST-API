export const genBalanceAccount = () => {
    const bMax = 2999999;
    const bMin = 100;
    const balance = Math.floor(Math.random() * (bMax - bMin + 1)) + bMin;
    return balance;
};