let output = `dist/${process.env.REMAX_PLATFORM}`;
if (process.env.NODE_ENV === 'production') {
  try {
    const fs = require('fs');
    fs.rmdirSync(output);
  } catch (error) {
    
  }
}

module.exports = {
  one: true,
  output
};
