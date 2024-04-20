/* ####################################
            BASIC USER ROUTES
#################################### */

// POST /api/auth/register
export const register = async (req, res) => {
    res.json('Register');
  };
  
  // POST /api/auth/login
  export const login = async (req, res) => {
    res.json('Login');
  };
  
  // GET /api/auth/user/:username
  export const getUser = async (req, res) => {
    res.json('Get User');
  };
  
  // PUT /api/auth/updateUser
  export const updateUser = async (req, res) => {
    res.json('Update User');
  };
  
  /* ####################################
          RESET PASSWORD ROUTES
  #################################### */
  
  // GET /api/auth/generateOTP
  export const generateOTP = async (req, res) => {
    res.json('Generate OTP');
  };
  
  // GET /api/auth/verifyOTP
  export const verifyOTP = async (req, res) => {
    res.json('Verify OTP');
  };
  
  // GET /api/auth/createResetSession
  export const createResetSession = async (req, res) => {
    res.json('Create Reset Session');
  };
  
  // PUT /api/auth/createResetSession
  export const resetPassword = async (req, res) => {
    res.json('Reset Password');
  };