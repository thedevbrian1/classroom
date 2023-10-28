export default function Button({ value, children }) {
    return (
        <button
            type="submit"
            name="_action"
            value={value}
            className="bg-brand-orange rounded text-white px-4 py-2"
        >
            {children}
        </button>
    );
}