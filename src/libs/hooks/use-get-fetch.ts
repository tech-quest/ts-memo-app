import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const configs: RequestInit = {
  method: 'GET',
  mode: 'cors',
};

export const useGetFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const redirectError = (res: Response) => {
    if (res.status === 404) {
      router.push('/404');
      return;
    }
    router.push('/500');
    return;
  };

  const query = async () => {
    return await fetch(url, configs).then(async (res) => {
      setIsLoading(false);

      if (!res.ok) {
        redirectError(res);
        return;
      }

      const data = await res.json();
      setData(data);
    });
  };

  useEffect(() => {
    query();
  }, []);

  return { data, isLoading };
};
