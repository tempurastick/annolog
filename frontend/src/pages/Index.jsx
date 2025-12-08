import { FaPlus } from "react-icons/fa";
import AddNewGoal from "../components/goals/AddNewGoal";
function Index() {
    return (
        <>
            <h2>Create List:</h2>
            <div className="flex gap-2 flex-wrap">
                {/* probably render current elements here with edit button  */}
                <AddNewGoal />
                <a role="button" className="btn btn-block btn-outline">
                    <FaPlus />
                    Create new List
                </a>
                <a role="button" className="btn btn-block">
                    <FaPlus />
                    Create new Tracker
                </a>
                <a role="button" className="btn btn-block">
                    <FaPlus />
                    Create new Gallery
                </a>
            </div>
            <h2>Current Lists:</h2>
            <p>Element -- edit</p>
        </>
    );
}

export default Index;
