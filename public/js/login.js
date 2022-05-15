async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.getElementById('email-login').value.trim();
    const password = document.getElementById('password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        if(location.pathname === "/login"){
          document.location.replace(`/characters/`);
        } else {
          location.reload();
        }
      } else {
        document.getElementById('loginError').innerText = 'Invalid email or password.';
      }
    }
  }
  
  async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.getElementById('username-signup').value.trim();
    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();
  
    try {
      // grecaptcha.ready( async function() {
      //   grecaptcha.execute('6LfGds4fAAAAAMkLeNvizoDylbBPZbYGLuBgOOS7', {action: 'submit'})
      //   .then( async function(token) {
          event.preventDefault();
          if (username && email && password) {
            const response = await fetch('/api/users', {
              method: 'post',
              body: JSON.stringify({
                // token,
                username,
                email,
                password
              }),
              headers: { 'Content-Type': 'application/json' }
            });
  
            if (response.ok) {
              if(location.pathname === "/login"){
                document.location.replace('/');
              } else {
                console.log("response: ", response)
                location.reload();
              }
            } else {
              document.getElementById('loginError').innerText = 'Sign up failed. Please check username, email, or password length.';
            }
          }
  
    //   });
    // });
    } catch (error) {
      console.log(error)
      document.getElementById('loginError').innerText = 'Sign up failed. Please check username, email, or password length.';
    }
  
  }
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);