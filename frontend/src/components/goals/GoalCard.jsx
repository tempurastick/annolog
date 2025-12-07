import React from "react";

const GoalCard = () => {
    return (
        <div className="card w-96 bg-base-200 card-sm shadow-sm">
            <div className="card-body">
                {/* category? */}
                <div className="badge badge-soft badge-primary">Primary</div>
                <div className="card-body-inner flex flex-row">
                    <div className="card-actions pr-4">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                        />
                    </div>
                    <h2 className="justify-self-end card-title font-normal">
                        Goal Name
                    </h2>
                </div>
                {/* deadline (optional) */}
                <div className="card-footer text-right">
                    <span className="badge badge-sm">01/01/2026</span>
                </div>
            </div>
        </div>
    );
};

export default GoalCard;
