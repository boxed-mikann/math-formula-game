import katex from 'katex';

/**
 * Normalize HTML by removing whitespace and converting to lowercase
 */
function normalizeHTML(html) {
  return html
    .replace(/\s+/g, '') // Remove all whitespace
    .replace(/<!--.*?-->/g, '') // Remove comments
    .toLowerCase(); // Convert to lowercase
}

/**
 * Check if user's LaTeX input matches the correct answer
 */
export function checkAnswer(userInput, correctAnswer, acceptableAnswers = []) {
  try {
    // Render user input
    const userRendered = katex.renderToString(userInput, {
      throwOnError: false,
      output: 'html'
    });
    
    // Render correct answer
    const correctRendered = katex.renderToString(correctAnswer, {
      throwOnError: false,
      output: 'html'
    });
    
    // Normalize and compare
    const normalizedUser = normalizeHTML(userRendered);
    const normalizedCorrect = normalizeHTML(correctRendered);
    
    // Check exact match
    if (normalizedUser === normalizedCorrect) {
      return { correct: true, method: 'exact' };
    }
    
    // Check acceptable alternatives
    for (const acceptable of acceptableAnswers) {
      const acceptableRendered = katex.renderToString(acceptable, {
        throwOnError: false,
        output: 'html'
      });
      const normalizedAcceptable = normalizeHTML(acceptableRendered);
      
      if (normalizedUser === normalizedAcceptable) {
        return { correct: true, method: 'acceptable' };
      }
    }
    
    return { correct: false };
  } catch (error) {
    return { correct: false, error: true };
  }
}

/**
 * Validate if input is valid LaTeX
 */
export function validateInput(input) {
  if (!input || input.trim() === '') {
    return { 
      valid: false, 
      message: '入力してください' 
    };
  }
  
  try {
    katex.renderToString(input, { throwOnError: true });
    return { valid: true };
  } catch (error) {
    return { 
      valid: false, 
      message: 'LaTeX形式が正しくありません',
      detail: error.message
    };
  }
}
