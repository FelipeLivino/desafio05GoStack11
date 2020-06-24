import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let incomeTotal = 0;
    const incomeList = this.transactions
      .filter(element => {
        if (element.type === 'income') return element;
      })
      .map(element => {
        incomeTotal += element.value;
        return element.value;
      });

    let outcomeTotal = 0;
    const outcomeList = this.transactions
      .filter(element => {
        if (element.type === 'outcome') return element;
      })
      .map(element => {
        outcomeTotal += element.value;
        return element.value;
      });

    return {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: incomeTotal - outcomeTotal,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    if (type === 'outcome') {
      let incomeTotal = 0;
      const incomeList = this.transactions
        .filter(element => {
          if (element.type === 'income') return element;
        })
        .map(element => {
          incomeTotal += element.value;
          return element.value;
        });

      let outcomeTotal = 0;
      const outcomeList = this.transactions
        .filter(element => {
          if (element.type === 'outcome') return element;
        })
        .map(element => {
          outcomeTotal += element.value;
          return element.value;
        });
      if (incomeTotal - (outcomeTotal + value) < 0) {
        throw Error('Invalid value');
      }
    }

    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
