export const getUser = (req, res) => {
  try {

  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error fetching user: ${error.message}`,
    });
  }
};
export const getAllUsers = (req, res) => {
  try {

  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error fetching all users: ${error.message}`,
    });
  }
};

export const register = (req, res) => {
    try {
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error while creating user: ${error.message}`,
    });
  }
};

export const login = (req, res) => {
    try {
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error while login user: ${error.message}`,
    });
  }
};
export const updateUser = (req, res) => {
    try {
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error while updating user: ${error.message}`,
    });
  }
};
export const deleteUser = (req, res) => {
    try {
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error while deleting user: ${error.message}`,
    });
  }
};
