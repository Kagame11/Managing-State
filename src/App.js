import { useState } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    showLoadingMessage(); // Use showLoadingMessage function
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    } finally {
      hideLoadingMessage(); // Use hideLoadingMessage function
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  // Define showLoadingMessage function
  function showLoadingMessage() {
    const loadingMessage = document.getElementById('loading');
    if (loadingMessage) {
      loadingMessage.style.display = 'block';
    }
  }

  // Define hideLoadingMessage function
  function hideLoadingMessage() {
    const loadingMessage = document.getElementById('loading');
    if (loadingMessage) {
      loadingMessage.style.display = 'none';
    }
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>In which city is there a billboard that turns air into drinkable water</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={answer.length === 0 || status === 'submitting'}>
          Submit
        </button>
        {error !== null && <p className="Error">{error.message}</p>}
        <p id="loading" style={{ display: 'none' }}>Loading....</p>
        <p id="error" style={{ display: 'none', color: 'red' }}></p>
      </form>
    </>
  );
}

function submitForm(answer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima';
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}
