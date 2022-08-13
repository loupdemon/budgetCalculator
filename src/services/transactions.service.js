export class TransactionService {
  static update(incomes, tempIncomes, expenditures, tempExpenditures) {
    console.log(incomes.length + tempIncomes.length + expenditures.length + tempExpenditures.length);
    // console.dir(incomes);
    // console.dir(tempIncomes);
    // console.dir(expenditures);
    // console.dir(tempExpenditures);
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
}
