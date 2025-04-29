import React, { useState } from 'react';
import { Image, Link as LinkIcon, Send } from 'lucide-react';
import useApi from '../hooks/useApi';

interface CreatePostProps {
  onPostCreated: (newPostData: any) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const api = useApi();

  const handleCreatePost = async () => {
    if (!newPost.trim()) {
      setError('Post content cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/api/post', { content: newPost });
      setNewPost('');
      onPostCreated(response.data); // Notify parent with the newly created post data
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 w-full">
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
            alt="User"
            className="w-12 h-12 rounded-full"
          />
          <input
            type="text"
            placeholder="Share something with your network..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-600 hover:text-indigo-600">
              <Image className="w-5 h-5 mr-2" />
              <span>Photo</span>
            </button>
            <button className="flex items-center text-gray-600 hover:text-indigo-600">
              <LinkIcon className="w-5 h-5 mr-2" />
              <span>Link</span>
            </button>
          </div>
          <button
            className={`bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleCreatePost}
            disabled={loading}
          >
            {loading ? (
              <span>Posting...</span>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Post
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;