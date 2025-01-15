interface Transaction {
  amount: number;
  timestamp: Date;
  machineName?: string;
  balance: number;
}

export class BalanceService {
  private static instance: BalanceService;
  private balance: number = 1000; // Starting balance
  private transactions: Transaction[] = [];

  private constructor() {}

  static getInstance(): BalanceService {
    if (!BalanceService.instance) {
      BalanceService.instance = new BalanceService();
    }
    return BalanceService.instance;
  }

  getBalance(): number {
    return this.balance;
  }

  updateBalance(amount: number, machineName?: string): number {
    this.balance += amount;
    
    // Record the transaction
    this.transactions.push({
      amount,
      timestamp: new Date(),
      machineName,
      balance: this.balance
    });

    return this.balance;
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }
} 