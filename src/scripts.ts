import axios from 'axios';

function validateForm(): boolean {
  const requiredFields: string[] = ["first_name", "last_name", "email", "password", "country"];
  const genderMale: boolean = (document.getElementById("male") as HTMLInputElement).checked;
  const genderFemale: boolean = (document.getElementById("female") as HTMLInputElement).checked;
  const termsChecked: boolean = (document.getElementById("terms") as HTMLInputElement).checked;

  for (const field of requiredFields) {
    const inputField = document.getElementById(field) as HTMLInputElement;
    if (!inputField.value.trim()) {
      alert("Please fill out all required fields.");
      return false;
    }
  }

  if (!genderMale && !genderFemale) {
    alert("Please select a gender.");
    return false;
  }

  if (!termsChecked) {
    alert("Please agree to the terms and conditions.");
    return false;
  }

  return true;
}

const form = document.getElementById('registrationForm') as HTMLFormElement;

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  const data: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    if (key === "password") {
      data[key] = "********";
    } else {
      data[key] = value;
    }
  });

  axios.post('http://localhost:3004/posts', data)
    .then(response => {
      console.log('Form data submitted successfully!', response);
    })
    .catch(error => {
      console.error('Error submitting form data:', error);
    });
});

document.addEventListener("keypress", function (event: KeyboardEvent): void {
  if (event.key === "Enter") {
    event.preventDefault();
    if (validateForm()) {
      const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
    }
  }
});