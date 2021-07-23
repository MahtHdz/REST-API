export const genAccount = () => {
    const bAmax = 90000000000;
    const bAmin = 10000000000;
    const bankAccount = Math.floor(Math.random() * (bAmax - bAmin + 1)) + bAmin;
    
    const bMax = 90000;
    const bMin = 100;
    const balance =  Math.floor(Math.random() * (bMax - bMin + 1)) + bMin;
    
    return {bankAccount, balance};
};