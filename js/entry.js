const GAS_WEB_APP_URL = "YOUR_GAS_WEB_APP_URL_HERE";

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
      body: new FormData(entryForm)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result !== "success") throw new Error("送信エラー");
        formMessage.textContent = "送信が完了しました。ありがとうございます。";
        formMessage.className = "form-message success";
        entryForm.reset();
      })
      .catch(() => {
        formMessage.textContent = "送信に失敗しました。時間をおいて再度お試しください。";
        formMessage.className = "form-message error";
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = "エントリーする";
      });
  });
}
