import axios from 'axios';

export class TransactionService {
    static update(incomes, tempIncomes, expenses, tempExpenses) {
        console.log(incomes.length + tempIncomes.length + expenses.length + tempExpenses.length);
        return new Promise((resolve) => setTimeout(resolve, 1000));
    }

    async getMonthData() {
        const response = await axios.get('http://localhost:3000/month-data');
        return response.data;
    }

    async updateMonthData(id, incomes, tempIncomes, expenses, tempExpenses) {
        const response = await axios.post(`http://localhost:3000/month-data/${id}`, {
            incomes: [...incomes, ...tempIncomes],
            expenses: [...expenses, ...tempExpenses]
        });
        return response;
    }
}
