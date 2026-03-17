import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileNavbar from "../components/navbars/ProfileNavbar";
import ProfileFooter from "../components/footers/ProfileFooter";

export default function Profile() {
  const { user, loading, updateProfile } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formSectionRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    mobile: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    address: "",
    state: "",
    district: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        age: user.age || "",
        gender: user.gender || "",
        mobile: user.mobile || "",
        address: user.address || "",
        state: user.state || "",
        district: user.district || "",
        pincode: user.pincode || "",
      }));
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);
    }
  };

  const handleEditClick = () => {
    // Scroll to form section
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const handleSettingsClick = () => {
    alert("Settings coming soon!");
  };

  const inputClass =
    "w-full p-2 border border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear success message when user edits
    if (submitSuccess) setSubmitSuccess("");
  };

  const validate = () => {
    const newErrors = {};

    // Email format rule (only if user entered something)
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Age rule (> 0) only if user entered something
    if (form.age && Number(form.age) <= 0) {
      newErrors.age = "Age must be greater than 0";
    }

    // Mobile rule: must be exactly 10 digits (only if user entered something)
    if (form.mobile && !/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    // Password rules (only if user tries to change password)
    if (form.currentPassword || form.newPassword || form.confirmPassword) {
      if (!form.currentPassword) {
        newErrors.currentPassword = "Enter current password";
      }
      if (!form.newPassword) {
        newErrors.newPassword = "Enter new password";
      }
      if (form.newPassword !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);
      // Prepare data for update
      const updateData = {
        name: form.name,
        email: form.email,
        age: form.age,
        gender: form.gender,
        mobile: form.mobile,
        address: form.address,
        state: form.state,
        district: form.district,
        pincode: form.pincode,
      };

      // Add password change if provided
      if (form.newPassword) {
        updateData.currentPassword = form.currentPassword;
        updateData.newPassword = form.newPassword;
      }

      await updateProfile(updateData);
      setSubmitSuccess("Profile updated successfully ✅");
      // Clear password fields after successful submit
      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      setSubmitError(err.message || "Failed to update profile. Please try again.");
      console.error("Profile update error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <ProfileNavbar />

      <div className="p-6 max-w-5xl mx-auto">
        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <p className="text-gray-600 mt-4">Loading profile...</p>
          </div>
        ) : (
          <>
            {/* Profile Card - Shows user info with avatar */}
            {user && (
              <ProfileCard
                user={user}
                onEditClick={handleEditClick}
                onSettingsClick={handleSettingsClick}
              />
            )}

            {/* Edit Form Section */}
            <div ref={formSectionRef} className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Edit Profile Information</h2>

              {/* Error Message */}
              {submitError && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {submitError}
                </div>
              )}

              {/* Success Message */}
              {submitSuccess && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  {submitSuccess}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      className={inputClass}
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      className={inputClass}
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Age</label>
                    <input
                      name="age"
                      type="number"
                      placeholder="Enter your age"
                      className={inputClass}
                      value={form.age}
                      onChange={handleChange}
                    />
                    {errors.age && (
                      <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select
                      name="gender"
                      className={inputClass}
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select your gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Mobile</label>
                    <input
                      name="mobile"
                      type="text"
                      placeholder="Enter your mobile number"
                      className={inputClass}
                      value={form.mobile}
                      onChange={handleChange}
                      maxLength={10}
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                    )}
                  </div>
                </div>

                {/* Change Password Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Change Password</h3>
                  <p className="text-sm text-gray-600 mb-4">Leave blank if you don't want to change your password</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Current Password
                      </label>
                      <input
                        name="currentPassword"
                        type="password"
                        placeholder="Enter current password"
                        className={inputClass}
                        value={form.currentPassword}
                        onChange={handleChange}
                      />
                      {errors.currentPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.currentPassword}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        New Password
                      </label>
                      <input
                        name="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        className={inputClass}
                        value={form.newPassword}
                        onChange={handleChange}
                      />
                      {errors.newPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.newPassword}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Confirm Password
                      </label>
                      <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Re-enter new password"
                        className={inputClass}
                        value={form.confirmPassword}
                        onChange={handleChange}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Address Information</h3>
                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <textarea
                      name="address"
                      rows="3"
                      placeholder="Enter your full address"
                      className={inputClass}
                      value={form.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input
                      name="state"
                      placeholder="Enter your state"
                      className={inputClass}
                      value={form.state}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">District</label>
                    <input
                      name="district"
                      placeholder="Enter your district"
                      className={inputClass}
                      value={form.district}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Pincode</label>
                    <input
                      name="pincode"
                      placeholder="Enter your pincode"
                      className={inputClass}
                      value={form.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Save */}
                <div className="mt-8 flex gap-3 justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>

      <ProfileFooter />
    </div>
  );
}
