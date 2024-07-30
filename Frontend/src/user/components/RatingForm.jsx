// src/components/RatingForm.js
import { useState } from 'react';
import axios from 'axios';

const RatingForm = ({ bookId, userId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/ratings/rate', { bookId, userId, rating, comment });
      alert('Rating submitted successfully');
      setRating(1);
      setComment('');
    } catch (error) {
      alert('Failed to submit rating');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>
      <label>
        Comment:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <button type="submit">Submit Rating</button>
    </form>
  );
};

export default RatingForm;
