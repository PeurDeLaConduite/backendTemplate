// "use client";

// import { useState, useEffect } from "react";
// import { generateClient } from "aws-amplify/data";
// import type { Schema } from "@/amplify/data/resource";
// import { useAuthenticator } from "@aws-amplify/ui-react";
// import { Amplify } from "aws-amplify";
// import outputs from "@/amplify_outputs.json";
// import "@aws-amplify/ui-react/styles.css";

// Amplify.configure(outputs);

// const client = generateClient<Schema>();

// export default function ProfileForm() {
//     const { user } = useAuthenticator((context) => [context.user]);
//     const [profile, setProfile] = useState<
//         Schema["UserProfile"]["type"] | null
//     >(null);
//     const [formData, setFormData] = useState({
//         givenName: "",
//         firstName: "",
//         address: "",
//         phoneNumber: "",
//     });

//     // Charger le profil existant s'il existe
//     useEffect(() => {
//         if (user?.userId) {
//             client.models.UserProfile.list({
//                 filter: {
//                     email: { eq: user.signInDetails?.loginId ?? "" },
//                 },
//             }).then((result) => {
//                 const existing = result.data[0];
//                 if (existing) {
//                     setProfile(existing);
//                     setFormData({
//                         firstName: existing.firstName,
//                         familyName: existing.familyName,
//                         address: existing.address ?? "",
//                         phoneNumber: existing.phoneNumber ?? "",
//                     });
//                 }
//             });
//         }
//     }, [user]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const email = user?.signInDetails?.loginId ?? "";

//         if (profile) {
//             await client.models.UserProfile.update({
//                 id: profile.id,
//                 ...formData,
//             });
//             alert("Profil mis à jour !");
//         } else {
//             await client.models.UserProfile.create({
//                 email,
//                 ...formData,
//             });
//             alert("Profil créé !");
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto p-4">
//             <h1 className="text-xl font-bold mb-4">Mon Profil</h1>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <input
//                     name="givenName"
//                     value={formData.givenName}
//                     onChange={handleChange}
//                     placeholder="Prénom"
//                     className="w-full p-2 border rounded"
//                     required
//                 />
//                 <input
//                     name="familyName"
//                     value={formData.familyName}
//                     onChange={handleChange}
//                     placeholder="Nom"
//                     className="w-full p-2 border rounded"
//                     required
//                 />
//                 <input
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     placeholder="Adresse"
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     placeholder="Téléphone"
//                     className="w-full p-2 border rounded"
//                 />
//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                     {profile ? "Mettre à jour" : "Créer"}
//                 </button>
//             </form>
//         </div>
//     );
// }
