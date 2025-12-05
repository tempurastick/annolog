import { Goal } from "../model/goalModel.js";

// @desc Get all goals
// @route GET /api/goals

export const getGoals = async (req, res, next) => {
    const goals = await Goal.find();
    // get all goals
    res.status(200).json(goals);
};

// @desc Get single goal
// @route GET /api/goal/:d

export const getGoal = async (req, res, next) => {
    const goal = await Goal.findById(req.params.id);

    if (goal) {
        res.status(200).json(goal);
    } else {
        const error = new Error(`A goal with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }
};

// @desc create  single goal
// @route goal /api/goal/:d

export const createGoal = async (req, res, next) => {
    console.log(req.body);

    if (!req.body.text) {
        const error = new Error("Please include a title");
        error.status = 400;
        return next(error);
    }

    const newGoal = await Goal.create({
        // id: goals.length + 1,
        text: req.body.text,
    });

    res.status(200).json(newGoal);
};

// @desc create  update goal
// @route PUT /api/goals/:d

export const updateGoal = async (req, res, next) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        const error = new Error(
            `A goal with the id of ${req.params.id} was not found`
        );
        error.status = 404;
        return next(error);
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedGoal);
};

// @desc delete goal
// @route DELETE /api/goals/:d
export const deleteGoal = async (req, res, next) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        const error = new Error(`A goal with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }

    await Goal.deleteOne(goal);
    res.status(200).json({ id: req.params.id });
};
