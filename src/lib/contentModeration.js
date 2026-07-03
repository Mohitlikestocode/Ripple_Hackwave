/**
 * Content Moderation Guidelines
 * Filters inappropriate content from user input and character responses
 */

// Banned keywords/phrases - sensitive topics we want to restrict
const BANNED_KEYWORDS = [
  // Violence & harm
  'kill', 'murder', 'bomb', 'attack', 'weapon', 'gun', 'knife',
  'violence', 'harm', 'abuse', 'assault', 'rape', 'torture',
  
  // Sexual content
  'sex', 'porn', 'nude', 'xxx', 'adult', 'sexual',
  
  // Illegal activities
  'drug', 'cocaine', 'heroin', 'meth', 'illegal', 'steal', 'robbery',
  'fraud', 'scam', 'money laundering', 'bribery', 'hitman',
  
  // Hate speech & discrimination
  'racist', 'hate', 'discriminat', 'bigot', 'slur', 'supremacist',
  
  // Self-harm
  'suicide', 'self harm', 'cut myself', 'kill myself',
];

// Topics we want to restrict in this economic simulation context
const RESTRICTED_TOPICS = [
  'politics',
  'religion',
  'caste',
  'sexual',
  'violence',
  'illegal',
  'harmful',
];

/**
 * Check if text contains banned content
 * @param {string} text - The text to check
 * @returns {object} - { isAllowed: boolean, reason?: string }
 */
export function checkContentPolicy(text) {
  if (!text || typeof text !== 'string') {
    return { isAllowed: false, reason: 'Invalid input' };
  }

  const lowerText = text.toLowerCase();

  // Check for banned keywords
  for (const keyword of BANNED_KEYWORDS) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return {
        isAllowed: false,
        reason: 'Your message contains restricted content. Please keep conversations respectful.',
      };
    }
  }

  // Check for excessive length (spam prevention)
  if (text.length > 1000) {
    return {
      isAllowed: false,
      reason: 'Message is too long. Please keep it under 1000 characters.',
    };
  }

  // Check for repeated characters (spam pattern)
  if (/(.)\1{9,}/.test(text)) {
    return {
      isAllowed: false,
      reason: 'Please avoid spam patterns.',
    };
  }

  // Check for excessive emojis (spam)
  const emojiCount = (text.match(/\p{Emoji}/gu) || []).length;
  if (emojiCount > 15) {
    return {
      isAllowed: false,
      reason: 'Too many emojis. Please use fewer special characters.',
    };
  }

  return { isAllowed: true };
}

/**
 * Validate user input before sending
 * @param {string} userInput - The user's message
 * @returns {object} - { valid: boolean, error?: string }
 */
export function validateUserInput(userInput) {
  // Check if empty
  if (!userInput || userInput.trim().length === 0) {
    return { valid: false, error: 'Please enter a message.' };
  }

  // Check if too short
  if (userInput.trim().length < 2) {
    return { valid: false, error: 'Message is too short.' };
  }

  // Check content policy
  const policyCheck = checkContentPolicy(userInput);
  if (!policyCheck.isAllowed) {
    return { valid: false, error: policyCheck.reason };
  }

  return { valid: true };
}

/**
 * Sanitize character response (filter out any inappropriate content that may slip through)
 * @param {string} response - The character's response
 * @returns {object} - { text: string, blocked: boolean, reason?: string }
 */
export function sanitizeCharacterResponse(response) {
  if (!response || typeof response !== 'string') {
    return {
      text: 'I apologize, I could not generate a response. Please try another question.',
      blocked: true,
      reason: 'Invalid response',
    };
  }

  const policyCheck = checkContentPolicy(response);
  
  if (!policyCheck.isAllowed) {
    return {
      text: 'I cannot discuss that topic right now. Let\'s talk about something related to daily life and economy.',
      blocked: true,
      reason: policyCheck.reason,
    };
  }

  return { text: response, blocked: false };
}

/**
 * Get moderation guidelines to display to users
 * @returns {string}
 */
export function getModerationGuidelines() {
  return `
    💬 Community Guidelines:
    • Keep conversations respectful and constructive
    • Focus on economic and social topics
    • Avoid violence, hate speech, or illegal content
    • No harassment, discrimination, or sexual content
    • Questions about daily life and livelihoods are welcome
  `;
}
