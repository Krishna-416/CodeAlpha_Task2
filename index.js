const expressionEl = document.getElementById('expression');
    const resultEl = document.getElementById('result');

    let currentInput = '';
    let isEvaluated = false;

    function appendInput(val) {
      if (isEvaluated && !isOperator(val)) {
        currentInput = val;
        isEvaluated = false;
      } else {
        isEvaluated = false;
        if (isOperator(val) && isOperator(currentInput.slice(-1))) {
          currentInput = currentInput.slice(0, -1) + val;
        } else {
          currentInput += val;
        }
      }
      updateDisplay();
    }

    function isOperator(char) {
      return ['+', '-', '*', '/', '%'].includes(char);
    }

    function clearAll() {
      currentInput = '';
      expressionEl.textContent = '';
      resultEl.textContent = '0';
      isEvaluated = false;
    }

    function deleteLast() {
      if (isEvaluated) {
        clearAll();
        return;
      }
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
    }

    function updateDisplay() {
      const formattedInput = currentInput
        .replace(/\*/g, ' × ')
        .replace(/\//g, ' ÷ ')
        .replace(/\+/g, ' + ')
        .replace(/\-/g, ' − ');

      resultEl.textContent = formattedInput || '0';

      if (currentInput && !isOperator(currentInput.slice(-1))) {
        try {
          const evalResult = eval(currentInput);
          if (evalResult !== undefined && evalResult !== Infinity && !isNaN(evalResult)) {
            expressionEl.textContent = '= ' + Number(evalResult.toFixed(8)).toString();
          } else {
            expressionEl.textContent = '';
          }
        } catch {
          expressionEl.textContent = '';
        }
      } else {
        expressionEl.textContent = '';
      }
    }

    function calculate() {
      if (!currentInput) return;

      try {
        const evalResult = eval(currentInput);
        if (evalResult === Infinity || isNaN(evalResult)) {
          resultEl.textContent = 'Error';
          expressionEl.textContent = 'Cannot divide by 0';
        } else {
          const finalResult = Number(evalResult.toFixed(8)).toString();
          expressionEl.textContent = currentInput
            .replace(/\*/g, ' × ')
            .replace(/\//g, ' ÷ ')
            .replace(/\-/g, ' − ') + ' =';
          resultEl.textContent = finalResult;
          currentInput = finalResult;
          isEvaluated = true;
        }
      } catch (err) {
        resultEl.textContent = 'Error';
        expressionEl.textContent = 'Invalid Expression';
      }
    }

    document.addEventListener('keydown', (e) => {
      let key = e.key;
      if (key === 'Enter') key = 'Enter';
      if (key === 'c' || key === 'C') key = 'Escape';

      const btn = document.querySelector(`button[data-key="${key}"]`);
      if (btn) {
        btn.classList.add('pressed');
        btn.click();
        setTimeout(() => btn.classList.remove('pressed'), 150);
      }
    });