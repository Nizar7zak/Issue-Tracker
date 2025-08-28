import axios from 'axios';
import toast from 'react-hot-toast';

export interface CommentData {
  content: string;
}

export class CommentService {
  static async createComment(issueId: number, commentData: CommentData) {
    try {
      await axios.post(`/api/issues/${issueId}/comment`, commentData);
      toast.success('Comment added successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Failed to add comment');
      return { success: false, error: 'Failed to add comment' };
    }
  }

  static async deleteComment(issueId: number, commentId: number) {
    try {
      await axios.delete(`/api/issues/${issueId}/comment/${commentId}`);
      toast.success('Comment deleted successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Failed to delete comment');
      return { success: false, error: 'Failed to delete comment' };
    }
  }
}
