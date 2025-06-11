export const GifPageSkeleton = () => (
    <div className="max-w-[1200px] mx-auto mt-8 px-4 animate-pulse">
        <div className="h-10 bg-gray-700 rounded w-3/4 mx-auto mb-6" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-full md:w-[200px] flex flex-col gap-4">
                <div className="p-3 rounded-lg bg-gray-800 shadow-md">
                    <div className="flex gap-2 items-center">
                        <div className="w-12 h-12 bg-gray-700 rounded-full" />
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                            <div className="w-24 h-4 bg-gray-600 rounded" />
                            <div className="w-16 h-3 bg-gray-500 rounded" />
                        </div>
                    </div>
                    <div className="mt-2 h-3 w-full bg-gray-600 rounded" />
                </div>

                <div className="h-16 bg-gray-700 rounded-lg shadow-sm" />
            </div>

            <div className="flex-1 flex flex-col gap-4 items-center w-full">
                <div className="w-full max-w-xl h-[360px] bg-gray-700 rounded-2xl" />
                <div className="flex flex-wrap gap-2 mt-2 w-full justify-center">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-20 h-6 bg-gray-600 rounded-full" />
                    ))}
                </div>
            </div>

            <div className="w-full md:w-[200px] flex flex-col gap-3 items-center md:items-start">
                <div className="w-3/4 md:w-full h-10 bg-gray-600 rounded" />
                <div className="w-3/4 md:w-full h-10 bg-gray-600 rounded" />
            </div>
        </div>

        <div className="mt-8 text-center max-w-lg mx-auto px-4">
            <div className="w-full h-6 bg-gray-600 mb-4 rounded" />
            <div className="w-full h-10 bg-gray-700 mb-4 rounded" />
            <div className="w-full h-6 bg-gray-600 mb-4 rounded" />
            <div className="w-full h-10 bg-gray-700 rounded" />
        </div>

        <div className="m-auto mt-4 text-lg w-full max-w-xs sm:max-w-md lg:max-w-lg rounded-lg p-4 bg-gray-800">
            <div className="w-32 h-5 bg-gray-600 mb-4 rounded" />
            <div className="h-4 w-1/2 bg-gray-700 mb-2 rounded" />
            <div className="h-4 w-1/3 bg-gray-700 mb-2 rounded" />
            <div className="h-4 w-1/4 bg-gray-700 rounded" />
        </div>

        <div className="mt-8 px-4 max-w-[1200px] mx-auto">
            <div className="h-8 w-40 bg-gray-600 rounded mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-40 bg-gray-700 rounded-lg" />
                ))}
            </div>
        </div>
    </div>
);
