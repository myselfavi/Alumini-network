import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Trash2 } from 'lucide-react';
import { useAuthContext } from '../contexts/useAuthContext';
import useApi from '../hooks/useApi';

const Post = ({ post, onDelete }) => {

  const { user } = useAuthContext();
  const api = useApi();

  console.log(post);

  const getInitials = (name) => {
    const names = name.split(' ');
    const initials = names.map((n) => n[0]).join('');
    return initials.toUpperCase();
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleDeletePost = async () => {
    try {
      await api.delete(`/api/post/${post._id}`);
      onDelete();
    } catch (error) {
      console.error(error);
    } finally {
      setShowMenu(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md border border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm text-gray-700 font-semibold">{getInitials(post.author.name)}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{post.author.name}</h3>
              <p className="text-xs text-gray-500">{post.role}</p>
              <p className="text-xs text-gray-400">{post.time}</p>
              <p className="text-xs text-gray-500"><span>{post.author.organization}</span> • <span>{post.author.workExperience} years+</span></p>
            </div>
          </div>
          <div className="relative">
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2">
                <div className="border-b border-gray-100 px-4 py-2">
                  <p className="text-sm text-gray-700 font-semibold">Actions</p>
                </div>
                {post.author._id === user.id && (
                  <button
                    className="flex gap-1 items-centerw-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={handleDeletePost}
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Delete
                  </button>
                )}
                <button
                  className="flex gap-1 items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="mt-4 text-gray-700">{post.content}</p>
        {post.image && (
          <div className="mt-4">
            <img
              src={post.image}
              alt="Post content"
              className="w-full rounded-lg object-cover"
            />
          </div>
        )}
        {post.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex items-center space-x-6 pt-4 border-t border-gray-100">
          <button
            className={`flex items-center ${
              post.isLiked ? 'text-indigo-600' : 'text-gray-600'
            } hover:text-indigo-600`}
          >
            <ThumbsUp className="w-5 h-5 mr-1" />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-indigo-600">
            <MessageCircle className="w-5 h-5 mr-1" />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-indigo-600">
            <Share2 className="w-5 h-5 mr-1" />
            <span>{post.shares}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;

