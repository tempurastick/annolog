import { FaPlus } from "react-icons/fa";
import Watchlist from "../components/movies/Watchlist";
import GoalList from "../components/goals/GoalList";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
function Index() {
    const { userInfo } = useSelector((state) => state.auth);

    // status for not logged in
    if (!userInfo) {
        return (
            <>
                <div className="flex flex-col h-full justify-center md:mx-auto w-full sm:max-w-3/4">
                    <h1 className="text-2xl mb-4">AnnoLog</h1>
                    <p>
                        {" "}
                        Create a digital scrapbook that stays with you over the
                        year. <br />
                        Track goals and movies{" "}
                        <span className="opacity-60">
                            (more coming soon)
                        </span>.{" "}
                    </p>
                    <NavLink
                        to="/register"
                        className="btn btn-primary max-w-[8rem] mt-4"
                    >
                        <span className="sr-only sm:not-sr-only">Register</span>
                    </NavLink>
                </div>
            </>
        );
    }
    return (
        <>
            <h1 className="text-2xl px-4 my-4 md:mx-auto w-full sm:max-w-3/4">
                Log for the year 2026
            </h1>
            <Watchlist />
            <GoalList />
        </>
    );
}

export default Index;
