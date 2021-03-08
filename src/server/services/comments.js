const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const User = require('../models/User');
const Link = require('../models/Link');
const { findUserById } = require('./user');
const { findLinkById } = require('./link');

/**
 * Retrieve comment by id.
 * @param {String} id
 */
const findCommentById = async (id) =>
  Comment.findById(mongoose.Types.ObjectId(id));

/**
 * Service to create new link
 * @param {Object} data
 */
const createCommentService = async (data) => {
  const comment = new Comment(data);
  const savedComment = await comment.save();

  if (savedComment) {
    const user = await findUserById(data.author);
    const link = await findLinkById(data.link);

    if (user && link) {
      user.comments.push(savedComment._id);
      link.comments.push(savedComment._id);
      await user.save();
      await link.save();
    }

    await Comment.populate(savedComment, {
      path: 'author',
      select:
        '_id firstname lastname brandname username image prominent verified',
    });

    const objComment = {
      ...savedComment._doc,
      isCurrentUserAuthor: true,
      likesCount: 0,
      isCurrentUserLiked: false,
    };

    delete objComment.likes;
    return objComment;
  }

  throw new Error('Failed to add resource. Our team is working on it.');
};

/**
 * Service to update comment.
 * @param {String} commentId
 * @param {String} data
 */
const updateCommentService = async (commentId, data, userId) => {
  const comment = await findCommentById(commentId);

  if (!comment) {
    throw new Error('Failed to update resource. Our team is working on it.');
  }

  // Toggling user's like
  if (data.like) {
    if (comment.likes.includes(mongoose.Types.ObjectId(userId))) {
      comment.likes.pull(mongoose.Types.ObjectId(userId));
    } else {
      comment.likes.push(mongoose.Types.ObjectId(userId));
    }

    delete data.like;
  }

  Object.keys(data).forEach((key) => {
    comment[key] = data[key];
  });

  const savedComment = await comment.save();

  await Comment.populate(savedComment, {
    path: 'author',
    select:
      '_id firstname lastname brandname username image prominent verified',
  });

  const objComment = savedComment.toObject();

  objComment.isCurrentUserLiked = comment.likes.includes(
    String(mongoose.Types.ObjectId(userId))
  );
  objComment.isCurrentUserAuthor =
    userId && String(userId) === String(objComment.author._id);
  objComment.likesCount = objComment.likes.length;
  delete objComment.likes;

  return objComment;
};

/**
 * Deleting comment by commentId
 * @param {String} commentId
 */
const deleteCommentService = async (commentId) => {
  const deleted = await Comment.findByIdAndDelete({ _id: commentId });

  // remove from Link and user
  if (deleted) {
    const link = await Link.findOne({
      comments: { $in: [mongoose.Types.ObjectId(commentId)] },
    });
    const user = await User.findOne({
      comments: { $in: [mongoose.Types.ObjectId(commentId)] },
    });
    await link.comments.pull(mongoose.Types.ObjectId(commentId));
    await user.comments.pull(mongoose.Types.ObjectId(commentId));
  }

  return {
    _id: deleted._doc._id,
  };
};

/**
 *
 * @param {Object} options
 * @param {String} userId
 */
const getCommentsService = async (options, userId) => {
  const match = {};
  const sort = { createdAt: -1 };
  const paginateOptions = { limit: 15 };

  if (options.linkId) {
    match.link = mongoose.Types.ObjectId(options.linkId);
  }

  const aggregate = Comment.aggregate([
    { $match: match },
    { $sort: sort },
    {
      $lookup: {
        from: User.collection.name,
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      },
    },
    { $unwind: '$author' },
    {
      $project: {
        text: 1,
        pinned: 1,
        parent: 1,
        link: 1,
        createdAt: 1,
        'author._id': 1,
        'author.firstname': 1,
        'author.lastname': 1,
        'author.username': 1,
        'author.brandname': 1,
        'author.prominent': 1,
        'author.image': 1,
        'author.verified': 1,
        isCurrentUserLiked: {
          $in: [mongoose.Types.ObjectId(userId), { $ifNull: ['$likes', []] }],
        },
        isCurrentUserAuthor: {
          $eq: ['$author._id', mongoose.Types.ObjectId(userId)],
        },
        likesCount: { $size: { $ifNull: ['$likes', []] } },
      },
    },
  ]);

  return Comment.aggregatePaginate(aggregate, paginateOptions);
};

/**
 *
 * @param {String} id
 * @param {String} userId
 */
const getCommentService = async (id, userId) => {
  let comment = await Comment.findOne({ _id: mongoose.Types.ObjectId(id) });

  await Comment.populate(comment, {
    path: 'author',
    select:
      '_id firstname lastname prominent brandname username image verified',
  });

  if (comment) {
    if (
      mongoose.Types.ObjectId(comment.author._id) ===
      mongoose.Types.ObjectId(userId)
    ) {
      comment.isCurrentUserAuthor = true;
    }

    comment = comment.toObject();

    comment.likesCount = comment.likes.length;
    delete comment.likes;
  }

  return comment;
};

module.exports = {
  findCommentById,
  createCommentService,
  updateCommentService,
  deleteCommentService,
  getCommentsService,
  getCommentService,
};
