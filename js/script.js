'use script';
const promoActions = document.querySelector('#promoActions');
const promoValue = document.querySelector('#promoValue');
const promoCode = document.querySelector('#promoCode');
const promoCopyBtn = document.querySelector('#promoCopyBtn');


promoCode.value = 'ДІАМАНТКОД55'
promoValue.textContent =  promoCode.value;


if(!promoCode.value) {
  promoActions.hidden = true;
}

async function writeClipboardText() {
  try {
    await navigator.clipboard.writeText(promoCode.value);
  } catch (error) {
    console.error(error.message);
  }
}

promoCopyBtn.addEventListener('click',  writeClipboardText)