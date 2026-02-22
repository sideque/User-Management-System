export const emailvalidation = (email) => {
    const trimmedEmail = email?.trim();
    if (!trimmedEmail) return "Email is Required"
    const  emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailregex.test(trimmedEmail)) return "Invalid Email Formate(Email must have one @ symbol, no spaces, with a valid local part, domain, and top-level domain separated by a dot (e.g., user@domain.com).)"
}

export const Passwordvalidation = (password) => {
    const trimmedPass = password?.trim();
    if (!trimmedPass) return "Password is required";
    const passwordregex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordregex.test(trimmedPass)) return "Password must be at least 8 characters and include at least one letter, one number, and one special character (@$!%*?&)"
}

export const Namevalidation = (Name) => {
    const trimeName = Name?.trim();
    if (!trimeName) return "Name is required"
    const nameRegex = /^[A-Za-z\s]{2,}$/
    if (!nameRegex.test(trimeName)) return "The name should contain only letters, spaces, apostrophes ('), and hyphens (-), and must be at least 2 characters long."
}