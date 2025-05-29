const bcrypt = require('bcryptjs');

const plainPassword = 'Store@123';
const saltRounds = 10; // Adjust salt rounds as needed

bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
  if (err) {
    console.error(err);
  } else {
    console.log('Hashed Password:', hash);
  }
}); 