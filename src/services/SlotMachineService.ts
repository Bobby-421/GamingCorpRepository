 import { SlotMachine } from '../models/SlotMachine';

 export class SlotMachineService {
   private static instance: SlotMachineService;

   private constructor() {}
   static getInstance(): SlotMachineService {
     if (!SlotMachineService.instance) {
       SlotMachineService.instance = new SlotMachineService();
     }
     return SlotMachineService.instance;
   }
   async fetchSlotMachines(): Promise<SlotMachine[]> {
     try {
       //commented out mock response code
       //const response = await fetch('/api/slot-machines'); // Update with your API endpoint
       //const mockResponse = await response.json();
    
       const slotMachineArray = [
        new SlotMachine(1, 'Slot Machine A', [1, 5, 10, 20]),
        new SlotMachine(2, 'Slot Machine B', [2, 5, 25, 50]),
        new SlotMachine(3, 'Slot Machine C', [5, 10, 25, 100]),
      ];

      return slotMachineArray.map((machine: any) => 
        new SlotMachine(machine.id, machine.name, machine.betAmounts)
      );

    //    return mockResponse.slotMachines.map((machine: any) => 
    //      new SlotMachine(machine.id, machine.name, machine.betAmounts)
    //    );
     } catch (error) {
       console.error('Failed to fetch slot machines:', error);
       return [];
     }
   }
 }
