export class TransactionService {
  static update(incomes, tempIncomes, expenses, tempExpenses) {
    console.log(incomes.length + tempIncomes.length + expenses.length + tempExpenses.length);
    // console.dir(incomes);
    // console.dir(tempIncomes);
    // console.dir(expenses);
    // console.dir(tempExpenses);
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
}
