import pool from "../database";

export const showHoldersTransactions = async (req, res) => {

}

export const showAdminDeposits = async (req, res) => {
    
}

export const transferToAccount = async (req, res) => {
    const {amount, originAccount, destinationAccount} = req.body;

    const originAccountQuery = await pool.query('SELECT * FROM public.bank_account WHERE account_number = $1', [originAccount]).rowCount === 0 ?
        res.json("Origin account doesn't exist.") : {};
    const destinationAccountQuery = await pool.query('SELECT * FROM public.bank_account WHERE account_number = $1', [destinationAccount]).rowCount === 0 ?
        res.json("Destination account doesn't exist.") : {};

    originAccountQuery.rows[0].balance >= amount ?
    {} : res.json("Insufficient funds.");
    
    const finalOriginAccountBalance = originAccountQuery.rows[0].balance - amount; 
    const finalDestinationAccountBalance = destinationAccountQuery.rows[0].balance + amount;

    const updatedOriginAccount = await pool.query('UPDATE public.bank_account SET balance = $2 WHERE account_number = $1', [originAccountQuery.rows[0].account_number, finalOriginAccountBalance]);
    if (UpdatedUser.rowCount === 0) return res.status(401).json({message: "Something goes wrong"});
    
    const updatedDestinationAccount = await pool.query('UPDATE public.bank_account SET balance = $2 WHERE account_number = $1', [destinationAccountQuery.rows[0].account_number, finalDestinationAccountBalance]);
    if (UpdatedUser.rowCount === 0) return res.status(401).json({message: "Something goes wrong"});
    
    const record = await pool.query("INSERT INTO public.transfer_history(amount, transfer_type, origin_account, destination_account) VALUES($1, $2, $3)", [amount, "transfer", originAccount, destinationAccount]);
    if (record.rowCount === 0) return res.status(401).json({message: "Something goes wrong"});
    console.log(record.rows);
    res.json({'transfer': 'OK'});
}

export const depositToAccount = async (req, res) => {
    const {amount, destinationAccount} = req.body;

    const destinationAccountQuery = await pool.query('SELECT * FROM public.bank_account WHERE account_number = $1', [destinationAccount]).rowCount === 0 ?
        res.json("Destination account doesn't exist.") : {};


    const finalDestinationAccountBalance = parseFloat(destinationAccountQuery.rows[0].balance) + parseFloat(amount);
    
    const updatedDestinationAccount = await pool.query('UPDATE public.bank_account SET balance = $2 WHERE account_number = $1', [destinationAccountQuery.rows[0].account_number, finalDestinationAccountBalance]);
    if (UpdatedUser.rowCount === 0) return res.status(401).json({message: "Something goes wrong"});

    const record = await pool.query("INSERT INTO public.transfer_history(amount, transfer_type, destination_account) VALUES($1, $2, $3)", [amount, "deposit", destinationAccount]);
    if (record.rowCount === 0) return res.status(401).json({message: "Something goes wrong"});
    console.log(record.rows);
    res.json({'deposit': 'OK'});
}