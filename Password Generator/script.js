const passwordField = document.getElementById('password');
const strengthButton = document.getElementById('strength');
const copyButton = document.getElementById('copy');
const resetButton = document.getElementById('reset');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const checkboxes = {
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    numbers: document.getElementById('numbers'),
    symbols: document.getElementById('symbols'),
};

const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+[]{}|;:,.<>?/`~',
};

function generatePassword() {
    let length = parseInt(lengthSlider.value);
    let charSet = '';
    if (checkboxes.uppercase.checked) charSet += characters.uppercase;
    if (checkboxes.lowercase.checked) charSet += characters.lowercase;
    if (checkboxes.numbers.checked) charSet += characters.numbers;
    if (checkboxes.symbols.checked) charSet += characters.symbols;

    if (!charSet) {
        passwordField.value = 'Select character types!';
        strengthButton.textContent = 'Weak';
        strengthButton.style.background = '#f44336';
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    passwordField.value = password;

    if (length >= 20 && charSet.length >= 30) {
        strengthButton.textContent = 'Very Strong';
        strengthButton.style.background = '#4caf50';
    } else if (length >= 12) {
        strengthButton.textContent = 'Strong';
        strengthButton.style.background = '#2196f3';
    } else {
        strengthButton.textContent = 'Weak';
        strengthButton.style.background = '#f44336';
    }
}

// Update the password length value display
lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
    generatePassword();
});

// Generate a new password on page load
generatePassword();

// Copy password to clipboard
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordField.value).then(() => {
        alert('Password copied to clipboard!');
    });
});

// Reset button to regenerate a password
resetButton.addEventListener('click', () => {
    generatePassword();
});

// Update the password when any checkbox is toggled
Object.values(checkboxes).forEach((checkbox) => {
    checkbox.addEventListener('change', generatePassword);
});

