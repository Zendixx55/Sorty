document.getElementById("login-btn").addEventListener("click", () => {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
  });
  
  document.getElementById("signup-btn").addEventListener("click", () => {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("platform-screen").classList.remove("hidden");
  });
  