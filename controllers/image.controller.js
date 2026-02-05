export const getAllImages = (req, res) => {
  try {


  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error fetching all images: ${error.message}`,
    });
  }
}
export const generateImages = (req, res) => {
  try {


  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error generating images: ${error.message}`,
    });
  }
}