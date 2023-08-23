import { useRouter } from 'next/navigation';
import { useState } from 'react';

const configs: RequestInit = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  mode: 'cors',
};

export const usePostFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>();
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const redirectError = (res: Response) => {
    if (res.status === 404) {
      router.push('/404');
      return;
    }
    router.push('/500');
    return;
  };

  const fetchApi = async (values) => {
    const body = JSON.stringify(values);

    setIsLoading(true);

    return await fetch(url, { ...configs, body }).then(async (res) => {
      setIsLoading(false);

      if (!res.ok) {
        if (res.status === 400) {
          const data = await res.json();
          setError(data.message);
          return;
        }
        redirectError(res);
        return;
      }

      const data = await res.json();
      setData(data);
    });
  };

  return { data, error, isLoading, fetchApi };
};
