import WatchlistEl from "./WatchlistEl";
import { useGetWatchlistsQuery } from "../../slices/watchlistsApiSlice";

const Watchlist = () => {
    const { data: watchlists, isLoading, isError } = useGetWatchlistsQuery();

    // TODO: create layout for error
    if (isError) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return (
            <>
                <div className="list bg-base-200 rounded-box shadow-md">
                    <ul className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                        Watchlist
                        <li className="skeleton h-24"></li>
                        <li className="skeleton h-24"></li>
                    </ul>
                </div>
            </>
        );
    }

    return (
        <div className="list bg-base-200 rounded-box shadow-md">
            <ul className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                Title of this list
                {/* <WatchlistEl /> */}
                {watchlists.map((watchlist) => (
                    <WatchlistEl watchlist={watchlist} key={watchlist._id} />
                ))}
            </ul>
        </div>
    );
};

export default Watchlist;
