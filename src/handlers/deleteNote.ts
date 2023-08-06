import api from "@/http";

export const handleDelete = async (id: any, setIsAuthorized: any, lever: boolean, runFetch: any) => {
    try {
      await api.post('notes/delete', { id })
      runFetch(!lever);
    } catch (error: any) {
      if (error.response.status == 403) {

      } else {
        setIsAuthorized(false);
      }
    }
  }