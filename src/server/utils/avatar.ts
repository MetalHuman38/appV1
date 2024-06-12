// Import necessary modules
import crypto from 'crypto';

// Function to generate a hash from a string
export function generateHash(str: string): string {
  return crypto.createHash('md5').update(str).digest('hex');
}

// Function to generate an avatar URL based on user initials
export function generateAvatarUrl(name: string): string {
  // Extract the initials from the user's name
  const initials = name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('');

  // Use a service that generates avatars with initials
  const size = 200; // Specify the desired size of the avatar
  const backgroundColor = 'random'; // Use a random background color
  const textColor = 'fff'; // Use white text color
  const baseUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&size=${size}&background=${backgroundColor}&color=${textColor}`;
  return baseUrl;
}
// Example usage
const userName = 'John Doe';
const avatarUrl = generateAvatarUrl(userName);
console.log(avatarUrl); // Output: "https://www.gravatar.com/avatar/<hash>?s=200&d=identicon"
