import { api } from '@/utils/api';
import { useState } from 'react';

export default function AboutPage() {
  const [num, setNumber] = useState<number>(0);
  api.random.randomNumber.useSubscription(undefined, {
    onData(n: number) {
      setNumber(n);
    },
  });

  return (
    <div>
      Here&apos;s a random number from a sub: { Math.floor(num * 100) } <br />
    </div>
  );
}