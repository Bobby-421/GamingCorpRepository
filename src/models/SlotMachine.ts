import { SlotMachineInterface } from '../types/SlotMachineInterface.js';

export class SlotMachine implements SlotMachineInterface 
{
  id: number;
  name: string;
  betAmounts: number[];
  private currentBet: number = 0;


  constructor(id: number, name: string, betAmounts: number[]) {
    this.id = id;
    this.name = name;
    this.betAmounts = betAmounts.sort((a, b) => a - b); 
  }

  placeBet(amount: number): void 
  {
    if (!this.betAmounts.includes(amount)) {
      throw new Error('Invalid bet amount');
    }
    this.currentBet = amount;
  }

  spin(): number 
  {
    if (this.currentBet <= 0) {
      throw new Error('Please select a bet amount');
    }

    //0 and 100 for win probability
    const random = Math.random() * 100;
    
    //40% chance win, 60% lose
    if (random < 40) {
      const multiplier = 1 + Math.random() * 2;
      return Math.floor(this.currentBet * multiplier);
    } else {
      return -this.currentBet;
    }
  }

  getCurrentBet(): number {
    return this.currentBet;
  }
}
