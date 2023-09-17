const checks = {
    phoneNumber: (inputtxt) =>
    {
        console.log('check phone')

      let phoneno = /^\d+$/;
         return phoneno.test(inputtxt)
      
      },
      email: (email) => {
        console.log('check email')
        return (
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(email)
      
      },
    
      username: (username) => {
        /* 
          Usernames can only have: 
          - Lowercase Letters (a-z) 
          - Numbers (0-9)
          - Dots (.)
          - Underscores (_)
        */
        const res = /^[a-z0-9_\.]+$/.exec(username);
        const valid = !!res;
        return valid;
      }
}

module.exports = checks