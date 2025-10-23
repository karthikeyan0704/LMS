const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  try {
    const { title, author, isbn, totalCopies = 1, category } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const book = new Book({
      title,
      author,
      isbn,
      totalCopies,
      availableCopies: totalCopies,
      category
    });
    await book.save();
    res.status(201).json({ message: 'Book added', book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json({ books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.totalCopies) {
      // adjust availableCopies accordingly (do not go negative)
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
      const delta = updates.totalCopies - book.totalCopies;
      updates.availableCopies = Math.max(0, book.availableCopies + delta);
    }
    const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book updated', book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};