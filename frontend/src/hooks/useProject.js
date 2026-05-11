import { useState, useEffect } from 'react';
import { projectApi } from '../api';

export const useProject = (slug) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await projectApi.getBySlug(slug);
        setProject(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProject();
  }, [slug]);

  return { project, loading, error };
};
