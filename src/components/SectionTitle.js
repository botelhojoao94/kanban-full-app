export default function SectionTitle(props) {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex justify-between">
                <h1 className="text-3xl font-bold text-gray-700">{props.title}</h1>
            </div>
        </header>
    )
}