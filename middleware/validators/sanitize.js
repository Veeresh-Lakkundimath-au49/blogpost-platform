module.exports.name=(name)=>{
  const cleanedName = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return cleanedName.length > 0 ? cleanedName : null;
};

module.exports.email = (email)=>{

  const cleanedEmail = email.replace(/[^a-zA-Z0-9@.]/g, '').toLowerCase();
  
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  // Return result
  return emailRegex.test(cleanedEmail) ? cleanedEmail : null;
};