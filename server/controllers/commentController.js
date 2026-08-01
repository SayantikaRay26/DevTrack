const { addComment, getCommentsByBugId} = require("../models/commentModel");
const { getBugById } = require("../models/bugModel");

// Add a comment to a bug
const createComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;

        const userId = req.user.id;

        if (!comment) {
            return res.status(400).json({
                message: "Comment is required."
            });
        }

        const [bugs] = await getBugById(id);

        if (bugs.length === 0) {
            return res.status(404).json({
                message: "Bug not found."
            });
        }

        await addComment(id, userId, comment);

        res.status(201).json({
            message: "Comment added successfully!"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
// Get comments for a bug
const fetchComments = async (req, res) => {
    try {
        const { id } = req.params;

        const [bugs] = await getBugById(id);

        if (bugs.length === 0) {
            return res.status(404).json({
                message: "Bug not found."
            });
        }

        const [comments] = await getCommentsByBugId(id);

        res.status(200).json(comments);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    createComment,
    fetchComments
};
