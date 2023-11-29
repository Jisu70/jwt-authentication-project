const API_URL = `http://localhost:3000`;
console.log("hello login script");
async function chceckUser() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  if (email.value.trim() === "" || password.value.trim() === "") {
    alert("Please fill in all the required fields.");
    return;
  }
  const userData = {
    email: email.value,
    password: password.value,
  };
  try {
    console.log(userData);
    const response = await axios.post(`${API_URL}/api/login`, userData);
    if (response.status === 200) {
      alert("Login Successfully ");
      if(localStorage.getItem("token")){
        localStorage.removeItem("token") ;
      }
     localStorage.setItem('token', response.data.token) ;
    } else {
      alert("Problem in Signup ");
    }
  } catch (error) {
    console.log(" Error Is :", error);
  }
}
const botam = document.getElementById("btn");
botam.addEventListener("click", (event) => {
  event.preventDefault();
  chceckUser();
});