import axios from 'axios';

export class TransactionService {
    /**
     * Function that sets timeout for all provided actions
     * @returns promise with timeout for actions
     */
    static waitForTimeout() {
        return new Promise((resolve) => setTimeout(resolve, 1000));
    }
    /**
     * Function that makes call to database and retrieves all the data from month-data table
     * @returns data from the database
     */
    async getMonthData() {
        const response = await axios.get('http://localhost:3000/month-data');
        return response.data;
    }
    /**
     * Function that collects all the data from application and sends POST request to database to update information
     * @param {*} id month id, number of month
     * @param {*} incomes array of incomes objects
     * @param {*} tempIncomes array of temporary incomes objects
     * @param {*} expenses array of expenses objects
     * @param {*} tempExpenses array of temporary expenses objects
     * @returns
     */
    async updateMonthData(id, incomes, tempIncomes, expenses, tempExpenses) {
        await axios.post(`http://localhost:3000/month-data/${id}`, {
            incomes: [...incomes, ...tempIncomes],
            expenses: [...expenses, ...tempExpenses]
        });
    }
}
