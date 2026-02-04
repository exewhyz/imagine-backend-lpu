export const getUser = (req, res) => {
  try {

  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error fetching user: ${error.message}`,
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
