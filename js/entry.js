const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyx2C19BTn5Jz3P0NSmO6E033oZHplJ5NlmyaSesjI_82kyjYbxX8dyKd5M2I3rtRpN/exec";

const entryForm = document.getElementById("entryForm");
const formMessage = document.getElementById("formMessage");
const submitButton = document.getElementById("submitButton");

if (entryForm) {
  entryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (GAS_WEB_APP_URL === "YOUR_GAS_WEB_APP_URL_HERE") {
      formMessage.textContent = "送信先URLが未設定です。管理者にお問い合わせください。";
      formMessage.className = "form-message error";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "送信中...";
    formMessage.textContent = "";
    formMessage.className = "form-message";

    fetch(GAS_WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      body: new FormData(entryForm)
    })
      .then(() => {
        formMessage.textContent = "エントリーを受け付けました。ありがとうございます！";
        formMessage.className = "form-message success";
        entryForm.reset();
        submitButton.textContent = "送信済み";
      })
      .catch((error) => {
        console.error("Entry form submission failed:", error);
        formMessage.textContent = "送信できませんでした。通信環境をご確認のうえ、もう一度お試しください。";
        formMessage.className = "form-message error";
        submitButton.disabled = false;
        submitButton.textContent = "エントリーする";
      });
  });
}
