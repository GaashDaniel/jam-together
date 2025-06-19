import JamEvent from '../models/JamEvent.js';
export const toggleLike = async (req, res) => {
    const event = await JamEvent.findById(req.params.id);
    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }
    await event.toggleLike(req.user._id);
    res.json({
        message: 'Like toggled',
        likes: event.likes.length,
    });
};