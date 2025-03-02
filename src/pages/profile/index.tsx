import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import InputComponent from "@/components/ui/Input";
import { updateUser } from "@/client-api-service/user.service";
import { Navigate } from "react-router";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const saveProfile = async () => {
    // Implement save logic, e.g., API call to update user profile
    setIsEditing(false);
    await updateUser(user?.uid!, profileData);
    console.log("Profile saved:", profileData);
  };

  useEffect(() => {
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
    });
  }, [user, isEditing]);

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div>
        <p className="text-lg font-medium">Name: {profileData.name}</p>
        <p className="text-lg font-medium">Email: {profileData.email}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      </div>

      <Transition show={isEditing} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsEditing(false)}
        >
          <div className="flex items-center justify-center min-h-screen px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-white/10 backdrop-blur-md" />
            </Transition.Child>
            <div className="bg-white rounded-lg max-w-sm mx-auto p-6 z-20">
              <Dialog.Title className="text-xl font-bold">Edit Profile</Dialog.Title>
              <div className="mt-4">
                <InputComponent
                  label="Name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  name="name"
                />
                <InputComponent
                  label="Email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  name="email"
                />
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={saveProfile}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
