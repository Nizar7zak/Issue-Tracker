import axios from 'axios';
import toast from 'react-hot-toast';

export interface IssueData {
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
}

export class IssueService {
  static async createIssue(issueData: IssueData) {
    try {
      await axios.post('/api/issues', issueData);
      toast.success('Issue created successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Failed to create issue');
      return { success: false, error: 'Failed to create issue' };
    }
  }

  static async updateIssue(id: number, issueData: Partial<IssueData>) {
    try {
      await axios.patch(`/api/issues/${id}`, issueData);
      toast.success('Issue updated successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Failed to update issue');
      return { success: false, error: 'Failed to update issue' };
    }
  }

  static async deleteIssue(id: number) {
    try {
      await axios.delete(`/api/issues/${id}`);
      toast.success('Issue deleted successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Failed to delete issue');
      return { success: false, error: 'Failed to delete issue' };
    }
  }

  static async assignUserToIssue(issueId: number, userId: string | null) {
    try {
      await axios.patch(`/api/issues/${issueId}`, {
        assignedToUserId: userId,
        status: 'IN_PROGRESS'
      });
      toast.success('Assignee updated successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Changes could not be saved.');
      return { success: false, error: 'Changes could not be saved.' };
    }
  }
}
