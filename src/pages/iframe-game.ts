import { SlotMachine } from '../models/SlotMachine';
import { BalanceService } from '../services/BalanceService';

let selectedMachine: SlotMachine | null = null;
const balanceService = BalanceService.getInstance();

const machineDetails = document.getElementById('slot-machine-details')!;
const betControls = document.getElementById('bet-controls')!;
const betButtons = document.getElementById('bet-buttons')!;
const currentBetDisplay = document.getElementById('current-bet')!;
const spinButton = document.getElementById('spin-button') as HTMLButtonElement;
const spinResultDisplay = document.getElementById('spin-result')!;

window.addEventListener('message', (event) => {
  if (event.data?.type === 'update-slot-machine') {
    const machineData = event.data.data;
    selectedMachine = new SlotMachine(
      machineData.id,
      machineData.name,
      machineData.betAmounts
    );
    updateMachineDisplay();
    updateBetControls();
  }
});

function updateBetControls() {
  if (!selectedMachine) return;
  
  betControls.style.display = 'block';
  betButtons.innerHTML = selectedMachine.betAmounts
    .map(amount => `
      <button class="bet-button" data-amount="${amount}">
        $${amount}
      </button>
    `).join('');

  betButtons.querySelectorAll('.bet-button').forEach(button => {
    button.addEventListener('click', () => {
      const amount = Number(button.getAttribute('data-amount'));
      selectedMachine?.placeBet(amount);
      currentBetDisplay.textContent = `$${amount}`;
      
      betButtons.querySelectorAll('.bet-button').forEach(btn => 
        btn.classList.remove('selected'));
      button.classList.add('selected');
      
      spinButton.disabled = false;
    });
  });
}

spinButton.addEventListener('click', () => {
  if (!selectedMachine) return;

  const currentBalance = balanceService.getBalance();
  const currentBet = selectedMachine.getCurrentBet();

  //Check if user has enough balance for the bet
  if (currentBalance < currentBet) {
    spinResultDisplay.textContent = "Insufficient funds!";
    spinResultDisplay.className = 'error';
    return;
  }

  const spinResult = selectedMachine.spin();
  
  balanceService.updateBalance(spinResult, selectedMachine.name);

  spinResultDisplay.textContent = `Result: ${spinResult > 0 ? 
    `You win $${spinResult}` : 
    `You lose $${Math.abs(spinResult)}`}`;
  spinResultDisplay.className = spinResult > 0 ? 'win' : 'lose';

  window.parent.postMessage({
    type: 'update-balance',
    data: {
      amount: spinResult,
      machineName: selectedMachine.name
    }
  }, '*');
});

function updateMachineDisplay() {
  if (!selectedMachine) return;
  
  machineDetails.innerHTML = `
    <h2>${selectedMachine.name}</h2>
    <p><strong>ID:</strong> ${selectedMachine.id}</p>
    <p><strong>Available Bets:</strong></p>
    <div class="bet-amounts">
      ${selectedMachine.betAmounts.map(amount => 
        `<span class="bet-amount">$${amount} </span>`
      ).join('')}
    </div>
  `;
  
  spinButton.disabled = true;
}