function showRuncis(): void {
    const registrationForm = document.querySelector(".registration-form") as HTMLElement;
    const runcisImage = document.getElementById("Runcis") as HTMLElement;
  
    registrationForm.style.display = "none";
    runcisImage.style.display = "block";
  }
  
  document.addEventListener("keypress", function (event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (validateForm()) {
        showRuncis();
      }
    }
  });
  
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