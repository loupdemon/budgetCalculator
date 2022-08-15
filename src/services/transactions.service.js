import axios from "axios";

export class TransactionService {
  static update(incomes, tempIncomes, expenses, tempExpenses) {
    console.log(incomes.length + tempIncomes.length + expenses.length + tempExpenses.length);
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  async selectAll() {
    const response = await axios.get('http://localhost:3000/month-data');
    console.dir(response)
    return response.data;
  }
}
