const API_URL = `http://localhost:3000/api`;
console.log("hello script");
async function signUpUser() {
  console.log("clicked")
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  if (name.value.trim() === "" || email.value.trim() === "") {
    alert("Please fill in all the required fields.");
    return;
  }
  const userData = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  try {
    const response = await axios.post(`${API_URL}/savedata`, userData);
    console.log(response)
    if (response.status === 200) {
      alert("Signup User Successfully ");
    }else{
      alert("Problem in Signup ");
    }
  } catch (error) {
    console.log(" Error Is :", error);
  }
}

const botam = document.getElementById("btn");
botam.addEventListener("click", (event) => {
  event.preventDefault();
  signUpUser();
});