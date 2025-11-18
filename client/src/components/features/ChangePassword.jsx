import React, { useState } from 'react';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    retypePassword: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!formData.oldPassword) errs.oldPassword = 'Required.';
    if (!formData.newPassword) errs.newPassword = 'Required.';
    if (!formData.retypePassword) errs.retypePassword = 'Required.';
    if (
      formData.newPassword &&
      formData.retypePassword &&
      formData.newPassword !== formData.retypePassword
    ) {
      errs.retypePassword = 'Passwords do not match.';
    }
    return errs;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);
  setSubmitted(true);

  if (Object.keys(validationErrors).length === 0) {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await fetch('http://localhost:5000/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.user_id, // or emp_codeno
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Password changed successfully!');
        setFormData({ oldPassword: '', newPassword: '', retypePassword: '' });
        setSubmitted(false);
        
        // Redirect to login page
        window.location.href = 'http://localhost:3000/';
      } else {
        alert(result.message || 'Password change failed.');
      }
    } catch (err) {
      alert('Server error. Try again later.');
      console.error(err);
    }
  }
};


  return (
    <div className="taskview p-6">
      <div className="card max-w-xl mx-auto shadow-md rounded">
        <div className="card-body p-6">
          <h4 className="text-xl font-bold mb-6">Change Password</h4>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Old Password */}
            <div>
              <label className="block font-medium mb-1">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {submitted && errors.oldPassword && (
                <p className="text-red-600 text-sm">{errors.oldPassword}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block font-medium mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {submitted && errors.newPassword && (
                <p className="text-red-600 text-sm">{errors.newPassword}</p>
              )}
            </div>

            {/* Retype Password */}
            <div>
              <label className="block font-medium mb-1">Retype Password</label>
              <input
                type="password"
                name="retypePassword"
                value={formData.retypePassword}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {submitted && errors.retypePassword && (
                <p className="text-red-600 text-sm">{errors.retypePassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#2e5d95] text-white px-6 py-2 rounded font-semibold hover:bg-blue-800"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
