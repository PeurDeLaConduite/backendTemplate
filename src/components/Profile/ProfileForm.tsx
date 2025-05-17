type Props = {
    formData: {
        firstName: string;
        familyName: string;
        address: string;
        phoneNumber: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    isEdit: boolean;
    onCancel: () => void;
};

export default function ProfileForm({
    formData,
    handleChange,
    handleSubmit,
    isEdit,
    onCancel
}: Props) {
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            }}
            className="space-y-3"
        >
            <input
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />
            <input
                name="familyName"
                placeholder="Nom"
                value={formData.familyName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />
            <input
                name="address"
                placeholder="Adresse"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <input
                name="phoneNumber"
                placeholder="Téléphone"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                    {isEdit ? "Enregistrer" : "Créer"}
                </button>
                {isEdit && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="border px-3 py-1 rounded"
                    >
                        Annuler
                    </button>
                )}
            </div>
        </form>
    );
}
