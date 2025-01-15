import { SlotMachine } from '../models/SlotMachine';
import { BalanceService } from '../services/BalanceService';
import { SlotMachineService } from '../services/SlotMachineService';

const slotMachineService = SlotMachineService.getInstance();


const balanceService = BalanceService.getInstance();
const userBalanceDisplay = document.getElementById('user-balance')!;
const transactionHistory = document.getElementById('transaction-history')!;

updateBalanceDisplay();
const slotMachines = await slotMachineService.fetchSlotMachines();

// // Mock slot machines
// const slotMachines = [
//   new SlotMachine(1, 'Slot Machine A', [1, 5, 10, 20]),
//   new SlotMachine(2, 'Slot Machine B', [2, 5, 25, 50]),
//   new SlotMachine(3, 'Slot Machine C', [5, 10, 25, 100]),
// ];

const slotMachinesList = document.getElementById('slot-machines-list')!;

slotMachines.forEach((machine) => {
  const li = document.createElement('li');
  li.textContent = `${machine.name} (ID: ${machine.id}) - Bets: ${machine.betAmounts.join(', ')}`;
  li.style.cursor = 'pointer';
  
  li.onclick = () => {
    window.parent.postMessage({
      type: 'slot-machine-selected',
      data: machine,
    }, '*');
  };

  slotMachinesList.appendChild(li);
});

window.addEventListener('message', (event) => {
  if (event.data?.type === 'update-balance') {
    const { amount, machineName } = event.data.data;
    balanceService.updateBalance(amount, machineName);
    updateBalanceDisplay();
    updateTransactionHistory();
  }
});

function updateBalanceDisplay() {
  userBalanceDisplay.textContent = `$${balanceService.getBalance()}`;
}

function updateTransactionHistory() {
  const transactions = balanceService.getTransactions();
  transactionHistory.innerHTML = transactions.map(transaction => `
    <div class="transaction ${transaction.amount > 0 ? 'win' : 'lose'}">
      ${formatDate(transaction.timestamp)} - 
      ${transaction.machineName || 'Unknown Machine'}: 
      ${transaction.amount > 0 ? '+' : ''}$${transaction.amount}
      (Balance: $${transaction.balance})
    </div>
  `).join('');
  
  transactionHistory.scrollTop = transactionHistory.scrollHeight;
}

function formatDate(date: Date): string {
  return date.toLocaleTimeString();
}
