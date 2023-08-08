import {api} from "@/http";

export const handleDelete = async (id: any, setIsAuthorized: any, lever: boolean, runFetch: any, setUser: any, setBody: any, setError: any, showErrorPopup: any) => {
  try {
    await api.post('notes/delete', { id })
    runFetch(!lever);
  } catch (error: any) {
    setUser('');
    setBody([]);
    setIsAuthorized(false);
    if (!error.response) setError('Internal Server Error');
    if (error.response.status == 401) showErrorPopup('Your session has expired. Please Login');
  }
}