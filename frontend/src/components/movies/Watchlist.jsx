import WatchlistEl from "./WatchlistEl";
import AddMovie from "./AddMovie";
import { useGetWatchlistsQuery } from "../../slices/watchlistsApiSlice";

const Watchlist = () => {
    const { data: watchlists, isLoading, isError } = useGetWatchlistsQuery();

    if (watchlists?.length == 0) {
        console.log(watchlists);
        return (
            <>
                <div className="p-4  w-full sm:max-w-3/4 mx-auto">
                    <h2 className="text-xl">Watchlist</h2>
                    <p>Get started by adding a movie:</p>
                    <br />
                    <AddMovie btnClass="btn btn-primary w-fit" />
                </div>
            </>
        );
    }
    // TODO: create layout for error
    if (isError) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return (
            <>
                <div className="list bg-base-200 rounded-box shadow-md w-full sm:max-w-3/4 mx-auto">
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
        <>
            <h2 className="text-xl px-4 mt-8 mb-4 md:mx-auto w-full sm:max-w-3/4">
                Movies
            </h2>
            <div className="list bg-base-200 rounded-box shadow-md mx-4 sm:w-full sm:max-w-3/4 sm:mx-auto mb-4">
                <ul className="p-4 pb-2 text-xs tracking-wide">
                    Watchlist
                    {/* <WatchlistEl /> */}
                    {watchlists.map((watchlist) => (
                        <WatchlistEl
                            watchlist={watchlist}
                            key={watchlist._id}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Watchlist;
