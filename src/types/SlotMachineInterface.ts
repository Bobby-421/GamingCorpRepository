export interface SlotMachineInterface {

    id: number;
    name: string;
    betAmounts: number[];

    placeBet(betAmount: number): void;
    spin(): number;
  }
  